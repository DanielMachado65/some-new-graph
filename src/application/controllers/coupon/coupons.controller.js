"use strict";

const couponsModule = require("../../../domain/coupon/coupons.module");
const userModule = require("../../../domain/user/user/userModule");
const HttpCodes = require("../../../infrastructure/enumerators/httpCode.enum");
const {
  weakValidation,
} = require("../../../infrastructure/utils/weakValidator.util");

const {
  responseObject,
} = require("../../../infrastructure/helpers/routerHelper");
const {
  supperMiddleware,
} = require("../../middlewares/authSupperUserMiddleware");
const {
  basicAuthenticationMiddleware,
} = require("../../middlewares/authMiddleware");

const mount = require("koa-mount");
const Router = require("koa-router");
const CouponsRoutes = new Router();

const errorHandler = (ctx, error) => {
  const errorResponse = error && error.response;
  const status =
    (errorResponse && errorResponse.status) || HttpCodes.GONE_ERROR;
  const statusText = errorResponse && errorResponse.statusText;
  return responseObject(ctx, status, statusText);
};

CouponsRoutes.get("/find", supperMiddleware, findCoupons);
async function findCoupons(ctx) {
  try {
    const { code, percentage, discount, status } = ctx.request.query;

    const response = await couponsModule.findCoupons({
      code,
      percentage,
      discount,
      status
    });
    return responseObject(ctx, HttpCodes.SUCCESS, response);
  } catch (error) {
    errorHandler(ctx, error);
  }
}

CouponsRoutes.get(
  "/linked-to-user/:userId",
  basicAuthenticationMiddleware,
  couponsLinkedToUser
);
async function couponsLinkedToUser(ctx) {
  try {
    const userId = ctx.params.userId;
    weakValidation(userId, "User ID must be sent");
    const count = await couponsModule.couponsLinkedToUser(userId);
    return responseObject(ctx, HttpCodes.SUCCESS, { count });
  } catch (error) {
    errorHandler(ctx, error);
  }
}

CouponsRoutes.patch("/update/:couponId", supperMiddleware, updateCoupon);
async function updateCoupon(ctx) {
  try {
    const couponId = ctx.params.couponId;
    const {
      status,
      creatorEmail,
      limitUsage,
      usageMaxToUser,
    } = ctx.request.body;

    weakValidation(couponId, "Coupon ID must be sent");

    let userId = undefined;
    if (creatorEmail) {
      const user = await userModule.getByEmail(creatorEmail, { _id: 1 });
      weakValidation(couponId, "User e-mail is not valid");
      userId = user._id;
    } else if (creatorEmail === null) {
      userId = null;
    }

    const response = await couponsModule.updateCoupon(couponId, {
      status,
      userId,
      limitUsage,
      usageMaxToUser,
    });
    return responseObject(ctx, HttpCodes.SUCCESS, response);
  } catch (error) {
    errorHandler(ctx, error);
  }
}

module.exports = mount("/api/coupons", CouponsRoutes.routes());
