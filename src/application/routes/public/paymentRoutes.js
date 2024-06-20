"use strict";

const { isDevEnv } = require("../../../infrastructure/config/config");
const Router = require("koa-router");
const PaymentController = require("../../controllers/billing/paymentController");
const ResponseStatusEnum = require("../../../infrastructure/dictionaries/ResponseStatusEnum");
const {
  responseObject,
} = require("../../../infrastructure/helpers/routerHelper");
const PaymentRouter = new Router();
const {
  basicAuthenticationMiddleware,
} = require("../../middlewares/authMiddleware");
const {
  supperMiddleware,
} = require("../../middlewares/authSupperUserMiddleware");
const { errorHandler } = require("../../application_services/errorHandler");
const httpCodes = require("../../../infrastructure/enumerators/httpCode.enum");

PaymentRouter.post(
  "/v2/signature/:userid",
  basicAuthenticationMiddleware,
  async function (ctx, _next) {
    const userId = ctx.auth_user_id;
    const params = ctx.request.body;

    const isValidParams =
      userId &&
      params &&
      params.cart &&
      params.cart.paymentToken &&
      params.cart.products &&
      params.cart.type &&
      Array.isArray(params.cart.products.packages) &&
      Array.isArray(params.cart.products.queries) &&
      Array.isArray(params.cart.products.signatures) &&
      params.cart.products.signatures.every((i) => i.amount <= 1) &&
      params.total &&
      params.creditCardData;
    // Google Recaptcha
    // && (isDevEnv ? true : params.navigationToken);

    if (!isValidParams) {
      const response = errorHandler("INVALID_PARAMS");
      return responseObject(ctx, response.status, response.msg);
    }

    let paymentCreationOrigin = PaymentController.extractPaymentCreationOrigin(ctx);

    const { result, error } = await PaymentController.executeSignaturePayment(
      userId,
      params,
      { paymentCreationOrigin }
    );

    const response = error
      ? errorHandler(error)
      : { status: ResponseStatusEnum(200), msg: result };

    return responseObject(ctx, response.status, response.msg);
  }
);

PaymentRouter.post(
  "/v2/:userid",
  basicAuthenticationMiddleware,
  async function (ctx, _next) {
    const userId = ctx.auth_user_id;
    const params = ctx.request.body;
    const ip = ctx.request.headers["x-forwarded-for"];
    const isValidParams =
      userId &&
      params &&
      params.cart &&
      params.cart.type &&
      params.cart.products &&
      Array.isArray(params.cart.products.packages) &&
      Array.isArray(params.cart.products.queries) &&
      Array.isArray(params.cart.products.signatures) &&
      (params.cart.paymentToken || params.creditCardData) &&
      params.total;
    // Google Recaptcha
    // && (isDevEnv ? true : params.navigationToken);

    if (!isValidParams) {
      const response = errorHandler("INVALID_PARAMS");
      return responseObject(ctx, response.status, response.msg);
    }

    let paymentCreationOrigin = PaymentController.extractPaymentCreationOrigin(ctx);

    const {
      result,
      error,
    } = await PaymentController.executePaymentWithCreditCard(
      userId,
      params,
      ip,
      { paymentCreationOrigin }
    );

    const response = error
      ? errorHandler(error)
      : { status: ResponseStatusEnum(200), msg: result };

    return responseObject(ctx, response.status, response.msg);
  }
);

PaymentRouter.post(
  "/pix/:userId",
  basicAuthenticationMiddleware,
  async function (ctx) {
    const userId = ctx.auth_user_id;
    const paymentData = ctx.request.body;
    const ip = ctx.request.headers["x-forwarded-for"];
    let paymentCreationOrigin = PaymentController.extractPaymentCreationOrigin(ctx);
    if (userId && paymentData) {
      const { result, error } = await PaymentController.executePaymentWithPix(
        userId,
        paymentData,
        ip,
        { paymentCreationOrigin }
      );
      const response = error
        ? errorHandler(error)
        : { status: ResponseStatusEnum(200), msg: result };

      return responseObject(ctx, response.status, response.msg);
    }
    const response = errorHandler("INVALID_PARAMS");
    return responseObject(ctx, response.status, response.msg);
  }
);

PaymentRouter.post(
  "/debts/by-credit-card/:userId",
  basicAuthenticationMiddleware,
  PaymentController.paymentDebtWithCreditCard
);

PaymentRouter.post(
  "/debts/by-pix/:userId",
  basicAuthenticationMiddleware,
  PaymentController.paymentDebtWithPix
);

PaymentRouter.post("/:userid", basicAuthenticationMiddleware, async function (
  ctx,
  next
) {
  const userId = ctx.auth_user_id;
  let params = ctx.request.body;
  if (userId && params) {
    let response = await PaymentController.execute(userId, params);
    if (response.error)
      return responseObject(ctx, ResponseStatusEnum(response.code), {
        error: response.error,
      });
    return responseObject(
      ctx,
      ResponseStatusEnum(response.code),
      response.data
    );
  }
  return responseObject(ctx, ResponseStatusEnum(405), null);
});

PaymentRouter.get(
  "/transactions/:userid",
  basicAuthenticationMiddleware,
  async function (ctx, next) {
    let userid = ctx.params.userid;
    let dt = ctx.query.dt;
    if (userid) {
      let response = await PaymentController.getUserTransactions(userid, dt);
      if (response.error)
        return responseObject(ctx, ResponseStatusEnum(500), {
          error: response,
        });
      return responseObject(ctx, ResponseStatusEnum(200), response);
    }
    return responseObject(ctx, ResponseStatusEnum(405), null);
  }
);

PaymentRouter.get(
  "/transactions-count",
  basicAuthenticationMiddleware,
  PaymentController.getTransactionsCount
);

PaymentRouter.get(
  "/all-charges-with-coupon/:userid",
  basicAuthenticationMiddleware,
  async (ctx, next) => {
    const userid = ctx.params.userid;
    const month = ctx.query.month;
    const year = ctx.query.year;
    const code = ctx.query.code;
    if (userid) {
      return responseObject(
        ctx,
        ResponseStatusEnum(200),
        await PaymentController.getChargesByCoupon(userid, month, year, code)
      );
    }
    return responseObject(ctx, ResponseStatusEnum(405), null);
  }
);

PaymentRouter.post(
  "/bank-billet/:userId",
  basicAuthenticationMiddleware,
  PaymentController.paymentWithBankBillet
);

//@deprected
PaymentRouter.post(
  "/webhook/backpressure/:gateway",
  PaymentController.paymentBackpressureWebHook
);

PaymentRouter.post("/webhook/:gateway", (ctx) => {
  PaymentController.paymentWebHook(ctx).finally();
  return responseObject(ctx, httpCodes.SUCCESS, null);
});

PaymentRouter.post(
  "/send-billing-email-to-user-that-choose-pix/:paymentId",
  PaymentController.checkPixStatusPaymentAndSendEmailIfNeeded
);

PaymentRouter.get(
  "/month-promo",
  basicAuthenticationMiddleware,
  PaymentController.shouldShowPopUpMensalPlans
);

PaymentRouter.post(
  "/report/orders-with-first-coupon",
  supperMiddleware,
  PaymentController.generateReportOrdersWithFirstCouponUsedIfHave
);

module.exports = PaymentRouter;
