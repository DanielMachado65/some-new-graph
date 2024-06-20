"use strict";

const companyModule = require("../../../domain/company/company.module");
const HttpCodes = require("../../../infrastructure/enumerators/httpCode.enum");
const weakValidator = require("../../../infrastructure/utils/weakValidator.util");

const {
  responseObject,
} = require("../../../infrastructure/helpers/routerHelper");

const mount = require("koa-mount");
const Router = require("koa-router");
const CompanyRoutes = new Router();

const errorHandler = (ctx, error) => {
  const errorResponse = error && error.response;
  const status =
    (errorResponse && errorResponse.status) || HttpCodes.GONE_ERROR;
  const statusText = errorResponse && errorResponse.statusText;
  return responseObject(ctx, status, statusText);
};

CompanyRoutes.get("/available-infos", getAvailableInfos);
async function getAvailableInfos(ctx) {
  try {
    const response = await companyModule.getAvailableInfos();
    return responseObject(ctx, HttpCodes.SUCCESS, response);
  } catch (error) {
    errorHandler(ctx, error);
  }
}

CompanyRoutes.get("/available-info-comparison", getAvailableInfosComparison);
async function getAvailableInfosComparison(ctx) {
  try {
    const response = await companyModule.getAvailableInfosComparison();
    return responseObject(ctx, HttpCodes.SUCCESS, response);
  } catch (error) {
    errorHandler(ctx, error);
  }
}

CompanyRoutes.get("/testimonials", getTestimonials);
async function getTestimonials(ctx) {
  try {
    const response = await companyModule.getTestimonials();
    return responseObject(ctx, HttpCodes.SUCCESS, response);
  } catch (error) {
    errorHandler(ctx, error);
  }
}

CompanyRoutes.get("/faq", getFrequentlyAskedQuestions);
async function getFrequentlyAskedQuestions(ctx) {
  try {
    const response = await companyModule.getFrequentlyAskedQuestions();
    return responseObject(ctx, HttpCodes.SUCCESS, response);
  } catch (error) {
    errorHandler(ctx, error);
  }
}

CompanyRoutes.get("/in-media", getCompanyMedias);
async function getCompanyMedias(ctx) {
  try {
    const response = await companyModule.getCompanyMedias();
    return responseObject(ctx, HttpCodes.SUCCESS, response);
  } catch (error) {
    errorHandler(ctx, error);
  }
}

CompanyRoutes.put("/faq", updateFrequentlyAskedQuestions);
async function updateFrequentlyAskedQuestions(ctx) {
  try {
    const faq = ctx.request.body && ctx.request.body.faq;
    weakValidator.weakValidationIfVariableIsNotArray(faq);
    const response = await companyModule.updateFrequentlyAskedQuestions(faq);
    return responseObject(ctx, HttpCodes.SUCCESS, response);
  } catch (error) {
    errorHandler(ctx, error);
  }
}

CompanyRoutes.put("/in-media", updateCompanyMedias);
async function updateCompanyMedias(ctx) {
  try {
    const medias = ctx.request.body && ctx.request.body.medias;
    weakValidator.weakValidationIfVariableIsNotArray(medias);
    const response = await companyModule.updateCompanyMedias(medias);
    return responseObject(ctx, HttpCodes.SUCCESS, response);
  } catch (error) {
    errorHandler(ctx, error);
  }
}

module.exports = mount("/api/company", CompanyRoutes.routes());
