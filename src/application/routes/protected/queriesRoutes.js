(async function () {
  "use strict";

  const Router = require("koa-router");
  const queriesController = require("../../controllers/query/queriesController");
  const testDriveController = require("../../controllers/test_drive/testDriveController");
  const ResponseStatusEnum = require("../../../infrastructure/dictionaries/ResponseStatusEnum");
  const {
    responseObject,
  } = require("../../../infrastructure/helpers/routerHelper");
  let _queryRouter = new Router();

  _queryRouter.get("/total-by-day", async function (ctx) {
    return responseObject(
      ctx,
      ResponseStatusEnum(200),
      await queriesController.getByDay()
    );
  });

  _queryRouter.get("/all", async function (ctx) {
    let userid = ctx.query.id;
    let initDate = ctx.query.idt;
    let endDate = ctx.query.edt;
    let email = ctx.query.em;
    let queryDocument = ctx.query.qd;
    let ptid = ctx.query.ptid;
    let queryId = ctx.query.qId;
    let code = ctx.query.cd;
    return responseObject(
      ctx,
      ResponseStatusEnum(200),
      await queriesController.getAll(
        userid,
        initDate,
        endDate,
        queryDocument,
        email,
        ptid,
        queryId,
        code
      )
    );
  });

  /**
   * Fetch many test-drive queries based on the filters
   * Note: Implementation based on /protected/query/all
   */
  _queryRouter.post("/test-drive", async function (ctx) {
    const data = ctx.request.body;
    if (!data || typeof data !== 'object') return responseObject(ctx, ResponseStatusEnum(400), [])

    const userId = data.userId;
    const initDate = data.initDate;
    const endDate = data.endDate;
    const email = data.email;
    const queryDocument = data.queryDocument;
    const queryId = data.queryId;
    return responseObject(
      ctx,
      ResponseStatusEnum(200),
      await testDriveController.getAll({
        userId,
        initDate,
        endDate,
        queryDocument,
        email,
        queryId,
      })
    );
  });

  _queryRouter.get("/v2/all", async function (ctx, _next) {
    const userId = ctx.query.id;
    const initDate = ctx.query.idt;
    const endDate = ctx.query.edt;
    return responseObject(
      ctx,
      ResponseStatusEnum(200),
      await queriesController.getAllV2({ userId, initDate, endDate })
    );
  });

  _queryRouter.get("/extract/:code", async function (ctx) {
    let serviceCode = ctx.params.code;
    let month = ctx.query.month;
    let year = ctx.query.year;
    if (!serviceCode || !month || !year)
      return responseObject(ctx, ResponseStatusEnum(405), null);
    return responseObject(
      ctx,
      ResponseStatusEnum(200),
      await queriesController.getExtractyByService(serviceCode, month, year)
    );
  });

  _queryRouter.post("/extract", async function (ctx) {
    let data = ctx.request.body;

    let servicesCode = data.servicesCode;
    let month = data.month;
    let year = data.year;

    if (
      !month ||
      !servicesCode ||
      !year ||
      !Array.isArray(servicesCode) ||
      (Array.isArray(servicesCode) && !servicesCode.length)
    )
      return responseObject(ctx, ResponseStatusEnum(405), null);
    return responseObject(
      ctx,
      ResponseStatusEnum(200),
      await queriesController.getExtractyByServices(servicesCode, month, year)
    );
  });

  _queryRouter.get("/summary-by-status/:userid", async function (ctx) {
    let userid = ctx.params.userid;
    if (!userid) return responseObject(ctx, ResponseStatusEnum(405), null);
    return responseObject(
      ctx,
      ResponseStatusEnum(200),
      await queriesController.getSummeryQueryByStatus(userid)
    );
  });

  _queryRouter.get("/childrens-summary-by-status/:userid", async function (
    ctx
  ) {
    let userid = ctx.params.userid;
    if (!userid) return responseObject(ctx, ResponseStatusEnum(405), null);
    return responseObject(
      ctx,
      ResponseStatusEnum(200),
      await queriesController.getSummeryChildrensQueryByStatus(userid)
    );
  });

  _queryRouter.patch("/update-response-json/:queryid", async function (ctx) {
    let queryid = ctx.params.queryid;
    let newResponseJson = ctx.request.body.responseJSON;
    if (!queryid || !newResponseJson)
      return responseObject(ctx, ResponseStatusEnum(405), null);
    return responseObject(
      ctx,
      ResponseStatusEnum(200),
      await queriesController.updateQueryResponse(queryid, newResponseJson)
    );
  });

  _queryRouter.get("/get-announcements-from-history/:queryId", async (ctx) => {
    const { queryId } = ctx.params;
    if (!queryId) return responseObject(ctx, ResponseStatusEnum(405), null);
    return responseObject(
      ctx,
      ResponseStatusEnum(200),
      await queriesController.getAnnouncementsFromHistory(queryId)
    );
  });

  _queryRouter.patch("/delete-announcement/:queryId", async (ctx) => {
    const { queryId } = ctx.params;
    await queriesController.deleteAnnouncement(queryId);
    return responseObject(ctx, ResponseStatusEnum(200), "");
  });

  _queryRouter.patch(
    "/delete-announcements-from-history/:queryId",
    async (ctx) => {
      const { queryId } = ctx.params;
      const { announcementsToRemove } = ctx.request.body;
      if (!queryId && !Array.isArray(announcementsToRemove))
        return responseObject(ctx, ResponseStatusEnum(405), null);
      const announcements = await queriesController.deleteAnnouncementsFromHistory(
        queryId,
        announcementsToRemove
      );
      return responseObject(ctx, ResponseStatusEnum(200), announcements);
    }
  );

  _queryRouter.post("/update-status-query/:id", async (ctx) => {
    const { id } = ctx.params;
    const { status } = ctx.request.body;
    if (id && typeof status === "boolean") {
      queriesController.updateStatusQuery(id, status).finally();
      return responseObject(ctx, ResponseStatusEnum(200), null);
    }
    return responseObject(ctx, ResponseStatusEnum(405), null);
  });

  module.exports = _queryRouter;
})();
