"use strict";

const Router = require("koa-router");
const billingController = require("../../controllers/billing/billingController");
const consumptionController = require("../../controllers/billing/consumptionController");
const ResponseStatusEnum = require("../../../infrastructure/dictionaries/ResponseStatusEnum");
const {
  responseObject,
} = require("../../../infrastructure/helpers/routerHelper");

const {
  routeTracker,
} = require("../../../infrastructure/services/route_tracker_service/route-tracker.service");

const billingRouter = new Router();

billingRouter.get("/summery-post-paid-consumption", async function (ctx, next) {
  return responseObject(
    ctx,
    ResponseStatusEnum(200),
    await billingController.clientsPostPaidSummeryConsumption()
  );
});

billingRouter.get("/total-by-price-table/:pt", async function (ctx, next) {
  const priceTable = ctx.params.pt;
  if (priceTable)
    return responseObject(
      ctx,
      ResponseStatusEnum(200),
      await billingController.getTotalByPriceTable(priceTable)
    );
  return responseObject(ctx, ResponseStatusEnum(405), null);
});

billingRouter.get("/complete-extract/:userid", async function (ctx, next) {
  const user = ctx.params.userid;
  if (user)
    return responseObject(
      ctx,
      ResponseStatusEnum(200),
      await billingController.completeExtractConsumption(user)
    );
  return responseObject(ctx, ResponseStatusEnum(405), null);
});

billingRouter.get("/complete-comsumption/:userid", async function (ctx, next) {
  const user = ctx.params.userid;
  const dt = ctx.query.dt;
  if (user)
    return responseObject(
      ctx,
      ResponseStatusEnum(200),
      await consumptionController.getTotalConsumption(user, dt)
    );
  return responseObject(ctx, ResponseStatusEnum(405), null);
});

billingRouter.get("/:id", async function (ctx, next) {
  const id = ctx.params.id;
  if (id)
    return responseObject(
      ctx,
      ResponseStatusEnum(200),
      await billingController.getById(id)
    );
  return responseObject(ctx, ResponseStatusEnum(405), null);
});

billingRouter.get("/change-user-price-table/:userid", async function (
  ctx,
  next
) {
  const user = ctx.params.userid;
  const priceTable = ctx.query.p;
  if (user && priceTable)
    return responseObject(
      ctx,
      ResponseStatusEnum(200),
      await billingController.changeUserPriceTable(user, priceTable)
    );
  return responseObject(ctx, ResponseStatusEnum(405), null);
});

billingRouter.post(
  "/add-credits/:userid",
  routeTracker.trackRoute(
    "Adição de crédito",
    "Nova adição de crédito na conta do usuário"
  ),
  async function (ctx, next) {
    const user = ctx.params.userid;
    const params = ctx.request.body;
    const credits = params.credits;
    const logged_user = ctx.auth_user_id;
    if (user && credits)
      return responseObject(
        ctx,
        ResponseStatusEnum(200),
        await billingController.addCreditsByUser(user, credits, logged_user)
      );
    return responseObject(ctx, ResponseStatusEnum(405), null);
  }
);

billingRouter.get("/user-credits/:userid", async function (ctx, next) {
  const user = ctx.params.userid;
  if (user) {
    let response = await billingController.getCreditsByUser(user);
    return responseObject(ctx, ResponseStatusEnum(response.cod), response.data);
  }
  return responseObject(ctx, ResponseStatusEnum(405), null);
});

module.exports = billingRouter;
