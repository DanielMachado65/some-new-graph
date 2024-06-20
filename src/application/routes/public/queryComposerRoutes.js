(async function () {
    'use strict';

    const Router = require('koa-router');

    const queryComposerController = require('../../controllers/query/queryComposerController');
    const ResponseStatusEnum = require('../../../infrastructure/dictionaries/ResponseStatusEnum');
    const {
        responseObject,
    } = require('../../../infrastructure/helpers/routerHelper');
    let queryComposerRouter = new Router();

    queryComposerRouter.post('/add-services', async function (ctx, next) {
        let params = ctx.request.body,
            querycode = params.querycode,
            services = params.services;
        if (querycode && services)
            return responseObject(
                ctx,
                ResponseStatusEnum(200),
                await queryComposerController.addServicesToCompositionQuery(
                    querycode,
                    services,
                ),
            );
        return responseObject(ctx, ResponseStatusEnum(410), null);
    });

    module.exports = queryComposerRouter;
})();
