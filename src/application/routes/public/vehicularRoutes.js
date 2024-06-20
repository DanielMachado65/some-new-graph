"use strict";

const Router = require("koa-router");
const ResponseStatusEnum = require("../../../infrastructure/dictionaries/ResponseStatusEnum");
const queryContextController = require("../../controllers/context/queryContextController");
const userController = require("../../controllers/user/userController");
const vehicularRouter = new Router();
const vehicularController = require("../../controllers/vehicular/vehicle.controller");
const queryController = require("../../controllers/query/queriesController");

const {
  basicAuthenticationMiddleware,
} = require("../../middlewares/authMiddleware");

const {
  responseObject,
} = require("../../../infrastructure/helpers/routerHelper");

const USER_ERRORS = require("../../../infrastructure/constants/message/user/user.error.message");
const {
  validateInputGetVehicleVersionsByPlate,
} = require("../../controllers/vehicular/vehicle.validator");
const {
  validateRecaptchaTokenOnGet,
} = require("../../middlewares/recaptcha-validation-token.middleware");
const { rateLimiter } = require("../../middlewares/rate-limit.middleware");

vehicularRouter.get("/get-brands", async (ctx) => {
  return responseObject(ctx, 200, await vehicularController.getVehicleBrands());
});

vehicularRouter.get("/get-models-by-brand", async (ctx) => {
  return responseObject(
    ctx,
    200,
    await vehicularController.getVehicleModelsByBrand(ctx.request.query.brand)
  );
});

vehicularRouter.post(
  "/re-execute/:queryid",
  basicAuthenticationMiddleware,
  async function (ctx, next) {
    let _format = ctx.request.query.format;
    let _queryId = ctx.params.userid;
    let _params = ctx.request.body;
    let _queryCode = _params ? _params.querycode : null;
    let _keys = _params ? _params.keys : null;
    let _duplicityChecker = _params ? _params.duplicity : null;
    if (_queryId && _queryCode && _keys) {
      // if(_userid != ctx.auth_user_id) return responseObject(ctx,ResponseStatusEnum(401));
      if (await userController.hasClientPermission(_queryId, ctx)) {
        let response = await queryContextController.executeQueryContext(
          _queryId,
          _queryCode,
          _keys,
          _duplicityChecker
        );
        return responseObject(
          ctx,
          ResponseStatusEnum(response.cod),
          response.data,
          _format
        );
      }
      return responseObject(
        ctx,
        ResponseStatusEnum(401),
        USER_ERRORS.IP_PERMISSION_DENIED,
        _format
      );
    }
    return responseObject(
      ctx,
      ResponseStatusEnum(405),
      "Invalid params",
      _format
    );
  }
);

vehicularRouter.post(
  "/v2",
  basicAuthenticationMiddleware,
  queryContextController.executeQueryContextV2
);

vehicularRouter.post(
  "/agregate",
  basicAuthenticationMiddleware,
  async function (ctx, next) {
    const { keys } = ctx.request.body;

    if (keys) {
      return responseObject(
        ctx,
        ResponseStatusEnum(200),
        await vehicularController.getVehicleAggregate(keys)
      );
    }
    return responseObject(ctx, ResponseStatusEnum(400), null);
  }
);

vehicularRouter.post("/:userid", basicAuthenticationMiddleware, async function (
  ctx,
  next
) {
  const initTime = Date.now();
  let _format = ctx.request.query.format;
  let _userid = ctx.auth_user_id;
  let _params = ctx.request.body;
  let _queryCode = _params ? _params.querycode : null;
  let _keys = _params ? _params.keys : null;
  let _duplicityChecker = _params ? _params.duplicity : null;
  if (_userid && _queryCode && _keys) {
    // if(_userid != ctx.auth_user_id) return responseObject(ctx,ResponseStatusEnum(401));
    if (await userController.hasClientPermission(_userid, ctx)) {
      let response = await queryContextController.executeQueryContext(
        _userid,
        _queryCode,
        _keys,
        _duplicityChecker
      );
      await queryController.updateExecutionTime(
        response.data.headerInfos.queryid,
        Date.now() - initTime
      );
      return responseObject(
        ctx,
        ResponseStatusEnum(response.cod),
        response.data,
        _format
      );
    }
    return responseObject(
      ctx,
      ResponseStatusEnum(401),
      USER_ERRORS.IP_PERMISSION_DENIED,
      _format
    );
  }
  return responseObject(
    ctx,
    ResponseStatusEnum(405),
    "Invalid params",
    _format
  );
});

vehicularRouter.get("/:userid", basicAuthenticationMiddleware, async function (
  ctx,
  nxt
) {
  let key = ctx.request.query.key;
  let userid = ctx.params.userid;
  if (key && userid) {
    key = key.toUpperCase();
    return responseObject(
      ctx,
      ResponseStatusEnum(200),
      await vehicularController.getVehicleLocalBase(key, userid)
    );
  }
  return responseObject(ctx, ResponseStatusEnum(405), null);
});

vehicularRouter.get(
  "/vehicle-versions/:gToken/:plate",
  // rateLimiter(5, 20),
  validateRecaptchaTokenOnGet,
  validateInputGetVehicleVersionsByPlate,
  vehicularController.getVehicleVersionsByPlate
);

module.exports = vehicularRouter;
