'use strict';

const Router = require('koa-router');
const serviceController = require('../../controllers/query/serviceController');
const ResponseStatusEnum = require('../../../infrastructure/dictionaries/ResponseStatusEnum');
const {
    responseObject,
} = require('../../../infrastructure/helpers/routerHelper');
let serviceRouter = new Router();

serviceRouter.get('/', async (ctx) => {
    return responseObject(
        ctx,
        ResponseStatusEnum(200),
        await serviceController.getAll(),
    );
});

serviceRouter.post('/new/:code', async function (ctx, next) {
    let code = ctx.params.code;
    let params = ctx.request.body;
    let minimumPrice = params.minimumPrice;
    minimumPrice = Number.isNaN(parseFloat(minimumPrice))
        ? 0
        : parseFloat(minimumPrice);

    if (code)
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await serviceController.createNewService(code, minimumPrice),
        );
    return responseObject(ctx, ResponseStatusEnum(405), null);
});

serviceRouter.patch('/:id', async (ctx) => {
    let serviceid = ctx.params.id;
    let params = ctx.request.body;
    if (!serviceid || !params)
        return responseObject(ctx, ResponseStatusEnum(405), null);
    let response = await serviceController.updateAutoSwitching(
        serviceid,
        params.switching,
    );
    return responseObject(
        ctx,
        ResponseStatusEnum(response.code),
        response.data,
    );
});

serviceRouter.patch('/change-minimumPrice/:serviceId', async function (
    ctx,
    next,
) {
    let serviceId = ctx.params.serviceId;
    let params = ctx.request.body;
    let minimumPrice = params.minimumPrice;
    minimumPrice = Number.isNaN(parseFloat(minimumPrice))
        ? 0
        : parseFloat(minimumPrice);
    if ((serviceId && minimumPrice) || (serviceId && minimumPrice == 0))
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await serviceController.updateMinimumPrice(serviceId, minimumPrice),
        );
    return responseObject(ctx, ResponseStatusEnum(405), null);
});

module.exports = serviceRouter;
