(async function () {
    'use strict';

    const Router = require('koa-router');
    // const logModule = require('../../modules/internal/logModule');
    const logController = require('../../controllers/log/logController');
    const ResponseStatusEnum = require('../../../infrastructure/dictionaries/ResponseStatusEnum');
    const {
        responseObject,
    } = require('../../../infrastructure/helpers/routerHelper');
    let logRouter = new Router();

    logRouter.get('/user/:id', async function (ctx, next) {
        let user = ctx.params.id;
        if (user)
            return responseObject(
                ctx,
                ResponseStatusEnum(200),
                await logController.getTotalByUser(user),
            );
        return responseObject(ctx, ResponseStatusEnum(405), null);
    });

    logRouter.get('/:id', async function (ctx, next) {
        let _id = ctx.params.id;
        if (_id)
            return responseObject(
                ctx,
                ResponseStatusEnum(200),
                await logController.getById(_id),
            );
        return responseObject(ctx, ResponseStatusEnum(405), null);
    });

    logRouter.get('/query/:id', async function (ctx, next) {
        let _id = ctx.params.id;
        if (_id)
            return responseObject(
                ctx,
                ResponseStatusEnum(200),
                await logController.getByQuery(_id),
            );
        return responseObject(ctx, ResponseStatusEnum(405), null);
    });

    module.exports = logRouter;
})();
