"use strict";

const HttpCode = require("../../../infrastructure/enumerators/httpCode.enum");
const vehicleModule = require("../../../domain/vehicular/vehicle.module");
const hexagonModule = require("../../../domain/hexagon/hexagon.module");
const gRecaptchaV3Module = require("../../../infrastructure/services/google/recaptcha/googleRecaptcha.service");
const testDriveModule = require("../../../domain/test_drive/testDriveModule");
const userConvertedModule = require("../../../domain/user/userConvertedModule");
const {
  responseObject,
} = require("../../../infrastructure/helpers/routerHelper");

const executeTestDrive = async (key, token) => {
  const response = {
    result: null,
    status: 200,
  };
  const navigationReviews = await gRecaptchaV3Module.siteVerify(
    token,
    gRecaptchaV3Module.RECAPTCHA_SECRETS_BY_VERSION.V2
  );
  if (navigationReviews.error) {
    response.result =
      "Seu token de navegação para execução do test drive expirou, em decorrência disso você não será capaz de executar o TEST DRIVE. Por favor, recarregue a página e tente novamente.";
    response.status = 401;
    return response;
  }
  const result = await testDriveModule.runTestDriver(key);
  if (!result) {
    response.result = "Veículo não encontrado nas bases consultadas";
    response.status = 404;
  } else {
    response.result = result;
  }

  return response;
};

const addUserConverted = async (email) => {
  return userConvertedModule.insertNewUserConverted(email);
};

const executeTestDriveToTestOnly = async (key) => {
  let response = {
    result: null,
    status: 200,
  };
  key = key.toUpperCase();
  if (key !== "AAA0001" && key !== "AAA0002") {
    response.result = "Veículo não encontrado";
    response.status = 404;
    return response;
  }

  let vehicle = await hexagonModule.getVehicle(key);
  if (vehicle) {
    let jsonData = JSON.parse(JSON.stringify(vehicle));
    response.result = vehicleModule.dataCleaner.testDrive(jsonData);
  } else {
    response.result = "Veículo não encontrado";
    response.status = 404;
  }
  return response;
};

const sendEmailWithDiscount = async (ctx) => {
  const body = ctx.request.body;
  const email = body.payload ? body.payload.email : body.email;
  const timesSend = body.payload
    ? body.payload.timesSend === 0
      ? 1
      : 2
    : body.timesSend;
  console.log(body);
  try {
    const response = await testDriveModule.sendEmailDiscount(email, timesSend);
    return responseObject(ctx, HttpCode.SUCCESS, response);
  } catch (e) {
    if (e.statusCode) e.statusCode = HttpCode.INTERNAL_ERROR;
    return responseObject(ctx, HttpCode.SUCCESS, e);
  }
};

const addModelNotFound = async (queryId, userModelInformation) => {
  return testDriveModule.addModelNotFound(queryId, userModelInformation);
};

const testDriveQueryRepresentation = async (ctx) => {
  const queryId = ctx.params.queryId;
  if (!queryId) return responseObject(ctx, HttpCode.INVALID_PARAMETERS, null);
  const response = await testDriveModule.getTestDriveQuery(queryId);
  return responseObject(ctx, HttpCode.SUCCESS, response);
};

const getAll = async ({
  userId,
  initDate,
  endDate,
  queryDocument,
  email,
  queryId,
}) => {
  return testDriveModule.getAll({
    userId,
    initDate,
    endDate,
    queryDocument,
    email,
    ptid: undefined,
    queryId,
  });
};

module.exports = {
  addUserConverted,
  addModelNotFound,
  executeTestDrive,
  executeTestDriveToTestOnly,
  getAll,
  sendEmailWithDiscount,
  testDriveQueryRepresentation,
};
