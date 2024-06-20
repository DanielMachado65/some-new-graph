"use strict";

const mount = require("koa-mount");
const Router = require("koa-router");
const QueryExecutorRoutes = new Router();

const queryExecutorModule = require("../../../domain/query/queryExecutor/queryExecutor.module");
const HttpCodes = require("../../../infrastructure/enumerators/httpCode.enum");
const { rateLimiter } = require("../../middlewares/rate-limit.middleware");
const {
  weakValidationToNVariables,
} = require("../../../infrastructure/utils/weakValidator.util");
const {
  responseObject,
} = require("../../../infrastructure/helpers/routerHelper");
const {
  basicIdentificationMiddleware,
} = require("../../middlewares/authMiddleware");

const errorHandler = (ctx, error, msg) => {
  const errorResponse = error && error.response;
  const status =
    (errorResponse && errorResponse.status) || HttpCodes.GONE_ERROR;
  const statusText = (errorResponse && errorResponse.statusText) || msg;
  return responseObject(ctx, status, statusText);
};

async function executeQueryAsTestDrive(ctx) {
  try {
    const ip = ctx.request.ip;
    const maybeUser = ctx.auth_user_id;
    const userAgent = ctx.headers["user-agent"];
    const { queryCode, keys, navigationToken, userCity } = ctx.request.body;

    const startTime = new Date().getTime();
    weakValidationToNVariables(queryCode, keys);

    const response = await queryExecutorModule.executeQueryAsTestDrive({
      queryCode,
      keys,
      navigationToken,
      startTime,
      ip,
      maybeUser,
      userCity,
      userAgent,
    });

    return responseObject(ctx, HttpCodes.SUCCESS, response);
  } catch (error) {
    errorHandler(ctx, error, error.message);
  }
}

async function executeQueryAsDefault(ctx) {
  try {
    const startTime = new Date().getTime();
    const { queryCode, keys, duplicity } = ctx.request.body;
    const userId = ctx.auth_user_id;
    weakValidationToNVariables(queryCode, keys, duplicity);

    const response = await queryExecutorModule.executeQueryAsDefault({
      queryCode,
      keys,
      duplicity,
      startTime,
      userId,
    });

    return responseObject(ctx, HttpCodes.SUCCESS, response);
  } catch (error) {
    errorHandler(ctx, error, error.message);
  }
}

QueryExecutorRoutes.post(
  "/test-drive",
  // rateLimiter(5, 5),
  basicIdentificationMiddleware,
  executeQueryAsTestDrive
);
// QueryExecutorRoutes.post("/", basicAuthenticationMiddleware, executeQueryAsDefault);

module.exports = mount("/api/query-executor", QueryExecutorRoutes.routes());
