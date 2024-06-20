(async function () {
  "use strict";

  const Router = require("koa-router");
  const serviceLogController = require("../../controllers/log/serviceLogController");
  const ResponseStatusEnum = require("../../../infrastructure/dictionaries/ResponseStatusEnum");
  const {
    responseObject,
  } = require("../../../infrastructure/helpers/routerHelper");
  const {
    errorHandler,
  } = require("../../../infrastructure/helpers/serviceLog/serviceLogErrorHelper");

  const serviceLogRouter = new Router();

  serviceLogRouter.get("/", async (ctx) => {
    let date = ctx.query.dt;
    let amount = ctx.query.q;
    return responseObject(
      ctx,
      ResponseStatusEnum(200),
      await serviceLogController.getLot(date, amount)
    );
  });

  serviceLogRouter.get("/desc", async (ctx) => {
    let date = ctx.query.dt;
    let amount = ctx.query.q;
    return responseObject(
      ctx,
      ResponseStatusEnum(200),
      await serviceLogController.getLotDesc(date, amount)
    );
  });

  serviceLogRouter.get("/summary", async (ctx) => {
    return responseObject(
      ctx,
      ResponseStatusEnum(200),
      await serviceLogController.getSummaryLastWeek()
    );
  });

  serviceLogRouter.get("/by-month-and-year", async (ctx) => {
    const referenceMonth = ctx.request.query.month;
    const referenceYear = ctx.request.query.year;
    const isValidParams = referenceMonth && referenceYear;
    if (!isValidParams) {
      const response = errorHandler("INVALID_PARAMS");
      return responseObject(ctx, response.status, response.msg);
    }
    const { result, error } = await serviceLogController.getByMonthAndYear(
      referenceMonth,
      referenceYear
    );
    const response = error
      ? errorHandler(error)
      : { status: ResponseStatusEnum(200), msg: result };
    return responseObject(ctx, response.status, response.msg);
  });

  serviceLogRouter.get("/v2/by-month-and-year", async (ctx) => {
    const referenceMonth = ctx.request.query.month;
    const referenceYear = ctx.request.query.year;

    if (!referenceMonth || !referenceYear) {
      const response = errorHandler("INVALID_PARAMS");
      return responseObject(ctx, response.status, response.msg);
    }

    return responseObject(
      ctx,
      ResponseStatusEnum(200),
      await serviceLogController.getTotalUsedServices(
        referenceMonth,
        referenceYear
      )
    );
  });

  serviceLogRouter.get("/service-name/:id", async (ctx) => {
    let id = ctx.params.id;
    if (!id) return responseObject(ctx, ResponseStatusEnum(405), null);
    return responseObject(
      ctx,
      ResponseStatusEnum(200),
      await serviceLogController.getServiceName(id)
    );
  });

  serviceLogRouter.get("/by-range-date", async (ctx) => {
    let initDate = ctx.query.idt;
    let endDate = ctx.query.edt;
    if (!initDate || !endDate)
      return responseObject(ctx, ResponseStatusEnum(405), null);
    return responseObject(
      ctx,
      ResponseStatusEnum(200),
      await serviceLogController.getLotByRangeDate(initDate, endDate)
    );
  });

  module.exports = serviceLogRouter;
})();
