(async function () {
    'use strict';

    const Router = require('koa-router');
    const packageController = require('../../controllers/billing/packageController');
    const ResponseStatusEnum = require('../../../infrastructure/dictionaries/ResponseStatusEnum');
    const {
        responseObject,
    } = require('../../../infrastructure/helpers/routerHelper');
    let packageRouter = new Router();

    packageRouter.get('/all', async function (ctx, next) {
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await packageController.getEnables(),
        );
    });

    packageRouter.get('/:id', async function (ctx, next) {
        let packageid = ctx.params.id;
        if (packageid)
            return responseObject(
                ctx,
                ResponseStatusEnum(200),
                await packageController.getById(packageid),
            );
        return responseObject(ctx, ResponseStatusEnum(405), null);
    });

    packageRouter.post('/', async function (ctx, next) {
        let params = ctx.request.body;
        if (params)
            return responseObject(
                ctx,
                ResponseStatusEnum(200),
                await packageController.createNew(params),
            );
        return responseObject(ctx, ResponseStatusEnum(405), null);
    });

    module.exports = packageRouter;
})();
