"use strict";

const serviceModule = require("../../../domain/query/service/serviceModule");
const queriesModule = require("../../../domain/query/query/queriesModule");
const inputManagerRoutine = require("../../../domain/query/queryExecution/servicesExecution.manager");
const dataParserRoutine = require("../../../domain/query/queryExecution/queryData.parser");
const serviceLogModule = require("../../../domain/log/serviceLogModule");
const QueryTypesEnum = require("../../../infrastructure/dictionaries/QueryTypesEnum");

const QUERY_ERRORS = require("../../../infrastructure/constants/message/query/query.errors.message");

const _ = require("lodash");

const createNewService = async (serviceCode, minimumPrice) => {
  let _result = null;
  try {
    _result = await serviceModule.createNewService(serviceCode, minimumPrice);
  } catch (err) {
    _result = err;
  }
  return _result;
};

const getAll = async () => {
  let _result = null;
  try {
    _result = serviceModule.getAll();
  } catch (err) {
    _result = err;
  }
  return _result;
};

function getLastTryDatedWithXMinutesAbove(lastTryDate, plusTime = 5) {
  return lastTryDate
    ? lastTryDate.setMinutes(lastTryDate.getMinutes() + plusTime)
    : null;
}

function canBeExecuteReQueryToService(serviceToExecute, lastTryDate, dtNow) {
  return (
    serviceToExecute.requeryTries > 0 || (lastTryDate && dtNow > lastTryDate)
  );
}

function isAValidServiceCode(serviceCode) {
  return serviceCode && !isNaN(serviceCode);
}

function getCorrectServiceCode(serviceCode, serviceToExecute) {
  return isAValidServiceCode(serviceCode)
    ? serviceCode
    : serviceToExecute.serviceCode;
}

function getServiceInStackResultOnQuery(query, serviceLog) {
  return query.stackResult.find((o) => {
    return o.serviceLog.toString() === serviceLog._id.toString();
  });
}

