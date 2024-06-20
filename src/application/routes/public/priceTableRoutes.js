"use strict";

const Router = require("koa-router");

const priceTableController = require("../../controllers/billing/priceTableController");
const ResponseStatusEnum = require("../../../infrastructure/dictionaries/ResponseStatusEnum");
const {
  responseObject,
} = require("../../../infrastructure/helpers/routerHelper");
const {
  basicAuthenticationMiddleware,
} = require("../../middlewares/authMiddleware");
let priceTableRouter = new Router();

priceTableRouter.get("/product/query-comparison", async (ctx) => {
  const queryProducts = await priceTableController.getQueryProductsComparison();
  return responseObject(ctx, ResponseStatusEnum(200), queryProducts);
});

priceTableRouter.get("/product/query", async (ctx) => {
  const queryProducts = await priceTableController.getQueryProducts(
    ctx.request.query
  );
  return responseObject(ctx, ResponseStatusEnum(200), queryProducts);
});

priceTableRouter.get("/product/signature", async (ctx) => {
  const signatureProducts = await priceTableController.getSignatureProducts();
  return responseObject(ctx, ResponseStatusEnum(200), signatureProducts);
});

priceTableRouter.get("/:id", basicAuthenticationMiddleware, async (ctx) => {
  let id = ctx.params.id;
  if (id)
    return responseObject(
      ctx,
      ResponseStatusEnum(200),
      await priceTableController.getById(id)
    );
  return responseObject(ctx, ResponseStatusEnum(405), null);
});

priceTableRouter.get(
  "/by-plan/:id",
  basicAuthenticationMiddleware,
  async (ctx) => {
    let id = ctx.params.id;
    if (id)
      return responseObject(
        ctx,
        ResponseStatusEnum(200),
        await priceTableController.getByPlanId(id)
      );
    return responseObject(ctx, ResponseStatusEnum(405), null);
  }
);

priceTableRouter.get(
  "/synthetic/:userid",
  basicAuthenticationMiddleware,
  async (ctx) => {
    let userid = ctx.params.userid;
    if (userid)
      return responseObject(
        ctx,
        ResponseStatusEnum(200),
        await priceTableController.getSummarizedPriceTable(userid)
      );
    return responseObject(ctx, ResponseStatusEnum(405), null);
  }
);

priceTableRouter.get(
  "/user/:userid",
  basicAuthenticationMiddleware,
  async (ctx) => {
    let userid = ctx.params.userid;
    if (userid)
      return responseObject(
        ctx,
        ResponseStatusEnum(200),
        await priceTableController.getByUser(userid)
      );
    return responseObject(ctx, ResponseStatusEnum(405), null);
  }
);

priceTableRouter.post("/new", basicAuthenticationMiddleware, async function (
  ctx,
  next
) {
  let params = ctx.request.body;
  let userid = ctx.auth_user_id;
  if (params) {
    let response = await priceTableController.createNew(params, userid);
    return responseObject(ctx, ResponseStatusEnum(response.cod), response.data);
  }
  return responseObject(ctx, ResponseStatusEnum(405), null);
});

priceTableRouter.post(
  "/add-query/:id",
  basicAuthenticationMiddleware,
  async function (ctx, next) {
    let id = ctx.params.id;
    let query = ctx.request.body;

    if (id && query) {
      let response = await priceTableController.addQueryToTemplate(id, query);
      return responseObject(
        ctx,
        ResponseStatusEnum(response.cod),
        response.data
      );
    }
    return responseObject(ctx, ResponseStatusEnum(405), null);
  }
);

module.exports = priceTableRouter;
