"use strict";
const mount = require("koa-mount");
const Router = require("koa-router");
const HttpCodes = require("../../../infrastructure/enumerators/httpCode.enum");
const {
  basicAuthenticationMiddleware,
} = require("../../middlewares/authMiddleware");

const {
  responseObject,
} = require("../../../infrastructure/helpers/routerHelper");

const {
  getAllUserLogs,
  downloadUserLogs,
} = require("../../../domain/utilization-log/utilization-log.module");

const lgpdRoutes = new Router();

const errorHandler = (ctx, error, msg) => {
  const errorResponse = error && error.response;
  const status =
    (errorResponse && errorResponse.status) || HttpCodes.GONE_ERROR;
  const statusText = (errorResponse && errorResponse.statusText) || msg;
  return responseObject(ctx, status, statusText);
};

lgpdRoutes.get("/user-logs", basicAuthenticationMiddleware, getUserLogs);
async function getUserLogs(ctx) {
  try {
    const userId = ctx.auth_user_id;
    const { limit, page } = ctx.query;
    const response = await getAllUserLogs(userId, limit, page);
    return responseObject(ctx, HttpCodes.SUCCESS, response);
  } catch (err) {
    errorHandler(ctx, err, err.message);
  }
}

lgpdRoutes.get("/download", basicAuthenticationMiddleware, downloadLogs);
async function downloadLogs(ctx) {
  try {
    const userId = ctx.auth_user_id;
    const [name, buffer] = await downloadUserLogs(userId);
    ctx.response.attachment(name);
    ctx.body = buffer;
    ctx.status = HttpCodes.SUCCESS;
    return ctx;
  } catch (err) {
    errorHandler(ctx, err, err.message);
  }
}

module.exports = mount("/api/utilization-log", lgpdRoutes.routes());