//@TODO refazer, separar responsabilidades, revisar fluxo de controle e ciclo e vida
// Estamos precisando mesmo, ta cada vez pior, boa sorte para o proximo que mexer aqui!
const executeServiceQuery = async (
  queryId,
  serviceLog,
  newServiceCode,
  serviceCode,
  bypassDelay
) => {
  let response = { cod: 200, data: { error: null } };
  try {
    let query = await queriesModule.getById(queryId);

    if (query.version === 2) {
      throw new Error("[Erro Interno] Indisponivel reprocessamento para a v2");
    }

    if (query) {
      await serviceModule.cancelAutoReprocess(query._id);

      const failedServicesWithLog = query.failedServices.find((service) => {
        return (
          service.serviceLog && service.serviceLog.toString() === serviceLog
        );
      });

      const failedServicesCode = query.failedServices.find((service) => {
        return service.serviceCode === serviceCode;
      });

      const serviceToExecute = failedServicesWithLog || failedServicesCode;

      if (serviceToExecute) {
        let dtNow = null;
        let lastTryDate = null;
        if (!bypassDelay) {
          dtNow = new Date();
          lastTryDate = getLastTryDatedWithXMinutesAbove(
            serviceToExecute.lastTry
          );
        }

        if (
          bypassDelay ||
          canBeExecuteReQueryToService(serviceToExecute, lastTryDate, dtNow)
        ) {
          const serviceCode = getCorrectServiceCode(
            newServiceCode,
            serviceToExecute
          );

          const service = await serviceModule.getByCode(serviceCode);
          if (service) {
            const index = query.failedServices.indexOf(serviceToExecute);
            if (index >= 0) {
              query.failedServices[index].requeryTries > 0
                ? (query.failedServices[index].requeryTries -= 1)
                : (query.failedServices[index].requeryTries = 2);
              query.failedServices[index].lastTry = new Date();
              query = await query.save();
            }
            serviceLog = await serviceLogModule.getById(
              serviceToExecute.serviceLog
            );
            if (serviceLog) {
              serviceLog.serviceCode = serviceCode;
              serviceLog.reprocessing.is = true;
              serviceLog.reprocessing.count += 1;
              serviceLog.reprocessing.last = new Date();
              serviceLog.reprocessing.originalServiceCode =
                serviceToExecute.serviceCode;

              const result = await inputManagerRoutine.call(
                service,
                query.keys
              );
              if (!result.error && result.data) {
                serviceLog.status = true;
                serviceLog.error = null;
                await serviceLog.save();

                const objInStackResult = getServiceInStackResultOnQuery(
                  query,
                  serviceLog
                );
                const indexObjectResult = query.stackResult.indexOf(
                  objInStackResult
                );
                if (indexObjectResult >= 0) {
                  query.stackResult[indexObjectResult].rawData =
                    query.type === QueryTypesEnum(3)
                      ? result.data
                      : result.returnedDataVendor;
                  query.stackResult[indexObjectResult].dataFound =
                    result.dataFound;
                  query = await dataParserRoutine.parse(
                    query,
                    serviceLog.serviceCode
                  );
                  _.remove(query.failedServices, (o) => {
                    return (
                      o.serviceLog.toString() === serviceLog._id.toString()
                    );
                  });
                  await queriesModule.updateById(query);
                }
                response.data = {
                  headerInfos: {
                    serviceCode: serviceCode,
                    supplierCode: service.supplier.supplierCode,
                    serviceName: service.name,
                    date: new Date(),
                  },
                  data: query.responseJSON,
                };
              } else {
                serviceLog.status = false;
                serviceLog.error = result.error
                  ? result.error
                  : "key not available to service requested. Service reference: " +
                    serviceToExecute.serviceName;
                response.cod = 410;
                response.data.error =
                  QUERY_ERRORS.UNAVAILABLE_REPROCCESSING_SERVICE;
              }
              await serviceLog.save();
            } else if (serviceCode) {
              const result = await inputManagerRoutine.call(
                service,
                query.keys
              );

              const objInStackResult = query.stackResult.find((o) => {
                return o.serviceCode === serviceCode;
              });

              if (!result.error && result.data) {
                const indexObjectResult = query.stackResult.indexOf(
                  objInStackResult
                );
                if (indexObjectResult >= 0) {
                  query.stackResult[indexObjectResult].rawData =
                    query.type === QueryTypesEnum(3)
                      ? result.data
                      : result.returnedDataVendor;
                  query.stackResult[indexObjectResult].dataFound =
                    result.dataFound;
                  query = await dataParserRoutine.parse(query, serviceCode);
                  _.remove(query.failedServices, (o) => {
                    return o.serviceCode === serviceCode;
                  });
                  await queriesModule.updateById(query);
                }

                response.data = {
                  headerInfos: {
                    serviceCode: serviceCode,
                    supplierCode: service.supplier.supplierCode,
                    serviceName: service.name,
                    date: new Date(),
                  },
                  data: query.responseJSON,
                };
              } else {
                response.cod = 410;
                response.data.error = result.error;
              }
            } else {
              response.cod = 410;
              response.data.error =
                QUERY_ERRORS.UNAVAILABLE_REPROCCESSING_SERVICE;
            }
          } else {
            response.cod = 404;
            response.data.error = QUERY_ERRORS.SERVICE_NOT_EXISTS;
          }
        } else {
          if (serviceToExecute.requeryTries === 0) {
            response.cod = 403;
            response.data.error = QUERY_ERRORS.NUMBER_TRIES_REACHEAD;
          } else if (lastTryDate && dtNow > lastTryDate) {
            response.cod = 403;
            response.data.error = QUERY_ERRORS.DELAY_TIME_NOT_AWAITED;
          }
        }
      } else {
        response.cod = 404;
        response.data.error = QUERY_ERRORS.INVALID_SERVICE_REFERENCE;
      }
    } else {
      response.cod = 410;
      response.data.error = QUERY_ERRORS.UNAVAILABLE_REPROCCESSING_SERVICE;
    }
  } catch (err) {
    response.cod = 500;
    response.data.error = err.message;
  }
  return response;
};

const updateAutoSwitching = async (id, switchParams) => {
  let response = { cod: 200, error: null, data: null };
  try {
    response.data = await serviceModule.updateAutoSwitching(id, switchParams);
  } catch (error) {
    response.data = null;
    response.error = error.message;
    response.cod = 500;
  }
  return response;
};

const updateMinimumPrice = async (id, value) => {
  let response = { cod: 200, error: null, data: null };
  try {
    response.data = await serviceModule.updateMinimumPrice(id, value);
  } catch (error) {
    response.data = null;
    response.error = error.message;
    response.cod = 500;
  }
  return response;
};

module.exports = {
  createNewService,
  getAll,
  executeServiceQuery,
  updateAutoSwitching,
  updateMinimumPrice,
};
