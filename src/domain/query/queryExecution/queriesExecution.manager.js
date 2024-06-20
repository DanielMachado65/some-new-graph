"use strict";

const inputManagerRoutine = require("./servicesExecution.manager");
const { MQueryComposer } = require("mongoose").models;
const ServicesEnum = require("../../../infrastructure/dictionaries/ServicesEnum");
const QueryTypesEnum = require("../../../infrastructure/dictionaries/QueryTypesEnum");
const _ = require("lodash");

let serviceModule = require("../service/serviceModule");
let serviceLogModule = require("../../log/serviceLogModule");

//@todo refazer esse controle
const CODES_BASE_SERVICES = [
  3,
  4,
  10,
  20,
  30,
  35,
  36,
  37,
  38,
  51,
  76,
  77,
  83,
  60,
]; // CODIGOS DE TODOS OS SERVIÇOS DE BASE NACIONAL E ESTADUAL INTEGRADOS
const HEXAGON_SUPPLIER_CODE = 1;

function getHasPrimaryService(query, CODES_BASE_SERVICES) {
  return query.stackResult.find((service) => {
    return CODES_BASE_SERVICES.includes(service.serviceCode);
  });
}

function createFailedServiceDto(serviceLog, serviceEnumObject) {
  return {
    serviceLog: serviceLog._id,
    serviceCode: serviceLog.serviceCode,
    serviceName: serviceEnumObject.name,
    supplierCode: serviceEnumObject.supplierCode,
  };
}

function createDefaultStackResultDto(
  queryObject,
  response,
  serviceLog,
  service
) {
  return {
    rawData:
      queryObject.type === QueryTypesEnum(3)
        ? response.data
        : response.returnedDataVendor,
    serviceLog: serviceLog._id,
    serviceCode: service.code,
    dataFound: response.dataFound,
    hasError: !!response.error,
    supplierCode:
      (service && service.supplier && service.supplier.supplierCode) || 0,
  };
}

function createStackResultErrorItemDto(serviceEnumObject, service, serviceLog) {
  return {
    rawData: {
      err:
        "Base service didnt run previously (Base Nacional and Base Estadual), unable to continue with query service " +
        serviceEnumObject.name,
    },
    hasError: true,
    serviceCode: service.code,
    supplierCode:
      (service && service.supplier && service.supplier.supplierCode) || 0,
    serviceLog: serviceLog._id,
    dataFound: false,
  };
}

function enrichSupportDataQuery(query, response) {
  const placa = !query.keys.placa ? response.support.placa : query.keys.placa;
  const chassi = !query.keys.chassi
    ? response.support.chassi
    : query.keys.chassi;
  const motor = !query.keys.motor ? response.support.motor : query.keys.motor;
  const renavam = !query.keys.renavam
    ? response.support.renavam
    : query.keys.renavam;
  const cpf = !query.keys.cpf ? response.support.cpf : query.keys.cpf;
  const cnpj = !query.keys.cnpj ? response.support.cnpj : query.keys.cnpj;
  const nomeDaMae = !query.keys.nomeDaMae
    ? response.support.nomeMae
    : query.keys.nomeDaMae;
  const nome = !query.keys.nome ? response.support.nome : query.keys.nome;
  return {
    placa,
    chassi,
    motor,
    renavam,
    cpf,
    cnpj,
    nomeDaMae,
    nome,
  };
}

function queriesIsAbleToContinue(query, composer, serviceCode) {
  if (composer.type === QueryTypesEnum(1)) {
    const hasPrimaryService = getHasPrimaryService(query, CODES_BASE_SERVICES);
    if (query.stackResult.length > 1 && hasPrimaryService) {
      for (let index = 0; index < query.stackResult.length; index++) {
        const element = query.stackResult[index];
        if (
          (CODES_BASE_SERVICES.includes(element.serviceCode) &&
            element.dataFound) ||
          CODES_BASE_SERVICES.includes(serviceCode)
        )
          return true;
      }
      return false;
    }
  }
  return true;
}

function checkQueryIntegrity(stackResult, composer, log) {
  // TODO: remove hardcode query code
  const freeQueryCode = 81;
  const isNotFreeQuery = composer.queryCode !== freeQueryCode;
  if (composer.type === QueryTypesEnum(1) && isNotFreeQuery) {
    const stackResultAux = Object.assign([], stackResult).filter(
      (item) => item.supplierCode !== HEXAGON_SUPPLIER_CODE
    );
    if (stackResultAux.length) {
      return !!stackResultAux.find(
        (query) => query.dataFound || (!query.dataFound && !query.hasError)
      );
    }
  }
  return log.status;
}

