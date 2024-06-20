(async function () {
    'use strict';

    const ResponseStatusEnum = require('../../../infrastructure/dictionaries/ResponseStatusEnum');
    const {
        responseObject,
    } = require('../../../infrastructure/helpers/routerHelper');
    let vehicularMonitoringController = require('../../controllers/products/vehicularMonitoringController');
    let Router = require('koa-router');
    let vehicularMonitoringRouter = new Router();

    vehicularMonitoringRouter.post('/', async (ctx) => {
        let data = ctx.request.body;
        let userId = ctx.auth_user_id;
        const keys = data.keys;
        const subscriptionId = data.subscription;
        if (!userId || !subscriptionId)
            return responseObject(ctx, ResponseStatusEnum(405), null);
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await vehicularMonitoringController.createVehicularMonitoring(
                userId,
                subscriptionId,
                keys,
            ),
        );
    });

    vehicularMonitoringRouter.get('/', async (ctx) => {
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await vehicularMonitoringController.getAllVehicularMonitoring(),
        );
    });

    vehicularMonitoringRouter.patch('/', async (ctx) => {
        let data = ctx.request.body;
        const keys = data.keys;
        const subscriptionId = data.subscription;
        if (!subscriptionId || !keys)
            return responseObject(ctx, ResponseStatusEnum(405), null);
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await vehicularMonitoringController.updateVehicularMonitoring(
                subscriptionId,
                keys,
            ),
        );
    });

    vehicularMonitoringRouter.get('/by-user/:id', async (ctx) => {
        let userId = ctx.params.id;
        if (!userId) return responseObject(ctx, ResponseStatusEnum(405), null);
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await vehicularMonitoringController.getByUserVehicularMonitoring(
                userId,
            ),
        );
    });

    vehicularMonitoringRouter.get('/by-subscription/:id', async (ctx) => {
        const subscriptionId = ctx.params.id;
        if (!subscriptionId)
            return responseObject(ctx, ResponseStatusEnum(405), null);
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await vehicularMonitoringController.getBySubscriptionVehicularMonitoring(
                subscriptionId,
            ),
        );
    });

    module.exports = vehicularMonitoringRouter;
})();
