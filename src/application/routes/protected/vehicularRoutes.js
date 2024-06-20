const Router = require("koa-router");
const ResponseStatusEnum = require("../../../infrastructure/dictionaries/ResponseStatusEnum");
const vehicularController = require("../../controllers/vehicular/vehicle.controller");
const {
  responseObject,
} = require("../../../infrastructure/helpers/routerHelper");
const router = new Router();

router.post("/db", async function (ctx, next) {
  let params = ctx.request.body;
  if (params)
    return responseObject(
      ctx,
      ResponseStatusEnum(200),
      await vehicularController.getVehicleFixedBase(params)
    );
  return responseObject(ctx, ResponseStatusEnum(405), "Invalid params");
});

module.exports = router;
