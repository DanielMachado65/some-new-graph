"use strict";

const Router = require("koa-router");
const feedbackController = require("../../controllers/feedback/feedbackController");
const ResponseStatusEnum = require("../../../infrastructure/dictionaries/ResponseStatusEnum");
const {
  responseObject,
} = require("../../../infrastructure/helpers/routerHelper");
const {
  errorHandler,
} = require("../../../infrastructure/helpers/feedback/feedbackErrorHelper");
const FeedbackRouter = new Router();

FeedbackRouter.post("/create", async function (ctx, _next) {
  const userId = ctx.auth_user_id;
  const data = ctx.request.body;

  const isValidParams =
    userId &&
    data.hasOwnProperty("description") &&
    data.hasOwnProperty("evaluation");
  data.hasOwnProperty("query");

  data.user = userId;

  if (!isValidParams) {
    const response = errorHandler("INVALID_PARAMS", ResponseStatusEnum);
    return responseObject(ctx, response.status, response.msg);
  }

  const { error } = await feedbackController.createFeedback(data);

  const response = error
    ? errorHandler(error, ResponseStatusEnum)
    : { status: ResponseStatusEnum(204), msg: null };

  return responseObject(ctx, response.status, response.msg);
});

FeedbackRouter.get("/report", feedbackController.getFeedbackDataToReport);

module.exports = FeedbackRouter;
