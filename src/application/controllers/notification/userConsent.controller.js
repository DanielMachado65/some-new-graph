"use strict";

const userConsentModule = require("../../../domain/notification/user_consent/userConsent.module");
const HttpCodes = require("../../../infrastructure/enumerators/httpCode.enum");

const {
  responseObject,
} = require("../../../infrastructure/helpers/routerHelper");

const mount = require("koa-mount");
const Router = require("koa-router");
const {
  basicAuthenticationMiddleware,
} = require("../../middlewares/authMiddleware");
const UserConsentRoutes = new Router();

const errorHandler = (ctx, error) => {
  const errorResponse = error && error.response;
  const status =
    (errorResponse && errorResponse.status) || HttpCodes.GONE_ERROR;
  const statusText = errorResponse && errorResponse.statusText;
  return responseObject(ctx, status, statusText);
};

UserConsentRoutes.get("/", basicAuthenticationMiddleware, getUserConsent);
async function getUserConsent(ctx) {
  try {
    const userId = ctx.auth_user_id;
    const consents = await userConsentModule.getUserConsents(userId);
    return responseObject(ctx, HttpCodes.SUCCESS, consents);
  } catch (error) {
    errorHandler(ctx, error);
  }
}

UserConsentRoutes.put(
  "/:consentId",
  basicAuthenticationMiddleware,
  updateUserConsent
);
async function updateUserConsent(ctx) {
  try {
    const { consentId } = ctx.params;
    const { hasGivenConsent } = ctx.request.body;
    const updatedConsent = await userConsentModule.updateUserConsent(
      consentId,
      hasGivenConsent
    );
    return responseObject(ctx, HttpCodes.SUCCESS, updatedConsent);
  } catch (error) {
    errorHandler(ctx, error);
  }
}

module.exports = mount("/api/user-consent", UserConsentRoutes.routes());
