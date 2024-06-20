(async function () {
    'use strict';

    const Router = require('koa-router');
    const balanceController = require('../../controllers/billing/balanceController');
    const ResponseStatusEnum = require('../../../infrastructure/dictionaries/ResponseStatusEnum');
    const {
        responseObject,
    } = require('../../../infrastructure/helpers/routerHelper');
    let balanceRouter = new Router();

    balanceRouter.get('/lasts', async function (ctx, next) {
        let initDate = ctx.query.idt;
        let endDate = ctx.query.edt;
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await balanceController.getLasts(initDate, endDate),
        );
    });

    balanceRouter.get('/by-user/:uid', async function (ctx, next) {
        let userid = ctx.params.uid;
        let initDate = ctx.query.idt;
        let endDate = ctx.query.edt;
        if (!userid) return responseObject(ctx, ResponseStatusEnum(405), null);
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await balanceController.getByUser(userid, initDate, endDate),
        );
    });

    balanceRouter.get('/by-assigner/:assignerid', async function (ctx, next) {
        let assignerid = ctx.params.assignerid;
        let initDate = ctx.query.idt;
        let endDate = ctx.query.edt;
        if (!assignerid)
            return responseObject(ctx, ResponseStatusEnum(405), null);
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await balanceController.getByAssigner(
                assignerid,
                initDate,
                endDate,
            ),
        );
    });

    module.exports = balanceRouter;
})();
