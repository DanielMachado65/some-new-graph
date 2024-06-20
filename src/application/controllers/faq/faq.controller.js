"use strict";

const faqModule = require("../../../domain/faq/faq.module");
const HttpCodes = require("../../../infrastructure/enumerators/httpCode.enum");

const {
  responseObject,
} = require("../../../infrastructure/helpers/routerHelper");
const {
  supperMiddleware,
} = require("../../middlewares/authSupperUserMiddleware");
const weakValidator = require("../../../infrastructure/utils/weakValidator.util");

const mount = require("koa-mount");
const Router = require("koa-router");
const FaqRoutes = new Router();

const errorHandler = (ctx, error) => {
  const errorResponse = error && error.response;
  const status =
    (errorResponse && errorResponse.status) || HttpCodes.GONE_ERROR;
  const statusText = errorResponse && errorResponse.statusText;
  return responseObject(ctx, status, statusText);
};

FaqRoutes.get("/", getAllQuestions);
async function getAllQuestions(ctx) {
  try {
    const response = await faqModule.getAllQuestions();
    return responseObject(ctx, HttpCodes.SUCCESS, response);
  } catch (error) {
    errorHandler(ctx, error);
  }
}

FaqRoutes.post("/", supperMiddleware, createQuestion);
async function createQuestion(ctx) {
  try {
    const { title, answer, type } = ctx.request.body;
    weakValidator.weakValidationToNVariables(title, answer);
    const question = { title, answer, type };
    const response = await faqModule.createQuestion(question);
    return responseObject(ctx, HttpCodes.SUCCESS, response);
  } catch (error) {
    errorHandler(ctx, error);
  }
}

FaqRoutes.put("/:faqId", supperMiddleware, updateQuestion);
async function updateQuestion(ctx) {
  try {
    const { faqId } = ctx.params;
    const { title, answer, type } = ctx.request.body;
    weakValidator.weakValidation(faqId);
    weakValidator.hasAtLeastOneDefinedValue(title, answer, type);
    const question = { title, answer, type };
    const response = await faqModule.updateQuestion(faqId, question);
    return responseObject(ctx, HttpCodes.SUCCESS, response);
  } catch (error) {
    errorHandler(ctx, error);
  }
}

FaqRoutes.delete("/:faqId", supperMiddleware, removeQuestion);
async function removeQuestion(ctx) {
  try {
    const { faqId } = ctx.params;
    weakValidator.weakValidation(faqId);
    const response = await faqModule.removeQuestion(faqId);
    return responseObject(ctx, HttpCodes.SUCCESS, response);
  } catch (error) {
    errorHandler(ctx, error);
  }
}

module.exports = mount("/api/faq", FaqRoutes.routes());
