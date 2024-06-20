"use strict";

const hexagonModule = require("../../../domain/hexagon/hexagon.module");
const userModule = require("../../../domain/user/user/userModule");
const utils = require("../../../infrastructure/utils/utils");
const systemNotificationModule = require("../../../domain/notification/systemNotificationModule");
const queryComposerModule = require("../../../domain/query/queryComposer/queryComposerModule");

const queriesModule = require("../../../domain/query/query/queriesModule");
const logModule = require("../../../domain/log/logModule");
const billingModule = require("../../../domain/billing/billing/billing.module");

const mailType = require("../../../infrastructure/constants/mailType");
const mailLogModule = require("../../../domain/log/mailLogModule");
const vehicularMonitoringModule = require("../../../domain/products/vehicularMonitoringModule");

const queryManagerRoutine = require("../../../domain/query/queryExecution/queriesExecution.manager");
const dataParserRoutine = require("../../../domain/query/queryExecution/queryData.parser");

const QUERY_ERRORS = require("../../../infrastructure/constants/message/query/query.errors.message");
const SYSTEM_ERRORS = require("../../../infrastructure/constants/message/system.error.message");
const UserTypeEnum = require("../../../infrastructure/enumerators/userType.enum");
const weakValidator = require("../../../infrastructure/utils/weakValidator.util");
const {
  responseObject,
} = require("../../../infrastructure/helpers/routerHelper");
const ResponseStatusEnum = require("../../../infrastructure/dictionaries/ResponseStatusEnum");

function IsNotAIntegrator(user) {
  return user.type !== UserTypeEnum.INTEGRATION_CLIENT_TYPE;
}

function createResponseDtoToCommonUserQuery(query, queryKeys, billingResponse) {
  return {
    headerInfos: {
      queryid: query._id,
      code: query.code,
      name: query.refClass,
      date: query.createAt,
      keys: queryKeys,
    },
    data: query.responseJSON,
    billing: billingResponse,
    servicesBroken: query.failedServices,
  };
}

function removeSensitiveDataFromServicesBrokenArray(query) {
  if (query.failedServices && query.failedServices.length) {
    return query.failedServices.map((serviceThatFail) => ({
      serviceLogId: serviceThatFail.serviceLog,
      serviceName: serviceThatFail.serviceName,
    }));
  }
  return query.failedServices;
}

function createResponseDtoToIntegrators(query, queryKeys, billingResponse) {
  return {
    headerInfos: {
      queryid: query._id,
      name: query.refClass,
      date: utils.getBrazilianDateFormat(query.createAt),
      keys: queryKeys,
    },
    data: query.responseJSON,
    billing: billingResponse,
    servicesBroken: removeSensitiveDataFromServicesBrokenArray(query),
  };
}

function responseDtoFactory(user, query, queryKeys, billingResponse) {
  return IsNotAIntegrator(user)
    ? createResponseDtoToCommonUserQuery(query, queryKeys, billingResponse)
    : createResponseDtoToIntegrators(query, queryKeys, billingResponse);
}

function validateIfCanBeExecuteQueryToThisKeys(keys) {
  if (keys.placa === "AYB0731" || keys.chassi === "93Y4SRD64EJ830469") {
    throw new Error("Não foi possivel realizar essa consulta");
  }
}

const executeQueryContextV2 = async function (ctx) {
  const initTime = Date.now();
  const userId = ctx.auth_user_id;
  const body = ctx.request && ctx.request.body;
  const { queryCode, keys, duplicity, client } = body;

  weakValidator.weakValidationToNVariables(queryCode, keys, duplicity);

  const preResponse = await executeQueryContext(
    userId,
    queryCode,
    keys,
    duplicity
  );
  const statusCode = preResponse.cod;
  const response =
    statusCode === 200
      ? await queriesModule.parseQuery(preResponse.data, client)
      : preResponse.data;
  const queryId =
    response && response.headerInfos && response.headerInfos.queryid;
  const elapsedTime = Date.now() - initTime;
  response.headerInfos.elapsedTimeInMS = elapsedTime;
  await queriesModule.updateExecutionTime(queryId, elapsedTime);

  if (statusCode === 200 && queryCode === 100) {
    queriesModule.regirsterMarketingUser(userId, preResponse);
  }

  return responseObject(ctx, ResponseStatusEnum(statusCode), response);
};

