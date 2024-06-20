(async function () {
    'use strict';

    const Router = require('koa-router');
    const kondutoController = require('../../controllers/konduto/kondutoController');
    const ResponseStatusEnum = require('../../../infrastructure/dictionaries/ResponseStatusEnum');
    const {
        responseObject,
    } = require('../../../infrastructure/helpers/routerHelper');
    let kondutoRouter = new Router();

    kondutoRouter.post('/order', async function (ctx, next) {
        let params = ctx.request.body;
        if (params)
            return responseObject(
                ctx,
                ResponseStatusEnum(200),
                await kondutoController.createOrder(params),
            );
        return responseObject(ctx, ResponseStatusEnum(405), null);
    });

    module.exports = kondutoRouter;
})();
