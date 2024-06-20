(async function () {
    'use strict';

    const Router = require('koa-router');
    const voucherController = require('../../controllers/voucher/voucherController');
    const ResponseStatusEnum = require('../../../infrastructure/dictionaries/ResponseStatusEnum');
    const {
        responseObject,
    } = require('../../../infrastructure/helpers/routerHelper');
    let voucherRouter = new Router();

    voucherRouter.get('/', async function (ctx, next) {
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await voucherController.getAll(),
        );
    });

    module.exports = voucherRouter;
})();
