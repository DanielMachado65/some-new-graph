"use strict";

const partnerIncomingModule = require("../../../domain/billing/partner_incoming/partnerIncoming.module");
const HttpCodes = require("../../../infrastructure/enumerators/httpCode.enum");

const {
  responseObject,
} = require("../../../infrastructure/helpers/routerHelper");
const {
  basicAuthenticationMiddleware,
} = require("../../middlewares/authMiddleware");

const mount = require("koa-mount");
const Router = require("koa-router");
const PartnerIncomingRoutes = new Router();

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

PartnerIncomingRoutes.get(
  "/",
  basicAuthenticationMiddleware,
  getSinglePartnerIncomingsByDate
);
async function getSinglePartnerIncomingsByDate(ctx) {
  try {
    const partnerUserId = ctx.auth_user_id;
    const { month, year } = ctx.query;
    const response = await partnerIncomingModule.getSinglePartnerIncomingsByDate(
      partnerUserId,
      month,
      year
    );
    return responseObject(ctx, HttpCodes.SUCCESS, response);
  } catch (error) {
    console.log(error);
    errorHandler(ctx, error);
  }
}

module.exports = mount("/api/partner-incoming", PartnerIncomingRoutes.routes());