const executeQueryContext = async function (
  userId,
  queryCode,
  queryKeys,
  duplicityChecker
) {
  let _result = {
    cod: 200,
    data: null,
  };
  let user = await userModule.getById(userId);
  let queryName = await queryComposerModule.getNameQueryByCode(queryCode);
  if (user && user.status && queryName) {
    let query = null,
      log = null,
      objReturn = null;
    try {
      if (user.type !== UserTypeEnum.INTEGRATION_CLIENT_TYPE) {
        let duplicatedQuery = await queriesModule.doubleCheck(
          user._id,
          queryCode,
          queryKeys
        );
        if (duplicatedQuery) {
          if (!duplicityChecker) {
            _result.data = {
              headerInfos: {
                queryid: duplicatedQuery._id,
                name: duplicatedQuery.refClass,
                date: utils.getBrazilianDateFormat(duplicatedQuery.createAt),
                keys: queryKeys,
              },
              duplicity_checking:
                "Você realizou a consulta deste veículo recentemente! Deseja realizar uma nova consulta, ou acessar a consulta já realizada? Caso você opte por fazer uma nova consulta, será cobrado o valor integral da mesma.",
            };
            _result.cod = 206;
            return _result;
          }
        }
      }

      query = await queriesModule.createNewQuery({
        user: user._id,
        code: queryCode,
        refClass: queryName,
      });
      log = await logModule.createNewLog({
        query: query._id,
        user: user._id,
      });

      query.log = log._id;
      const zipCode =
        user.generalData &&
        user.generalData.address &&
        user.generalData.address.zipcode;

      if (queryKeys.placa)
        query.keys.placa = queryKeys.placa = queryKeys.placa.toUpperCase();
      if (queryKeys.chassi)
        query.keys.chassi = queryKeys.chassi = queryKeys.chassi.toUpperCase();
      validateIfCanBeExecuteQueryToThisKeys(queryKeys);
      if (queryKeys.motor)
        query.keys.motor = queryKeys.motor = queryKeys.motor.toUpperCase();
      if (queryKeys.renavam)
        query.keys.renavam = queryKeys.renavam = queryKeys.renavam.toUpperCase();
      if (queryKeys.uf)
        query.keys.uf = queryKeys.uf = queryKeys.uf.toUpperCase();
      if (queryKeys.cpf) query.keys.cpf = queryKeys.cpf;
      if (queryKeys.cnpj) query.keys.cnpj = queryKeys.cnpj;
      if (queryKeys.telefone) query.keys.telefone = queryKeys.telefone;
      if (queryKeys.email) query.keys.email = queryKeys.email;
      if (queryKeys.nome) query.keys.nome = queryKeys.nome;
      if (queryKeys.sexo) query.keys.sexo = queryKeys.sexo;
      if (queryKeys.dataNascimento)
        query.keys.dataNascimento = queryKeys.dataNascimento;

      if (queryKeys.bairro) query.keys.endereco.bairro = queryKeys.bairro;
      if (queryKeys.cidade) query.keys.endereco.cidade = queryKeys.cidade;
      if (queryKeys.complemento)
        query.keys.endereco.complemento = queryKeys.complemento;
      if (queryKeys.logradouro)
        query.keys.endereco.logradouro = queryKeys.logradouro;

      if (queryKeys.cep) query.keys.endereco.cep = queryKeys.cep;
      else query.keys.endereco.cep = zipCode || "01015100";

      if (queryKeys.uf) query.keys.endereco.uf = queryKeys.uf;
      if (queryKeys.numeroDe) query.keys.endereco.numeroDe = queryKeys.numeroDe;
      if (queryKeys.numeroAte)
        query.keys.endereco.numeroAte = queryKeys.numeroAte;

      query.documentQuery = String();
      query.documentType = String();
      if (queryKeys.placa) {
        query.documentQuery = queryKeys.placa.toUpperCase();
        query.documentType = "PLACA";
      } else if (queryKeys.chassi) {
        query.documentQuery = query.documentQuery
          ? `${query.documentQuery} ${queryKeys.chassi.toUpperCase()}`
          : queryKeys.chassi.toUpperCase();
        query.documentType = query.documentType
          ? `${query.documentType} CHASSI`
          : "CHASSI";
      } else if (queryKeys.motor) {
        query.documentQuery = query.documentQuery
          ? `${query.documentQuery} ${queryKeys.motor.toUpperCase()}`
          : queryKeys.motor.toUpperCase();
        query.documentType = query.documentType
          ? `${query.documentType} MOTOR`
          : "MOTOR";
      } else if (queryKeys.cpf) {
        query.documentQuery = query.documentQuery
          ? `${query.documentQuery} ${queryKeys.cpf.toUpperCase()}`
          : queryKeys.cpf.toUpperCase();
        query.documentType = query.documentType
          ? `${query.documentType} CPF`
          : "CPF";
      } else if (queryKeys.cnpj) {
        query.documentQuery = query.documentQuery
          ? `${query.documentQuery} ${queryKeys.cnpj.toUpperCase()}`
          : queryKeys.cnpj.toUpperCase();
        query.documentType = query.documentType
          ? `${query.documentType} CNPJ`
          : "CNPJ";
      }

      let __vehicle = null;
      if (
        queryKeys.placa ||
        queryKeys.chassi ||
        queryKeys.renavam ||
        queryKeys.motor
      ) {
        __vehicle = await hexagonModule.getVehicle(
          queryKeys.placa,
          queryKeys.chassi,
          queryKeys.renavam,
          queryKeys.motor
        );
      }

      if (__vehicle) {
        query.keys.placa = !query.keys.placa
          ? __vehicle.placa
          : query.keys.placa;
        query.keys.chassi = !query.keys.chassi
          ? __vehicle.chassi
          : query.keys.chassi;
        query.keys.renavam = !query.keys.renavam
          ? __vehicle.renavam && __vehicle.renavam !== "NULL"
            ? __vehicle.renavam
            : null
          : query.keys.renavam;
        query.keys.motor = !query.keys.motor
          ? __vehicle.numMotor && __vehicle.numMotor !== "NULL"
            ? __vehicle.numMotor
            : null
          : query.keys.motor;
      }
      await query.save();
      let billingResponse = await billingModule.executePaymentOperation(
        user._id,
        query,
        log
      );
      if (billingResponse.err) {
        //Algum problema capturado durante o processamento do pagamento
        _result.cod = 410;
        _result.data = {
          headerInfos: {
            queryid: query._id,
            name: query.refClass,
            date: utils.getBrazilianDateFormat(query.createAt),
            keys: queryKeys,
          },
          error: {
            msg: billingResponse.err,
            type: "BILLING_EXECUTION_ERROR",
          },
        };
        return _result;
      }
      query = await queryManagerRoutine.call(log, query, user);
      if (query.status) {
        if (query.failedServices.length > 0) log.code = 204;
        //retorno da consutla com sucesso
        query = await dataParserRoutine.parse(query);
        objReturn = responseDtoFactory(user, query, queryKeys, billingResponse);
        try {
          let notification = {
            type: 3,
            description: `Consulta: ${query.refClass}`,
          };
          await systemNotificationModule.createNew(notification);

          const email = user.email;
          const emailType =
            mailType.vehicularMonitoring.firstEmailAfterQuery.type;
          const mailLog = await mailLogModule.getByEmailAndType({
            email,
            type: emailType,
          });
          await mailLogModule.createNewLog({
            mailTo: email,
            type: emailType,
          });
        } catch (error) {
          console.log("Error to create notification => ");
          console.log(error);
        }
      } else {
        let chargeBack = await billingModule.executeChargebackOperation(query);
        if (chargeBack) {
          //executa operação de estorno, caso a consulta tenha falhado
          log.status = query.status = false;
          if (!log.error) log.error = QUERY_ERRORS.QUERY_EXECUTION_ERROR;
          objReturn = {
            headerInfos: {
              queryid: query._id,
              name: query.refClass,
              date: query.createAt,
            },
            error: {
              msg: QUERY_ERRORS.QUERY_EXECUTION_ERROR,
              type: "QUERY_EXECUTION_ERROR",
            },
          };
        }
      }
      _result.data = objReturn;
    } catch (err) {
      // Erro interno
      log.status = query.status = false;
      log.error = err.message;

      _result.data = {
        headerInfos: {
          queryid: query._id,
          name: query.refClass,
          date: query.createAt,
        },
        error: {
          msg: SYSTEM_ERRORS.INTERNAL_SERVER_ERROR,
          type: "INTERNAL_SERVER_ERROR",
        },
      };
      _result.cod = 500;
    } finally {
      if (log) await log.save();
      if (query) await query.save();
    }
  } else {
    _result.cod = 410;
    _result.data = null;
  }
  return _result;
};

