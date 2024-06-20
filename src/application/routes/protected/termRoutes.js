(async function () {
    'use strict';

    const ResponseStatusEnum = require('../../../infrastructure/dictionaries/ResponseStatusEnum');

    let termController = require('../../controllers/terms/termController');
    const {
        responseObject,
    } = require('../../../infrastructure/helpers/routerHelper');
    let Router = require('koa-router');
    let termsRouter = new Router();

    termsRouter.post('/', async (ctx) => {
        let data = ctx.request.body;
        if (!data.title || !data.body)
            return responseObject(ctx, ResponseStatusEnum(405), null);
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await termController.updateTerm(data),
        );
    });

    termsRouter.get('/all', async (ctx) => {
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await termController.getAllTerms(),
        );
    });

    termsRouter.get('/:id', async (ctx) => {
        let id = ctx.params.id;
        if (!id) return responseObject(ctx, ResponseStatusEnum(405), null);
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await termController.getDetailsTerm(id),
        );
    });

    termsRouter.get('/activate/:id', async (ctx) => {
        let id = ctx.params.id;
        if (!id) return responseObject(ctx, ResponseStatusEnum(405), null);
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await termController.activateTerm(id),
        );
    });

    module.exports = termsRouter;
})();
