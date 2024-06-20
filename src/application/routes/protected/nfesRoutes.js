(async function () {
    'use strict';

    const Router = require('koa-router');
    const nfesController = require('../../controllers/nfes/nfesController');
    const ResponseStatusEnum = require('../../../infrastructure/dictionaries/ResponseStatusEnum');
    const {
        responseObject,
    } = require('../../../infrastructure/helpers/routerHelper');
    let nfesRouter = new Router();

    module.exports = nfesRouter;
})();
