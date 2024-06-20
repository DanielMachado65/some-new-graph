(async function () {
    'use strict';

    const Router = require('koa-router');
    const partnerController = require('../../controllers/user/partnerController');
    const ResponseStatusEnum = require('../../../infrastructure/dictionaries/ResponseStatusEnum');
    const {
        responseObject,
    } = require('../../../infrastructure/helpers/routerHelper');
    let partnerRouter = new Router();

    partnerRouter.patch('/update-rules/:id', async function (ctx, next) {
        let params = ctx.request.body;
        let id = ctx.params.id;
        if (!params || !id)
            return responseObject(ctx, ResponseStatusEnum(405), null);
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await partnerController.updateRules(id, params),
        );
    });

    module.exports = partnerRouter;
})();
