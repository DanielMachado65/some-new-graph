(async function () {
    'use strict';

    const Router = require('koa-router');
    const frontLogController = require('../../controllers/log/frontLogController');
    const ResponseStatusEnum = require('../../../infrastructure/dictionaries/ResponseStatusEnum');
    const {
        responseObject,
    } = require('../../../infrastructure/helpers/routerHelper');
    const frontLogRouter = new Router();

    frontLogRouter.get('/', async function (ctx, _next) {
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await frontLogController.getLogs(ctx.request.query),
        );
    });

    frontLogRouter.get('/:id', async function (ctx, _next) {
        const id = ctx.params.id;

        if (id)
            return responseObject(
                ctx,
                ResponseStatusEnum(200),
                await frontLogController.getById(id),
            );
        return responseObject(ctx, ResponseStatusEnum(405), null);
    });

    frontLogRouter.get('/ip/:ip', async function (ctx, _next) {
        const ip = ctx.params.ip;

        if (ip)
            return responseObject(
                ctx,
                ResponseStatusEnum(200),
                await frontLogController.getByIp(ip),
            );
        return responseObject(ctx, ResponseStatusEnum(405), null);
    });

    frontLogRouter.get('/user/:id', async function (ctx, _next) {
        const user = ctx.params.id;

        if (user)
            return responseObject(
                ctx,
                ResponseStatusEnum(200),
                await frontLogController.getByUser(user),
            );
        return responseObject(ctx, ResponseStatusEnum(405), null);
    });

    frontLogRouter.post('/', async function (ctx, _next) {
        const log = {
            ip: ctx.request.headers['x-forwarded-for'],
            ...ctx.request.body,
        };

        if (log)
            return responseObject(
                ctx,
                ResponseStatusEnum(200),
                await frontLogController.createLog(log),
            );
        return responseObject(ctx, ResponseStatusEnum(405), null);
    });

    module.exports = frontLogRouter;
})();
