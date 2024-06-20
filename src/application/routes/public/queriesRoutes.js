"use strict";

const Router = require("koa-router");

const ResponseStatusEnum = require("../../../infrastructure/dictionaries/ResponseStatusEnum");
const priceTableController = require("../../controllers/billing/priceTableController");
const queriesController = require("../../controllers/query/queriesController");
const queryReportController = require("../../controllers/query/queryReportController");
const {
  basicAuthenticationMiddleware,
} = require("../../middlewares/authMiddleware");
const utils = require("../../../infrastructure/utils/utils");
let queryRouter = new Router();
const {
  responseObject,
} = require("../../../infrastructure/helpers/routerHelper");

const {
  routeTracker,
} = require("../../../infrastructure/services/route_tracker_service/route-tracker.service");
const {
  AUTHENTICATION_ERROR,
} = require("../../../infrastructure/constants/message/system.error.message");

queryRouter.get("/content/:name", async (ctx, next) => {
  let name = ctx.params.name;
  if (!name) responseObject(ctx, ResponseStatusEnum(405), null);
  return responseObject(
    ctx,
    ResponseStatusEnum(200),
    await priceTableController.getDefaultQueries(name)
  );
});

queryRouter.get(
  "/json-response/:id",
  basicAuthenticationMiddleware,
  async function (ctx, next) {
    let _queryId = ctx.params.id;
    if (_queryId) {
      return responseObject(
        ctx,
        ResponseStatusEnum(200),
        await queriesController.getJsonResultById(_queryId)
      );
    }
    return responseObject(ctx, ResponseStatusEnum(410), "Invalid params");
  }
);

queryRouter.get(
  "/historic-by-user/:id",
  basicAuthenticationMiddleware,
  routeTracker.trackRoute(
    "Acesso ao histórico de consultas",
    "Usuário acessou o histórico de consultas"
  ),
  async function (ctx, next) {
    let _userId = ctx.params.id;
    let _date = ctx.query.p;
    if (_userId) {
      if (_userId !== ctx.auth_user_id)
        return responseObject(
          ctx,
          ResponseStatusEnum(401),
          AUTHENTICATION_ERROR
        );
      let response = await queriesController.getHistoryQueriesByUser(
        _userId,
        _date
      );
      return responseObject(ctx, response.cod, response.msg);
    }
    return responseObject(ctx, ResponseStatusEnum(410), "Invalid params");
  }
);

queryRouter.get(
  "/consumption-month/:id",
  basicAuthenticationMiddleware,
  routeTracker.trackRoute(
    "Acesso ao histórico de consultas",
    "Usuário acessou o histórico de consultas"
  ),
  async function (ctx, next) {
    const _userId = ctx.params.id;
    const _month = ctx.query.month;
    const _year = ctx.query.year;
    if (_userId && _month && _year) {
      if (_userId !== ctx.auth_user_id)
        return responseObject(
          ctx,
          ResponseStatusEnum(401),
          AUTHENTICATION_ERROR
        );
      const response = await queriesController.getHistoryQueriesByMonth(
        _userId,
        _month,
        _year
      );

      return responseObject(ctx, response.cod, response.msg);
    }
    return responseObject(ctx, ResponseStatusEnum(410), "Invalid params");
  }
);

queryRouter.get(
  "/consumption-seach/:id",
  basicAuthenticationMiddleware,
  async function (ctx) {
    const _userId = ctx.params.id;
    const search = ctx.query.search;

    if (search) {
      if (_userId !== ctx.auth_user_id)
        return responseObject(
          ctx,
          ResponseStatusEnum(401),
          AUTHENTICATION_ERROR
        );

      const response = await queriesController.getHistoryQueriesBySeach(
        _userId,
        search
      );

      return responseObject(ctx, ResponseStatusEnum(200), response);
    }
    return responseObject(ctx, ResponseStatusEnum(410), "Invalid params");
  }
);

queryRouter.get(
  "/consumption-pagination/:id",
  basicAuthenticationMiddleware,
  async function (ctx) {
    const _userId = ctx.params.id;
    const _page = ctx.query.page;
    const _limit = ctx.query.limit;

    if (_userId && _page && _limit) {
      if (_userId !== ctx.auth_user_id)
        return responseObject(
          ctx,
          ResponseStatusEnum(401),
          AUTHENTICATION_ERROR
        );
      const response = await queriesController.getHistoryQueriesByPages(
        _userId,
        _page,
        _limit
      );

      return responseObject(ctx, ResponseStatusEnum(200), response);
    }
    return responseObject(ctx, ResponseStatusEnum(410), "Invalid params");
  }
);

queryRouter.get("/v2/:id", queriesController.getRelevantDataQueryToClientV2);

queryRouter.get("/:id", async function (ctx, next) {
  let queryid = ctx.params.id;
  if (queryid) {
    return responseObject(
      ctx,
      ResponseStatusEnum(200),
      await queriesController.getRelevantDataQueryToClient(queryid)
    );
  }
  return responseObject(ctx, ResponseStatusEnum(405), "Invalid params");
});

queryRouter.get("/by-id/:id", async function (ctx, next) {
  const queryid = ctx.params.id;

  if (queryid) {
    return responseObject(
      ctx,
      ResponseStatusEnum(200),
      await queriesController.getByIdWithReprocess(queryid)
    );
  }

  return responseObject(ctx, ResponseStatusEnum(405), "Invalid params");
});

queryRouter.get(
  "/statement-childrens/:uid",
  basicAuthenticationMiddleware,
  async function (ctx, next) {
    const userid = ctx.params.uid;
    const month = ctx.request.query.month;
    const year = ctx.request.query.year;
    if (userid) {
      return responseObject(
        ctx,
        ResponseStatusEnum(200),
        await queriesController.getChildrensStatement(userid, month, year)
      );
    }
    return responseObject(ctx, ResponseStatusEnum(405), "Invalid params");
  }
);

queryRouter.get("/statement-childrens/report/:uid", async function (ctx, next) {
  let userid = ctx.params.uid;
  let month = ctx.request.query.month;
  let year = ctx.request.query.year;
  if (userid) {
    let response = await queriesController.getChildrensStatement(
      userid,
      month,
      year,
      true
    );
    if (response.error)
      return responseObject(
        ctx,
        ResponseStatusEnum(response.code),
        response.msg
      );
    else {
      ctx.response.attachment(`historico_de_consultas_${response.month}.xlsx`);
      return (ctx.body = response.file);
    }
  }
  return responseObject(ctx, ResponseStatusEnum(405), "Invalid params");
});

queryRouter.post(
  "/update-leilao-node",
  utils.staticHeaderValidation,
  async function (ctx, next) {
    let params = ctx.request.body;
    if (params.key && params.date) {
      return responseObject(
        ctx,
        ResponseStatusEnum(200),
        await queriesController.updateLeilaoRecords(params.key, params.date)
      );
    }
    return responseObject(ctx, ResponseStatusEnum(405), "Invalid params");
  }
);

queryRouter.get("/report/user/:id", async function (ctx) {
  const { id } = ctx.params;
  const { month, year, force } = ctx.query;
  if (!id)
    return responseObject(ctx, ResponseStatusEnum(405), "Invalid params");
  const [key, buffer] = await queryReportController.getQueriesReportByUser(
    id,
    parseInt(month),
    parseInt(year),
    !!force
  );
  ctx.response.attachment(key);
  return (ctx.body = buffer);
});

module.exports = queryRouter;
