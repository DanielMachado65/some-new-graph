(async function () {
    'use strict';
    let Router = require('koa-router');

    const ResponseStatusEnum = require('../../../infrastructure/dictionaries/ResponseStatusEnum');
    const planController = require('../../controllers/billing/planController');
    const {
        responseObject,
    } = require('../../../infrastructure/helpers/routerHelper');
    let planRouter = new Router();

    planRouter.post('/', async (ctx) => {
        const userId = ctx.auth_user_id;
        let data = ctx.request.body;
        if (!data.name || !data.valueCents || !userId)
            return responseObject(ctx, ResponseStatusEnum(405), null);
        data.creator = userId;
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await planController.createPlan(data),
        );
    });

    planRouter.get('/', async (ctx) => {
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await planController.getPlans(),
        );
    });

    planRouter.get('/by-name/:name', async (ctx) => {
        let name = ctx.params.name;
        if (!name) return responseObject(ctx, ResponseStatusEnum(405), null);
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await planController.getPlanByName(name),
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

    planRouter.patch('/:id', async (ctx) => {
        const id = ctx.params.id;
        const data = ctx.request.body;
        if (!id) return responseObject(ctx, ResponseStatusEnum(405), null);
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await planController.updatePlan(id, data),
        );
    });

    planRouter.delete('/:id', async (ctx) => {
        let id = ctx.params.id;
        if (!id) return responseObject(ctx, ResponseStatusEnum(405), null);
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await planController.deletePlan(id),
        );
    });

    module.exports = planRouter;
})();
