"use strict";

const analyticsModule = require("../../../domain/analytics/analytics.module");
const HttpCodes = require("../../../infrastructure/enumerators/httpCode.enum");

const {
  responseObject,
} = require("../../../infrastructure/helpers/routerHelper");
const weakValidator = require("../../../infrastructure/utils/weakValidator.util");

const mount = require("koa-mount");
const Router = require("koa-router");
const AnalyticsRoutes = new Router();

AnalyticsRoutes.post("/", createAnalytics);
async function createAnalytics(ctx) {
  const { userId, queryId, link } = ctx.request.body;
  weakValidator.weakValidationToNVariables(queryId, link);
  analyticsModule.createAnalytics(userId, queryId, link).catch().finally();
  return responseObject(ctx, HttpCodes.SUCCESS, "Mensagem enviada!");
}

module.exports = mount("/api/partner-interaction", AnalyticsRoutes.routes());
