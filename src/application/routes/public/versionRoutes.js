(function () {
    'use strict';

    const Router = require('koa-router');
    const ResponseStatusEnum = require('../../../infrastructure/dictionaries/ResponseStatusEnum');
    const {
        responseObject,
    } = require('../../../infrastructure/helpers/routerHelper');
    const versionRouter = new Router();
    const packageJson = require('../../../../package.json');

    versionRouter.get('/', function (ctx, _next) {
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            packageJson.version,
        );
    });

    module.exports = versionRouter;
})();
