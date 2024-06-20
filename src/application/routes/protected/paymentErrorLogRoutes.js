(async function () {
    'use strict';

    const Router = require('koa-router');
    const paymentErrorLogController = require('../../controllers/log/paymentErrorLogController');
    const ResponseStatusEnum = require('../../../infrastructure/dictionaries/ResponseStatusEnum');
    const {
        responseObject,
    } = require('../../../infrastructure/helpers/routerHelper');
    let _paymentRouter = new Router();

    _paymentRouter.get('/all', async function (ctx, next) {
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await paymentErrorLogController.getErrorsLogs(),
        );
    });

    module.exports = _paymentRouter;
})();
