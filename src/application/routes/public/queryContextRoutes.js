"use strict";

const Router = require("koa-router");
const ResponseStatusEnum = require("../../../infrastructure/dictionaries/ResponseStatusEnum");
const queryContextController = require("../../controllers/context/queryContextController");
const userController = require("../../controllers/user/userController");
const queryContextRouter = new Router();
const {
  responseObject,
} = require("../../../infrastructure/helpers/routerHelper");

queryContextRouter.post("/re-execute/:queryid", async function (ctx, next) {
  let _queryId = ctx.params.queryid;
  if (_queryId) {
    let response = await queryContextController.reExecuteQueryContext(_queryId);
    return responseObject(ctx, ResponseStatusEnum(response.cod), response.data);
  }
  return responseObject(ctx, ResponseStatusEnum(405), "Invalid params");
});

queryContextRouter.post("/:userid", async function (ctx, next) {
  let _format = ctx.request.query.format;
  let _userid = ctx.params.userid;
  let _params = ctx.request.body;
  let _queryCode = _params ? _params.querycode : null;
  let _keys = _params ? _params.keys : null;
  let _duplicityChecker = _params ? _params.duplicity : null;
  if (_userid && _queryCode && _keys) {
    if (await userController.hasClientPermission(_userid, ctx)) {
      let response = await queryContextController.executeQueryContext(
        _userid,
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
      "Ops...O IP o qual você esta utilizando para realizar a consulta, não é um IP habilitado pelo(a) gerente desta conta. Contate-nos para mais informações..."
    );
  }
  return responseObject(ctx, ResponseStatusEnum(405), "Invalid params");
});

module.exports = queryContextRouter;
