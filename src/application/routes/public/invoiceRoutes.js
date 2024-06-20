(async function () {
    'use strict';

    const Router = require('koa-router');
    const invoiceController = require('../../controllers/billing/invoiceController');
    const ResponseStatusEnum = require('../../../infrastructure/dictionaries/ResponseStatusEnum');
    const {
        responseObject,
    } = require('../../../infrastructure/helpers/routerHelper');
    let invoiceRouter = new Router();

    invoiceRouter.get('/:id', async function (ctx, next) {
        let id = ctx.params.id;
        if (id)
            return responseObject(
                ctx,
                ResponseStatusEnum(200),
                await invoiceController.getJsonById(id),
            );
        return responseObject(ctx, ResponseStatusEnum(405), null);
    });

    invoiceRouter.get('/summery/:id', async function (ctx, next) {
        let id = ctx.params.id;
        if (id)
            return responseObject(
                ctx,
                ResponseStatusEnum(200),
                await invoiceController.getSummary(id),
            );
        return responseObject(ctx, ResponseStatusEnum(405), null);
    });

    module.exports = invoiceRouter;
})();