const reExecuteQueryContext = async function (queryId) {
  let _result = {
    cod: 200,
    data: null,
  };
  let originalQuery = await queriesModule.getById(queryId);
  if (
    originalQuery &&
    (!originalQuery.status ||
      (originalQuery.status && originalQuery.responseJSON == null))
  ) {
    let log = null;
    let query = null;

    let objReturn = null;
    try {
      let user = originalQuery.user;
      query = await queriesModule.createNewQuery({
        user: user._id,
        code: originalQuery.code,
        refClass: originalQuery.refClass,
      });
      log = await logModule.createNewLog({
        query: query._id,
        user: user._id,
      });

      query.documentQuery = originalQuery.documentQuery;
      query.documentType = originalQuery.documentType;
      query.keys = originalQuery.keys;
      query.reprocessedFrom = originalQuery._id;

      query = await queryManagerRoutine.call(log, query, user);
      if (query.status) {
        if (query.failedServices.length > 0) log.code = 204;
        //retorno da consutla com sucesso
        query = await dataParserRoutine.parse(query);
        objReturn =
          user.type != 2
            ? {
                headerInfos: {
                  queryid: query._id,
                  name: query.refClass,
                  date: query.createAt,
                  keys: originalQuery.keys,
                },
                data: query.responseJSON,
                //billing: billingResponse,
                servicesBroken: query.failedServices,
              }
            : {
                headerInfos: {
                  queryid: query._id,
                  name: query.refClass,
                  date: utils.getBrazilianDateFormat(query.createAt),
                  keys: originalQuery.keys,
                },
                data: query.responseJSON,
                //billing: billingResponse
              };
        try {
          let notification = {
            type: 3,
            description: `Consulta: ${query.refClass}`,
          };
          await systemNotificationModule.createNew(notification);
        } catch (error) {
          console.log("Error to create notification => ");
          console.log(error);
        }

        _result.data = objReturn;
      }
    } catch (err) {
      // Erro interno
      log.status = query.status = false;
      log.error = err.message;
      _result.data = {
        headerInfos: {
          queryid: query._id,
          name: query.refClass,
          date: query.createAt,
        },
        error: {
          msg: SYSTEM_ERRORS.INTERNAL_SERVER_ERROR,
          type: "INTERNAL_SERVER_ERROR",
        },
      };
      _result.cod = 500;
    } finally {
      if (log) await log.save();
      if (query) await query.save();
    }
  } else {
    // não reprocessável
    _result.cod = 410;
    _result.data = QUERY_ERRORS.INVALID_PARAMETERS_TO_EXECUTE_QUERY;
  }
  return _result;
};

const getCarName = (response) => {
  return response.marcaModelo;
};

const getPlate = (response) => {
  const defaultPlate = response.placa;
  const statePlate = response.baseEstadual && response.baseEstadual.placa;
  const nationalPlate = response.baseNacional && response.baseNacional.placa;

  return defaultPlate || statePlate || nationalPlate;
};

module.exports = {
  executeQueryContext,
  executeQueryContextV2,
  reExecuteQueryContext,
};
