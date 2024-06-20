"use strict";

const Router = require("koa-router");

const serviceController = require("../../controllers/query/serviceController");
const ResponseStatusEnum = require("../../../infrastructure/dictionaries/ResponseStatusEnum");
const {
  responseObject,
} = require("../../../infrastructure/helpers/routerHelper");
let serviceRouter = new Router();

const {
  supperIdentificationMiddleware,
} = require("../../../application/middlewares/authSupperUserMiddleware");

serviceRouter.get("/new/:code", async function (ctx, next) {
  let code = ctx.params.code;
  if (code)
    return responseObject(
      ctx,
      ResponseStatusEnum(200),
      await serviceController.createNewService(code, 0)
    );
  return responseObject(ctx, ResponseStatusEnum(405), null);
});

serviceRouter.post("/", supperIdentificationMiddleware, async function (ctx) {
  const { queryid, serviceLog, serviceCode, newServiceCode } = ctx.request.body;

  if (queryid && (serviceCode || serviceLog)) {
    const response = await serviceController.executeServiceQuery(
      queryid,
      serviceLog,
      newServiceCode,
      serviceCode,
      Boolean(ctx.auth_supper_user_id)
    );
    return responseObject(ctx, ResponseStatusEnum(response.cod), response.data);
  }
  return responseObject(ctx, ResponseStatusEnum(405), null);
});

module.exports = serviceRouter;
