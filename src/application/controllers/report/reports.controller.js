"use strict";

const reportModule = require("../../../domain/report/report.module");
const HttpCodes = require("../../../infrastructure/enumerators/httpCode.enum");

const {
  responseObject,
} = require("../../../infrastructure/helpers/routerHelper");
const {
  supperMiddleware,
} = require("../../middlewares/authSupperUserMiddleware");

const mount = require("koa-mount");
const Router = require("koa-router");
const httpCodeEnum = require("../../../infrastructure/enumerators/httpCode.enum");
const ReportsRoutes = new Router();

const errorHandler = (ctx, error) => {
  const errorResponse = error && error.response;
  const status =
    (errorResponse && errorResponse.status) || HttpCodes.GONE_ERROR;
  const statusText = errorResponse && errorResponse.statusText;
  return responseObject(ctx, status, statusText);
};

/* --------------------
  Feedback
-------------------- */
ReportsRoutes.post(
  "/feedback/top-ratings",
  supperMiddleware,
  getTopRatingsOfFeedbacks
);
async function getTopRatingsOfFeedbacks(ctx) {
  try {
    const { month, year } = ctx.request.body;
    const userId = ctx.auth_user_id;

    reportModule
      .getTopRatingsOfFeedbacks({
        month,
        year,
        userId,
      })
      .finally();

    return responseObject(
      ctx,
      HttpCodes.SUCCESS,
      "report will be generated and sent by email"
    );
  } catch (error) {
    errorHandler(ctx, error);
  }
}

/* --------------------
  Test Drive
-------------------- */
ReportsRoutes.post(
  "/test-drive/chosen-versions",
  supperMiddleware,
  getChosenVersionsInTestDrive
);
async function getChosenVersionsInTestDrive(ctx) {
  try {
    const { month, year } = ctx.request.body;
    const userId = ctx.auth_user_id;

    reportModule
      .getChosenVersionsInTestDrive({
        month,
        year,
        userId,
      })
      .finally();

    return responseObject(
      ctx,
      HttpCodes.SUCCESS,
      "report will be generated and sent by email"
    );
  } catch (error) {
    errorHandler(ctx, error);
  }
}

/* --------------------
  Partner Incoming
-------------------- */
ReportsRoutes.post(
  "/partner-incoming/all-incomings",
  supperMiddleware,
  getAllPartnersIncomingsByDate
);
async function getAllPartnersIncomingsByDate(ctx) {
  try {
    const { month, year } = ctx.request.body;
    const userId = ctx.auth_user_id;

    reportModule.getAllPartnersIncomingsByDate(userId, month, year).finally();

    return responseObject(
      ctx,
      HttpCodes.SUCCESS,
      "report will be generated and sent by email"
    );
  } catch (error) {
    errorHandler(ctx, error);
  }
}

/* --------------------
  Analytics
-------------------- */
ReportsRoutes.post(
  "/analytics/redirections",
  supperMiddleware,
  getAllAnalyticsByDate
);
async function getAllAnalyticsByDate(ctx) {
  try {
    const { month, year } = ctx.request.body;
    const userId = ctx.auth_user_id;

    reportModule.getAllAnalyticsByDate(userId, month, year).finally();

    return responseObject(
      ctx,
      HttpCodes.SUCCESS,
      "report will be generated and sent by email"
    );
  } catch (error) {
    errorHandler(ctx, error);
  }
}

/* --------------------
  Owners Review
-------------------- */
ReportsRoutes.post(
  "/owners-review/report-by-date",
  supperMiddleware,
  getOwnersReviewReportByDate
);
async function getOwnersReviewReportByDate(ctx) {
  try {
    const { month, year } = ctx.request.body;
    const userId = ctx.auth_user_id;

    reportModule.getOwnersReviewReportByDate({ month, year, userId }).finally();

    return responseObject(
      ctx,
      HttpCodes.SUCCESS,
      "report will be generated and sent by email"
    );
  } catch (error) {
    errorHandler(ctx, error);
  }
}

/* --------------------
  Manually Generated NFe
-------------------- */
ReportsRoutes.post(
  "/manually-generated-nfe/report-by-date",
  supperMiddleware,
  getGeneratedNfeReportByDate
);
async function getGeneratedNfeReportByDate(ctx) {
  try {
    const { month, year } = ctx.request.body;
    const userId = ctx.auth_user_id;

    reportModule.getGeneratedNfeReportByDate({ month, year, userId }).finally();

    return responseObject(
      ctx,
      HttpCodes.SUCCESS,
      "report will be generated and sent by email"
    );
  } catch (error) {
    errorHandler(ctx, error);
  }
}

/* --------------------
  report model not found
-------------------- */
ReportsRoutes.get("/model-not-found", supperMiddleware, modelNotFound);
async function modelNotFound(ctx) {
  try {
    const query = ctx.request.query;
    const response = await reportModule.getModelNotFoundByDate(query);
    return responseObject(ctx, httpCodeEnum.SUCCESS, response);
  } catch (error) {
    return responseObject(ctx, httpCodeEnum.BAD_REQUEST, null);
  }
}

/* -------------------------------
  User with active
---------------------------------- */
ReportsRoutes.post(
  "/payments/active-signatures",
  supperMiddleware,
  getActivePayments
);
async function getActivePayments(ctx) {
  try {
    const { month, year } = ctx.request.body;
    const userId = ctx.auth_user_id;

    reportModule.getActivePayments(month, year, userId).finally();

    return responseObject(
      ctx,
      httpCodeEnum.SUCCESS,
      '"report will be generated and sent by email"'
    );
  } catch (error) {
    return responseObject(ctx, httpCodeEnum.BAD_REQUEST, null);
  }
}

/* -------------------------------
  User with packages
---------------------------------- */
ReportsRoutes.post("/payments/packages", supperMiddleware, gatPackages);
async function gatPackages(ctx) {
  try {
    const { month, year } = ctx.request.body;
    const userId = ctx.auth_user_id;

    reportModule.getPackages(month, year, userId).finally();

    return responseObject(
      ctx,
      httpCodeEnum.SUCCESS,
      '"report will be generated and sent by email"'
    );
  } catch (error) {
    return responseObject(ctx, httpCodeEnum.BAD_REQUEST, null);
  }
}

/* -------------------------------
  Report logs in micro service SUV
---------------------------------- */
ReportsRoutes.post("/suv/logs", supperMiddleware, getSuvLogs);
async function getSuvLogs(ctx) {
  try {
    const { month, year } = ctx.request.body;
    const userId = ctx.auth_user_id;

    reportModule.getSuvLogs(month, year, userId);

    return responseObject(
      ctx,
      httpCodeEnum.SUCCESS,
      '"report will be generated and sent by email"'
    );
  } catch (error) {
    return responseObject(ctx, httpCodeEnum.BAD_REQUEST, null);
  }
}

module.exports = mount("/api/report", ReportsRoutes.routes());
