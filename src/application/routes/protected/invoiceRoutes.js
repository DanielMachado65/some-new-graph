(async function () {
    'use strict';

    const Router = require('koa-router');
    const invoiceController = require('../../controllers/billing/invoiceController');
    const ResponseStatusEnum = require('../../../infrastructure/dictionaries/ResponseStatusEnum');
    const {
        responseObject,
    } = require('../../../infrastructure/helpers/routerHelper');
    let invoiceRouter = new Router();

    invoiceRouter.post('/grant-discount/:invoiceId', async function (
        ctx,
        next,
    ) {
        let body = ctx.request.body;
        let invoiceId = ctx.params.invoiceId;
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await invoiceController.grantDiscount(
                invoiceId,
                body.motive,
                body.value,
                body.userId,
            ),
        );
    });

    module.exports = invoiceRouter;
})();
