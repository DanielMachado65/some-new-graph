"use strict";

const mount = require("koa-mount");
const Router = require("koa-router");
const SupportRoutes = new Router();

const supportModule = require("../../../domain/support/support.module");
const HttpCodes = require("../../../infrastructure/enumerators/httpCode.enum");
const {
  weakValidation,
} = require("../../../infrastructure/utils/weakValidator.util");
const {
  responseObject,
} = require("../../../infrastructure/helpers/routerHelper");
const {
  basicAuthenticationMiddleware,
} = require("../../middlewares/authMiddleware");
const { rateLimiter } = require("../../middlewares/rate-limit.middleware");

const errorHandler = (ctx, error, msg) => {
  const errorResponse = error && error.response;
  const status =
    (errorResponse && errorResponse.status) || HttpCodes.GONE_ERROR;
  const statusText = (errorResponse && errorResponse.statusText) || msg;
  return responseObject(ctx, status, statusText);
};

async function getLocationStates(ctx) {
  try {
    const response = await supportModule.getLocationStates();
    return responseObject(ctx, HttpCodes.SUCCESS, response);
  } catch (error) {
    errorHandler(ctx, error, error.message);
  }
}

async function getCitiesByState(ctx) {
  try {
    const { uf } = ctx.params;
    weakValidation(uf, "Informe a UF");

    const response = await supportModule.getCitiesByState(uf);
    return responseObject(ctx, HttpCodes.SUCCESS, response);
  } catch (error) {
    errorHandler(ctx, error, error.message);
  }
}

async function getLocationByPostalCode(ctx) {
  try {
    const { cep } = ctx.params;
    weakValidation(cep, "Informe o CEP");

    const response = await supportModule.getLocationByPostalCode(cep);
    return responseObject(ctx, HttpCodes.SUCCESS, response);
  } catch (error) {
    errorHandler(ctx, error, error.message);
  }
}

async function getBanks(ctx) {
  try {
    const response = await supportModule.getBanks();
    return responseObject(ctx, HttpCodes.SUCCESS, response);
  } catch (error) {
    errorHandler(ctx, error, error.message);
  }
}

async function getBankByCode(ctx) {
  try {
    const { code } = ctx.params;
    weakValidation(code, "Informe o código do banco");

    const response = await supportModule.getBankByCode(code);
    return responseObject(ctx, HttpCodes.SUCCESS, response);
  } catch (error) {
    errorHandler(ctx, error, error.message);
  }
}

SupportRoutes.get(
  "/location/states",
  basicAuthenticationMiddleware,
  getLocationStates
);
SupportRoutes.get(
  "/location/:uf/cities",
  basicAuthenticationMiddleware,
  getCitiesByState
);
SupportRoutes.get(
  "/location/postal-code/:cep",
  rateLimiter(5, 20),
  getLocationByPostalCode
);
SupportRoutes.get("/banks/all", basicAuthenticationMiddleware, getBanks);
SupportRoutes.get(
  "/banks/:code",
  basicAuthenticationMiddleware,
  rateLimiter(5, 20),
  getBankByCode
);

module.exports = mount("/api/support", SupportRoutes.routes());
