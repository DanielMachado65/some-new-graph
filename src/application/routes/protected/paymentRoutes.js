(async function () {
    'use strict';

    const Router = require('koa-router');
    const purchaseController = require('../../controllers/billing/paymentController');
    const ResponseStatusEnum = require('../../../infrastructure/dictionaries/ResponseStatusEnum');
    const {
        responseObject,
    } = require('../../../infrastructure/helpers/routerHelper');
    let _paymentRouter = new Router();

    _paymentRouter.get('/by-id/:id', async function (ctx, net) {
        let id = ctx.params.id;
        if (!id) return responseObject(ctx, ResponseStatusEnum(405), null);
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await purchaseController.getById(id),
        );
    });

    _paymentRouter.get('/total-by-day', async function (ctx, net) {
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await purchaseController.getByDay(),
        );
    });

    _paymentRouter.get('/', async function (ctx, net) {
        let billid = ctx.query.id;
        let coupon = ctx.query.c;
        let partnerid = ctx.auth_user_id;
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await purchaseController.getAll(billid, partnerid, coupon),
        );
    });

    _paymentRouter.post('/report', async function (ctx, net) {
        const params = ctx.request.body;
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await purchaseController.getAllPaymentsByPeriod(params),
        );
    });

    _paymentRouter.get('/summery/:billingid', async function (ctx, net) {
        let billingid = ctx.params.billingid;
        if (!billingid)
            return responseObject(ctx, ResponseStatusEnum(405), null);
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await purchaseController.getSummaryBilling(billingid),
        );
    });

    _paymentRouter.post('/management', async function (ctx, net) {
        const params = ctx.request.body;
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await purchaseController.createOrUpdatePaymentManagementRules(params),
        );
    });

    _paymentRouter.get('/management/current', async function (ctx, net) {
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await purchaseController.getCurrentPaymentManagementRules(),
        );
    });

    module.exports = _paymentRouter;
})();
