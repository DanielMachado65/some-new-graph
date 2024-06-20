(async function () {
    'use strict';

    const Router = require('koa-router');
    const publicNotificationController = require('../../controllers/notification/publicNotificationController');
    const ResponseStatusEnum = require('../../../infrastructure/dictionaries/ResponseStatusEnum');
    const {
        responseObject,
    } = require('../../../infrastructure/helpers/routerHelper');
    let publicNotificationRoutes = new Router();

    publicNotificationRoutes.get('/', async (ctx) => {
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await publicNotificationController.getAll(),
        );
    });

    publicNotificationRoutes.post('/', async (ctx) => {
        let params = ctx.request.body;
        if (!params) return responseObject(ctx, ResponseStatusEnum(405), null);
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await publicNotificationController.createNew(params),
        );
    });

    publicNotificationRoutes.delete('/:id', async (ctx) => {
        let id = ctx.params.id;
        if (!id) return responseObject(ctx, ResponseStatusEnum(405), null);
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await publicNotificationController.deleteById(id),
        );
    });

    module.exports = publicNotificationRoutes;
})();
