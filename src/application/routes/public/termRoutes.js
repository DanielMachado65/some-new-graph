(async function () {
    'use strict';

    const ResponseStatusEnum = require('../../../infrastructure/dictionaries/ResponseStatusEnum');
    const {
        responseObject,
    } = require('../../../infrastructure/helpers/routerHelper');
    let termController = require('../../controllers/terms/termController');
    let Router = require('koa-router');
    let termsRouter = new Router();

    termsRouter.get('/', async (ctx) => {
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await termController.getTerm(),
        );
    });

    module.exports = termsRouter;
})();