function getServiceResponseErrorAsString(serviceError) {
  const defaultErrorMsg = `Couldn't parse service response error. Unknown error!`;
  try {
    return typeof serviceError === "string"
      ? serviceError
      : Array.isArray(serviceError) || typeof serviceError === "object"
      ? JSON.stringify(serviceError)
      : typeof serviceError === "number" || typeof serviceError === "boolean"
      ? "" + serviceError
      : defaultErrorMsg;
  } catch (error) {
    return defaultErrorMsg;
  }
}

module.exports.call = async (log, query, user) => {
  let queryObject = await MQueryComposer.findOne({
    queryCode: query.code,
  }).populate("services");
  if (queryObject && queryObject.status) {
    for (let service of queryObject.services) {
      let serviceLog = await serviceLogModule.createNewLog({
        log: log._id,
        serviceCode: service.code,
      });
      if (service) {
        let serviceEnumObject = ServicesEnum(serviceLog.serviceCode);
        if (
          queriesIsAbleToContinue(query, queryObject, serviceLog.serviceCode)
        ) {
          const response = await inputManagerRoutine.call(service, query.keys);
          if (response && response.support) {
            query.keys = {
              ...query.keys,
              endereco: {
                ...query.keys.endereco,
              },
              ...enrichSupportDataQuery(query, response),
            };
            await query.save();
          }
          if (!response || (!response.data && !response.error)) {
            query.failedServices.push(
              createFailedServiceDto(serviceLog, serviceEnumObject)
            );
            query.stackResult.push(
              createStackResultErrorItemDto(
                serviceEnumObject,
                service,
                serviceLog
              )
            );
          } else {
            query.stackResult.push(
              createDefaultStackResultDto(
                queryObject,
                response,
                serviceLog,
                service
              )
            );
            await query.save();
            if (response.error) {
              serviceLog.error = getServiceResponseErrorAsString(
                response.error
              );
              serviceLog.status = false;
              serviceLog.save().finally();
              //Rotina de auto chaveamento por serviço.
              if (service.hasAutoSwitching && user.type !== 2) {
                let servicesByPriority = _.orderBy(
                  service.switching,
                  ["priority"],
                  ["desc"]
                ); //_.sortBy(service.switching, [function (o) { return o.priority; }]);
                for (let i = 0; i < servicesByPriority.length; i++) {
                  let __switchObject = servicesByPriority[i];
                  let __service = await serviceModule.getById(
                    __switchObject.service
                  );
                  let __serviceLog = await serviceLogModule.createNewLog({
                    log: log._id,
                    serviceCode: __service.code,
                  });
                  const __responseAutoSwitching = await executeAutoSwitching(
                    __service,
                    query.keys
                  );
                  query.stackResult.push(
                    createDefaultStackResultDto(
                      query,
                      __responseAutoSwitching,
                      __serviceLog,
                      __service
                    )
                  );
                  await query.save();
                  if (__responseAutoSwitching.error) {
                    __serviceLog.error = getServiceResponseErrorAsString(
                      __responseAutoSwitching.error
                    );
                    __serviceLog.status = false;
                    __serviceLog.save().finally();
                    const relatedService = query.failedServices.find(
                      (service) => {
                        return service.serviceCode === serviceLog.serviceCode;
                      }
                    );
                    if (!relatedService) {
                      query.failedServices.push(
                        createFailedServiceDto(serviceLog, serviceEnumObject)
                      );
                    }
                  } else {
                    _.remove(query.failedServices, (o) => {
                      return o.serviceCode === serviceLog.serviceCode;
                    });
                    await query.save();
                    log.status = true;
                    break;
                  }
                }
              } else {
                const relatedService = query.failedServices.find((service) => {
                  return service.serviceCode === serviceLog.serviceCode;
                });
                if (!relatedService) {
                  query.failedServices.push(
                    createFailedServiceDto(serviceLog, serviceEnumObject)
                  );
                }
              }
            } else {
              log.status = true;
              log.error = null;
            }
          }
        } else {
          query.failedServices.push(
            createFailedServiceDto(serviceLog, serviceEnumObject)
          );
          query.stackResult.push(
            createStackResultErrorItemDto(
              serviceEnumObject,
              service,
              serviceLog
            )
          );
        }
      } else {
        serviceLog.status = false;
        serviceLog.error = "Servico não econtrado ou inexistente.";
        await serviceLog.save();
      }
    }
    log.status = checkQueryIntegrity(query.stackResult, queryObject, log);
  } else {
    query.status = log.status = false;
    log.error = "Não foi possível encontrar a consulta solicitada.";
  }
  query.status = log.status;
  await log.save();
  await query.save();
  return query;
};

const executeAutoSwitching = async (service, keys) => {
  return await inputManagerRoutine.call(service, keys);
};
