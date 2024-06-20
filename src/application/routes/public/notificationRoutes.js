"use strict";

const Router = require("koa-router");
const notificationController = require("../../controllers/notification/notificationController");
const ResponseStatusEnum = require("../../../infrastructure/dictionaries/ResponseStatusEnum");
const {
  responseObject,
} = require("../../../infrastructure/helpers/routerHelper");
const notificationRouter = new Router();

notificationRouter.post("/callback/payment", async function (ctx, next) {
  let params = ctx.request.body;
  if (params)
    return responseObject(
      ctx,
      ResponseStatusEnum(200),
      await notificationController.receiveData(params)
    );
  return responseObject(ctx, ResponseStatusEnum(405), null);
});

notificationRouter.post("/callback/iugu", async function (ctx) {
  let params = ctx.request.body;
  if (params) {
    let response = await notificationController.receiveIuguData(params);
    if (response && response.error) {
      return responseObject(ctx, ResponseStatusEnum(500), response);
    }
    return responseObject(ctx, ResponseStatusEnum(200), response);
  }
  return responseObject(ctx, ResponseStatusEnum(405), null);
});

module.exports = notificationRouter;
