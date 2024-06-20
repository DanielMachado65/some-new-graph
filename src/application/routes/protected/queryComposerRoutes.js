(async function () {
    'use strict';

    const Router = require('koa-router');

    const queryComposerController = require('../../controllers/query/queryComposerController');
    const ResponseStatusEnum = require('../../../infrastructure/dictionaries/ResponseStatusEnum');
    const {
        responseObject,
    } = require('../../../infrastructure/helpers/routerHelper');
    let queryComposerRouter = new Router();

    queryComposerRouter.get('/all-enables', async (ctx) => {
        let userid = ctx.auth_user_id;
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await queryComposerController.getAllEnables(userid),
        );
    });

    queryComposerRouter.get('/', async (ctx) => {
        let userid = ctx.request.query.id
            ? ctx.request.query.id
            : ctx.auth_user_id;
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await queryComposerController.getAll(userid),
        );
    });

    queryComposerRouter.get('/:id', async (ctx) => {
        let id = ctx.params.id;
        if (!id) return responseObject(ctx, ResponseStatusEnum(405));
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await queryComposerController.getById(id),
        );
    });

    queryComposerRouter.get('/code/:code', async (ctx) => {
        let code = ctx.params.code;
        if (!code) return responseObject(ctx, ResponseStatusEnum(405));
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await queryComposerController.getByCode(code),
        );
    });

    queryComposerRouter.get('/minimumPrice/:code', async (ctx) => {
        let code = ctx.params.code;
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await queryComposerController.getMinimumCostByQueryCode(code),
        );
    });

    queryComposerRouter.patch('/services/:id', async (ctx) => {
        let id = ctx.params.id;
        let params = ctx.request.body;
        if (id && params.services) {
            let response = await queryComposerController.updateServicesToQueryComposition(
                id,
                params.services,
            );
            return responseObject(
                ctx,
                ResponseStatusEnum(response.cod),
                response.data,
            );
        }
        return responseObject(ctx, ResponseStatusEnum(405));
    });

    queryComposerRouter.patch('/map/:id', async (ctx) => {
        let id = ctx.params.id;
        let map = ctx.request.body;
        if (id && map)
            return responseObject(
                ctx,
                ResponseStatusEnum(200),
                await queryComposerController.updateMap(id, map),
            );
        return responseObject(ctx, ResponseStatusEnum(405));
    });

    queryComposerRouter.patch('/rules/:id', async (ctx) => {
        let id = ctx.params.id;
        let rules = ctx.request.body;
        if (id && rules)
            return responseObject(
                ctx,
                ResponseStatusEnum(200),
                await queryComposerController.updateRules(id, rules),
            );
        return responseObject(ctx, ResponseStatusEnum(405));
    });

    queryComposerRouter.patch('/data/:id', async (ctx) => {
        let id = ctx.params.id;
        let params = ctx.request.body;
        if (id && params)
            return responseObject(
                ctx,
                ResponseStatusEnum(200),
                await queryComposerController.updateData(id, params),
            );
        return responseObject(ctx, ResponseStatusEnum(405));
    });

    queryComposerRouter.post('/new', async function (ctx, next) {
        let params = ctx.request.body,
            querycode = params.querycode,
            type = params.type,
            name = params.name,
            servicesId = params.services;

        if (querycode && servicesId)
            return responseObject(
                ctx,
                ResponseStatusEnum(200),
                await queryComposerController.createNewQueryContext(
                    querycode,
                    servicesId,
                    name,
                    type,
                ),
            );
        return responseObject(ctx, ResponseStatusEnum(410), null);
    });

    queryComposerRouter.delete('/:id', async (ctx) => {
        let id = ctx.params.id;
        if (id)
            return responseObject(
                ctx,
                ResponseStatusEnum(200),
                await queryComposerController.deleteQueryComposer(id),
            );
        return responseObject(ctx, ResponseStatusEnum(405));
    });

    module.exports = queryComposerRouter;
})();
