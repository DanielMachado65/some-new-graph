(async function () {
    'use strict';

    const Router = require('koa-router');
    const recommendationController = require('../../controllers/user/recommendationController');
    const ResponseStatusEnum = require('../../../infrastructure/dictionaries/ResponseStatusEnum');
    const {
        responseObject,
    } = require('../../../infrastructure/helpers/routerHelper');
    let recommendationRouter = new Router();

    recommendationRouter.get('/', async (ctx) => {
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await recommendationController.getAll(),
        );
    });

    recommendationRouter.post('/add-recommendation/:iduser', async function (
        ctx,
        next,
    ) {
        let params = ctx.request.body;
        let id = ctx.params.iduser;
        if (!params || !id)
            return responseObject(ctx, ResponseStatusEnum(405), null);
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await recommendationController.addNewRecommendation(params, id),
        );
    });

    module.exports = recommendationRouter;
})();
