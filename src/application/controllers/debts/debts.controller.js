"use strict";

const debtsModule = require("../../../domain/debts/debts.module");
const HttpCodes = require("../../../infrastructure/enumerators/httpCode.enum");

const {
  responseObject,
} = require("../../../infrastructure/helpers/routerHelper");
const {
  basicAuthenticationMiddleware,
} = require("../../middlewares/authMiddleware");
const weakValidator = require("../../../infrastructure/utils/weakValidator.util");

const mount = require("koa-mount");
const Router = require("koa-router");
const DebtsRoutes = new Router();

const errorHandler = (ctx, error) => {
  const errorResponse = error && error.response;
  const status =
    (errorResponse && errorResponse.status) || HttpCodes.GONE_ERROR;
  const statusText =
    typeof errorResponse === "string"
      ? errorResponse
      : typeof errorResponse === "object"
      ? (errorResponse.data && errorResponse.data.error) ||
        errorResponse.statusText
      : "Unknown error";
  return responseObject(ctx, status, statusText);
};

DebtsRoutes.get("/search-debts/:plate", searchDebts);
async function searchDebts(ctx) {
  try {
    const { plate } = ctx.params;
    weakValidator.weakValidation(plate);
    const response = await debtsModule.searchDebts(plate);
    return responseObject(ctx, HttpCodes.SUCCESS, response);
  } catch (error) {
    errorHandler(ctx, error);
  }
}

DebtsRoutes.post(
  "/retrieve-installments",
  // basicAuthenticationMiddleware,
  retrieveInstallments
);
async function retrieveInstallments(ctx) {
  try {
    const { protocol, debts } = ctx.request.body;
    weakValidator.weakValidation(protocol);
    weakValidator.weakValidationIfVariableIsNotArray(debts);
    const response = await debtsModule.retrieveInstallments(protocol, debts);
    return responseObject(ctx, HttpCodes.SUCCESS, response);
  } catch (error) {
    errorHandler(ctx, error);
  }
}

module.exports = mount("/api/debts", DebtsRoutes.routes());
