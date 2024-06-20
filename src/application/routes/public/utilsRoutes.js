"use strict";
let Router = require("koa-router");
const ResponseStatusEnum = require("../../../infrastructure/dictionaries/ResponseStatusEnum");
let utilController = require("../../controllers/util/utilController");
const {
  responseObject,
} = require("../../../infrastructure/helpers/routerHelper");

let utilsRouter = new Router();

utilsRouter.get("/address-data-by-zip-code/:zipcode", async (ctx) => {
  let zipcode = ctx.params.zipcode;
  if (!zipcode) return responseObject(ctx, ResponseStatusEnum(405), null);
  let response = await utilController.getDataAddressByZipcode(zipcode);
  return responseObject(ctx, ResponseStatusEnum(response.cod), response.data);
});

utilsRouter.get("/emojis", async (ctx) => {
  return responseObject(
    ctx,
    ResponseStatusEnum(200),
    utilController.getEmojis()
  );
});

module.exports = utilsRouter;
