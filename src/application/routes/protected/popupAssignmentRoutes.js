(async function () {
  "use strict";

  const Router = require("koa-router");
  const popupAssignmentController = require("../../controllers/notification/popupAssignment.controller");
  const ResponseStatusEnum = require("../../../infrastructure/dictionaries/ResponseStatusEnum");
  const {
    responseObject,
  } = require("../../../infrastructure/helpers/routerHelper");
  const _popupAssignmentRouter = new Router();

  _popupAssignmentRouter.get("/:userId", async function (ctx, next) {
    const { userId } = ctx.params;
    const { data } = await popupAssignmentController.getPopupAssing(userId);
    return responseObject(ctx, ResponseStatusEnum(200), data);
  });

  _popupAssignmentRouter.post("/assign", async function (ctx, next) {
    const body = ctx.request.body;
    const { data } = await popupAssignmentController.postPopupAssing(body);
    return responseObject(ctx, ResponseStatusEnum(200), data);
  });

  _popupAssignmentRouter.post("/reject", async function (ctx, next) {
    const body = ctx.request.body;
    const { data } = await popupAssignmentController.postPopupReject(body);
    return responseObject(ctx, ResponseStatusEnum(200), data);
  });

  module.exports = _popupAssignmentRouter;
})();
