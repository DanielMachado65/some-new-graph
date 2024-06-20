"use strict";

const testimonialModule = require("../../../domain/testimonial/testimonial.module");
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
const TestimonialRoutes = new Router();

const errorHandler = (ctx, error) => {
  const errorResponse = error && error.response;
  const status =
    (errorResponse && errorResponse.status) || HttpCodes.GONE_ERROR;
  const statusText = errorResponse && errorResponse.statusText;
  return responseObject(ctx, status, statusText);
};

TestimonialRoutes.get("/", getAllTestimonials);
async function getAllTestimonials(ctx) {
  try {
    const response = await testimonialModule.getAllTestimonials();
    return responseObject(ctx, HttpCodes.SUCCESS, response);
  } catch (error) {
    errorHandler(ctx, error);
  }
}

TestimonialRoutes.post("/", supperMiddleware, createTestimonial);
async function createTestimonial(ctx) {
  try {
    const { authorName, content, user } = ctx.request.body;
    weakValidator.weakValidationToNVariables(authorName, content);
    const testimonial = { authorName, content, user };
    const response = await testimonialModule.createTestimonial(testimonial);
    return responseObject(ctx, HttpCodes.SUCCESS, response);
  } catch (error) {
    errorHandler(ctx, error);
  }
}

TestimonialRoutes.put("/:testimonialId", supperMiddleware, updateTestimonial);
async function updateTestimonial(ctx) {
  try {
    const { testimonialId } = ctx.params;
    const { authorName, content, user } = ctx.request.body;
    weakValidator.weakValidation(testimonialId);
    weakValidator.hasAtLeastOneDefinedValue(authorName, content, user);
    const testimonial = { authorName, content, user };
    const response = await testimonialModule.updateTestimonial(
      testimonialId,
      testimonial
    );
    return responseObject(ctx, HttpCodes.SUCCESS, response);
  } catch (error) {
    errorHandler(ctx, error);
  }
}

TestimonialRoutes.delete(
  "/:testimonialId",
  supperMiddleware,
  removeTestimonial
);
async function removeTestimonial(ctx) {
  try {
    const { testimonialId } = ctx.params;
    weakValidator.weakValidation(testimonialId);
    const response = await testimonialModule.removeTestimonial(testimonialId);
    return responseObject(ctx, HttpCodes.SUCCESS, response);
  } catch (error) {
    errorHandler(ctx, error);
  }
}

module.exports = mount("/api/testimonial", TestimonialRoutes.routes());
