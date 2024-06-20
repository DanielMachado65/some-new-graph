"use strict";

const insuranceFinancingModule = require("../../../domain/insurance_financing/insuranceFinancing.module");
const weakValidator = require("../../../infrastructure/utils/weakValidator.util");
const HttpCodes = require("../../../infrastructure/enumerators/httpCode.enum");

const {
  responseObject,
} = require("../../../infrastructure/helpers/routerHelper");

const mount = require("koa-mount");
const Router = require("koa-router");
const InsuranceFinancingRouter = new Router();

InsuranceFinancingRouter.post(
  "/create-new-insurance-financing-record",
  createNewInsuranceFinancingRecord
);
async function createNewInsuranceFinancingRecord(ctx) {
  try {
    const {
      queryId,
      userId,
      hasInterestVehicularFinancingQuote,
      hasInterestInVehicularInsuranceQuote,
      hasAcceptedFromToShareOwnInfos,
    } = ctx.request.body;
    weakValidator.weakValidationToNVariables(queryId, userId);
    await insuranceFinancingModule.createNewInsuranceFinancingRecord(
      queryId,
      userId,
      hasInterestVehicularFinancingQuote,
      hasInterestInVehicularInsuranceQuote,
      hasAcceptedFromToShareOwnInfos
    );
    return responseObject(ctx, HttpCodes.SUCCESS, "ok");
  } catch (e) {
    return responseObject(ctx, HttpCodes.GONE_ERROR, e.message);
  }
}

InsuranceFinancingRouter.get(
  "/popup-dispatch-control",
  getPopupVisibilityStatus
);
async function getPopupVisibilityStatus(ctx) {
  try {
    const { query } = ctx.request.query;
    weakValidator.weakValidationToNVariables(query);
    const response = await insuranceFinancingModule.getPopupVisibilityStatus(query);
    return responseObject(ctx, HttpCodes.SUCCESS, response);
  } catch (e) {
    return responseObject(ctx, HttpCodes.GONE_ERROR, e.message);
  }
}

InsuranceFinancingRouter.get(
  "/get-insurance-financing-record-by-lot",
  getInsuranceFinancingRecordsByLot
);
async function getInsuranceFinancingRecordsByLot(ctx) {
  try {
    const { page, limit } = ctx.request.query;
    const response = await insuranceFinancingModule.getInsuranceFinancingRecordsByLot(
      page,
      limit
    );
    return responseObject(ctx, HttpCodes.SUCCESS, response);
  } catch (e) {
    return responseObject(ctx, HttpCodes.GONE_ERROR, e.message);
  }
}

InsuranceFinancingRouter.get("/generate-report", generateReport);
async function generateReport(ctx) {
  try {
    const { month, year } = ctx.request.query;
    const [
      name,
      buffer,
    ] = await insuranceFinancingModule.generateInsuranceFinancingReportByMonthAndYear(
      month,
      year
    );
    ctx.response.attachment(name);
    ctx.body = buffer;
    ctx.status = HttpCodes.SUCCESS;
    return ctx;
  } catch (e) {
    return responseObject(ctx, HttpCodes.GONE_ERROR, e.message);
  }
}

module.exports = mount(
  "/api/insurance-financing",
  InsuranceFinancingRouter.routes()
);
