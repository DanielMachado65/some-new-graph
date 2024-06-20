"use strict";
const mount = require("koa-mount");
const Router = require("koa-router");
const HttpCodes = require("../../../infrastructure/enumerators/httpCode.enum");
const { rateLimiter } = require("../../middlewares/rate-limit.middleware");
const {
  supperMiddleware,
} = require("../../middlewares/authSupperUserMiddleware");

const OwnerReviewRoutes = new Router();
const {
  responseObject,
} = require("../../../infrastructure/helpers/routerHelper");
const {
  sendOwnerReview,
  searchOpinionsModel,
  getVersion,
  getBrandModel,
  getScoreVersion,
  getScoreBrandModel,
  getReviews,
  getCountReviews,
  findReview,
  removeReview,
} = require("../../../domain/owners_review/ownersReview.module");

const errorHandler = (ctx, error, msg) => {
  const errorResponse = error && error.response;
  const status =
    (errorResponse && errorResponse.status) || HttpCodes.GONE_ERROR;
  const statusText = (errorResponse && errorResponse.statusText) || msg;
  return responseObject(ctx, status, statusText);
};

OwnerReviewRoutes.post("/send-owner-review", createOwnerReview);
async function createOwnerReview(ctx) {
  try {
    const keys = ctx.request.body;

    const response = await sendOwnerReview(keys);

    return responseObject(ctx, HttpCodes.SUCCESS, response);
  } catch (error) {
    errorHandler(ctx, error, error.message);
  }
}

OwnerReviewRoutes.get("/version/:fipeId", getOwnerReviewQueriesVersion);
async function getOwnerReviewQueriesVersion(ctx) {
  try {
    const { fipeId } = ctx.params;
    const { page, limit } = ctx.query;

    const response = await getVersion(fipeId, page, limit);

    return responseObject(ctx, HttpCodes.SUCCESS, response);
  } catch (error) {
    errorHandler(ctx, error, error.message);
  }
}

OwnerReviewRoutes.get(
  "/score-version/:fipeId",
  getOwnerReviewQueriesScoreVersion
);
async function getOwnerReviewQueriesScoreVersion(ctx) {
  try {
    const { fipeId } = ctx.params;

    const response = await getScoreVersion(fipeId);

    return responseObject(ctx, HttpCodes.SUCCESS, response);
  } catch (error) {
    errorHandler(ctx, error, error.message);
  }
}

OwnerReviewRoutes.get(
  "/brand-model/:codModelBrand",
  getOwnerReviewQueriesBrandModel
);
async function getOwnerReviewQueriesBrandModel(ctx) {
  try {
    const { codModelBrand } = ctx.params;
    const { page, limit } = ctx.query;

    const response = await getBrandModel(codModelBrand, page, limit);

    return responseObject(ctx, HttpCodes.SUCCESS, response);
  } catch (error) {
    errorHandler(ctx, error, error.message);
  }
}

OwnerReviewRoutes.get(
  "/score-brand-model/:codModelBrand",
  getOwnerReviewQueriesScoreBrandModel
);
async function getOwnerReviewQueriesScoreBrandModel(ctx) {
  try {
    const { codModelBrand } = ctx.params;

    const response = await getScoreBrandModel(codModelBrand);

    return responseObject(ctx, HttpCodes.SUCCESS, response);
  } catch (error) {
    errorHandler(ctx, error, error.message);
  }
}

OwnerReviewRoutes.post("/search-opinions", rateLimiter(5, 10), searchOpinions);
async function searchOpinions(ctx) {
  try {
    const { codModelBrand, fipeId } = ctx.request.body;
    const { page, limit } = ctx.query;
    const response = await searchOpinionsModel(
      codModelBrand,
      fipeId,
      page,
      limit
    );
    return responseObject(ctx, HttpCodes.SUCCESS, response);
  } catch (error) {
    errorHandler(ctx, error, error.message);
  }
}

OwnerReviewRoutes.get("/admin/all", supperMiddleware, findReviews);
async function findReviews(ctx) {
  try {
    const { dtStart, dtEnd, licensePlate, mail, fipeId } = ctx.query;
    const response = await getReviews(
      dtStart,
      dtEnd,
      licensePlate,
      mail,
      fipeId
    );
    return responseObject(ctx, HttpCodes.SUCCESS, response);
  } catch (err) {
    errorHandler(ctx, err, err.message);
  }
}

OwnerReviewRoutes.get("/admin/count", supperMiddleware, countReviews);
async function countReviews(ctx) {
  try {
    const response = await getCountReviews();
    return responseObject(ctx, HttpCodes.SUCCESS, response);
  } catch (err) {
    errorHandler(ctx, err, err.message);
  }
}

OwnerReviewRoutes.del("/admin/:reviewId", supperMiddleware, deleteReview);
async function deleteReview(ctx) {
  try {
    const { reviewId } = ctx.params;
    const response = await removeReview(reviewId);
    return responseObject(ctx, HttpCodes.SUCCESS, response);
  } catch (err) {
    errorHandler(ctx, err, err.message);
  }
}

OwnerReviewRoutes.get("/admin/:reviewId", supperMiddleware, getReview);
async function getReview(ctx) {
  try {
    const { reviewId } = ctx.params;
    const response = await findReview(reviewId);
    return responseObject(ctx, HttpCodes.SUCCESS, response);
  } catch (err) {
    errorHandler(ctx, err, err.message);
  }
}

module.exports = mount("/api/owners-review-query", OwnerReviewRoutes.routes());
