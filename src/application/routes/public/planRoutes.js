(async function () {
    'use strict';
    let Router = require('koa-router');

    const ResponseStatusEnum = require('../../../infrastructure/dictionaries/ResponseStatusEnum');
    const planController = require('../../controllers/billing/planController');
    const {
        responseObject,
    } = require('../../../infrastructure/helpers/routerHelper');
    let planRouter = new Router();

    planRouter.get('/', async (ctx) => {
        const isPublicRoute = true;
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await planController.getPlans(isPublicRoute),
        );
    });

    planRouter.get('/by-name/:name', async (ctx) => {
        let name = ctx.params.name;
        if (!name) return responseObject(ctx, ResponseStatusEnum(405), null);
        const isPublicRoute = true;
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await planController.getPlanByName(name, isPublicRoute),
        );
    });

    planRouter.get('/:id', async (ctx) => {
        let id = ctx.params.id;
        if (!id) return responseObject(ctx, ResponseStatusEnum(405), null);
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await planController.getPlan(id),
        );
    });

    planRouter.post('/types-on-cart', async (ctx) => {
        const body = ctx.request.body;
        if (!body || !Array.isArray(body.signatures))
            return responseObject(ctx, ResponseStatusEnum(405), null);
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await planController.getTypesOnCart(body.signatures),
        );
    });

    module.exports = planRouter;
})();
