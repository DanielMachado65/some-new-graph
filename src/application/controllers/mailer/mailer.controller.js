"use strict";

const emailSuppressionModule = require("../../../domain/support/email_suppression/emailSuppression.module");
const weakValidator = require("../../../infrastructure/utils/weakValidator.util");
const HttpCodes = require("../../../infrastructure/enumerators/httpCode.enum");

const {
  responseObject,
} = require("../../../infrastructure/helpers/routerHelper");

const mount = require("koa-mount");
const Router = require("koa-router");
const MailerRouter = new Router();

MailerRouter.get("/suppress/:email", suppressEmail);
async function suppressEmail(ctx) {
  try {
    const { email } = ctx.params;
    const ip = ctx.request.headers["x-forwarded-for"];
    weakValidator.weakValidation(email);
    await emailSuppressionModule.addUserToSuppressionEmailList(email, ip);
    return responseObject(
      ctx,
      HttpCodes.SUCCESS,
      `O e-mail ${email} não receberá mais nenhuma notificação da empresa Olho no Carro a partir de agora! #OlhoNoCarro`
    );
  } catch (e) {
    return responseObject(ctx, HttpCodes.GONE_ERROR, e.message);
  }
}

module.exports = mount("/api/mailer", MailerRouter.routes());
