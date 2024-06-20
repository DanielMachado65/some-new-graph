(async function () {
    'use strict';

    const Router = require('koa-router');
    const commissionController = require('../../controllers/billing/commissionController');
    const ResponseStatusEnum = require('../../../infrastructure/dictionaries/ResponseStatusEnum');
    const {
        responseObject,
    } = require('../../../infrastructure/helpers/routerHelper');
    let balanceRouter = new Router();

    balanceRouter.get('/by-id/:id', async function (ctx, next) {
        let id = ctx.params.id;
        if (!id) return responseObject(ctx, ResponseStatusEnum(405), null);
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await commissionController.getById(id),
        );
    });

    balanceRouter.get('/by-period', async function (ctx, next) {
        let month = ctx.query.month;
        let year = ctx.query.year;
        if (!month || !year)
            return responseObject(ctx, ResponseStatusEnum(405), null);
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await commissionController.getCommisionsByPeriod(
                parseInt(month),
                parseInt(year),
            ),
        );
    });

    balanceRouter.get('/by-period/report', async function (ctx, next) {
        let month = ctx.query.month;
        let year = ctx.query.year;
        if (!month || !year)
            return responseObject(ctx, ResponseStatusEnum(405), null);
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await commissionController.getDataCommissionToReport(
                parseInt(month),
                parseInt(year),
            ),
        );
    });

    balanceRouter.get('/user/:uid', async function (ctx, next) {
        let userid = ctx.params.uid;
        if (!userid) return responseObject(ctx, ResponseStatusEnum(405), null);
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await commissionController.getCommissionByUser(userid),
        );
    });

    balanceRouter.post('/execute', async function (ctx, next) {
        let params = ctx.request.body;
        if (!params.month || !params.year)
            return responseObject(ctx, ResponseStatusEnum(405), null);
        let response = await commissionController.executeCommissioning(
            parseInt(params.month),
            parseInt(params.year),
        );
        return responseObject(
            ctx,
            ResponseStatusEnum(response.code),
            response.data,
        );
    });

    module.exports = balanceRouter;
})();
