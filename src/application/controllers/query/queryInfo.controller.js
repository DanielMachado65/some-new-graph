"use strict";

const queryInfoModule = require("../../../domain/query/queryInfo/queryInfo.module");
const HttpCodes = require("../../../infrastructure/enumerators/httpCode.enum");

const {
  responseObject,
} = require("../../../infrastructure/helpers/routerHelper");
const {
  supperMiddleware,
} = require("../../middlewares/authSupperUserMiddleware");
const weakValidator = require("../../../infrastructure/utils/weakValidator.util");

const mount = require("koa-mount");
const Router = require("koa-router");
const QueryInfoRoutes = new Router();

const errorHandler = (ctx, error) => {
  const errorResponse = error && error.response;
  const status =
    (errorResponse && errorResponse.status) || HttpCodes.GONE_ERROR;
  const statusText = errorResponse && errorResponse.statusText;
  return responseObject(ctx, status, statusText);
};

QueryInfoRoutes.get("/", getAllQueryInfos);
async function getAllQueryInfos(ctx) {
  try {
    const response = await queryInfoModule.getAllQueryInfos();
    return responseObject(ctx, HttpCodes.SUCCESS, response);
  } catch (error) {
    errorHandler(ctx, error);
  }
}

QueryInfoRoutes.post("/", supperMiddleware, createQueryInfo);
async function createQueryInfo(ctx) {
  try {
    const {
      image,
      name,
      description,
      isAvailable,
      isAvailableToOthers,
    } = ctx.request.body;
    weakValidator.weakValidationToNVariables(
      image,
      name,
      description,
      isAvailable,
      isAvailableToOthers
    );
    const queryInfo = {
      image,
      name,
      description,
      isAvailable,
      isAvailableToOthers,
    };
    const response = await queryInfoModule.createQueryInfo(queryInfo);
    return responseObject(ctx, HttpCodes.SUCCESS, response);
  } catch (error) {
    errorHandler(ctx, error);
  }
}

QueryInfoRoutes.put("/:queryInfoId", supperMiddleware, updateQueryInfo);
async function updateQueryInfo(ctx) {
  try {
    const { queryInfoId } = ctx.params;
    const {
      image,
      name,
      description,
      isAvailable,
      isAvailableToOthers,
    } = ctx.request.body;
    weakValidator.weakValidation(queryInfoId);
    weakValidator.hasAtLeastOneDefinedValue(
      image,
      name,
      description,
      isAvailable,
      isAvailableToOthers
    );
    const queryInfo = {
      image,
      name,
      description,
      isAvailable,
      isAvailableToOthers,
    };
    const response = await queryInfoModule.updateQueryInfo(
      queryInfoId,
      queryInfo
    );
    return responseObject(ctx, HttpCodes.SUCCESS, response);
  } catch (error) {
    errorHandler(ctx, error);
  }
}

QueryInfoRoutes.delete("/:queryInfoId", supperMiddleware, removeQueryInfo);
async function removeQueryInfo(ctx) {
  try {
    const { queryInfoId } = ctx.params;
    weakValidator.weakValidation(queryInfoId);
    const response = await queryInfoModule.removeQueryInfo(queryInfoId);
    return responseObject(ctx, HttpCodes.SUCCESS, response);
  } catch (error) {
    errorHandler(ctx, error);
  }
}

module.exports = mount("/api/query-info", QueryInfoRoutes.routes());
