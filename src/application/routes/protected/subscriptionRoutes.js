'use strict';
let Router = require('koa-router');

const ResponseStatusEnum = require('../../../infrastructure/dictionaries/ResponseStatusEnum');

let subscriptionController = require('../../controllers/billing/subscriptionController');
const {
    responseObject,
} = require('../../../infrastructure/helpers/routerHelper');
let subscriptionRouter = new Router();

subscriptionRouter.post('/', async (ctx) => {
    let data = ctx.request.body;
    let creatorId = ctx.auth_user_id;
    if (!creatorId || !data.plan)
        return responseObject(ctx, ResponseStatusEnum(405), null);
    return responseObject(
        ctx,
        ResponseStatusEnum(200),
        await subscriptionController.createSubscription(creatorId, data),
    );
});

subscriptionRouter.get('/', async (ctx) => {
    return responseObject(
        ctx,
        ResponseStatusEnum(200),
        await subscriptionController.getAllSubscriptions(),
    );
});

subscriptionRouter.get('/creator/:id', async (ctx) => {
    let creatorId = ctx.params.id;
    if (!creatorId) return responseObject(ctx, ResponseStatusEnum(405), null);
    return responseObject(
        ctx,
        ResponseStatusEnum(200),
        await subscriptionController.getSubscriptionByCreator(creatorId),
    );
});

subscriptionRouter.get('/activate/:id', async (ctx) => {
    let subscriptionId = ctx.params.id;
    if (!subscriptionId)
        return responseObject(ctx, ResponseStatusEnum(405), null);
    return responseObject(
        ctx,
        ResponseStatusEnum(200),
        await subscriptionController.activateSubscription(subscriptionId),
    );
});

subscriptionRouter.get('/deactivate/:id', async (ctx) => {
    let subscriptionId = ctx.params.id;
    if (!subscriptionId)
        return responseObject(ctx, ResponseStatusEnum(405), null);
    return responseObject(
        ctx,
        ResponseStatusEnum(200),
        await subscriptionController.deactivateSubscription(subscriptionId),
    );
});

subscriptionRouter.get('/:id', async (ctx) => {
    let subscriptionId = ctx.params.id;
    if (!subscriptionId)
        return responseObject(ctx, ResponseStatusEnum(405), null);
    return responseObject(
        ctx,
        ResponseStatusEnum(200),
        await subscriptionController.getSubscriptionById(subscriptionId),
    );
});

subscriptionRouter.delete('/:id', async (ctx) => {
    let subscriptionId = ctx.params.id;
    if (!subscriptionId)
        return responseObject(ctx, ResponseStatusEnum(405), null);
    return responseObject(
        ctx,
        ResponseStatusEnum(200),
        await subscriptionController.deleteSubscriptionById(subscriptionId),
    );
});

subscriptionRouter.patch('/:id', async (ctx) => {
    const subscriptionId = ctx.params.id;
    const data = ctx.request.body;
    if (!subscriptionId || !data)
        return responseObject(ctx, ResponseStatusEnum(405), null);
    return responseObject(
        ctx,
        ResponseStatusEnum(200),
        await subscriptionController.updateSubscription(subscriptionId, data),
    );
});

module.exports = subscriptionRouter;
