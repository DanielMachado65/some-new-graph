(async function () {
  "use strict";

  const Router = require("koa-router");
  const systemNotificationController = require("../../controllers/notification/systemNotificationController");
  const ResponseStatusEnum = require("../../../infrastructure/dictionaries/ResponseStatusEnum");
  const {
    responseObject,
  } = require("../../../infrastructure/helpers/routerHelper");
  let systemNotificationRouter = new Router();

  systemNotificationRouter.get("/", async (ctx) => {
    return responseObject(
      ctx,
      ResponseStatusEnum(200),
      await systemNotificationController.getAll()
    );
  });

  systemNotificationRouter.get("/lasts", async (ctx) => {
    return responseObject(
      ctx,
      ResponseStatusEnum(200),
      await systemNotificationController.getLasts()
    );
  });

  systemNotificationRouter.get("/next-lote/:dt", async (ctx) => {
    let dt = ctx.params.dt;
    if (!dt) return responseObject(ctx, ResponseStatusEnum(405), null);
    return responseObject(
      ctx,
      ResponseStatusEnum(200),
      await systemNotificationController.getLot(dt)
    );
  });

  systemNotificationRouter.get("/set-visualized/:id", async (ctx) => {
    let id = ctx.params.id;
    if (!id) return responseObject(ctx, ResponseStatusEnum(405), null);
    return responseObject(
      ctx,
      ResponseStatusEnum(200),
      await systemNotificationController.setVisualized(id)
    );
  });

  module.exports = systemNotificationRouter;
})();
