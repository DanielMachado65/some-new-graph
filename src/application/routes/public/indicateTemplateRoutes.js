'use strict';

const Router = require('koa-router');
const IndicateTemplateController = require('../../controllers/indicate/indicateTemplateController');
const ResponseStatusEnum = require('../../../infrastructure/dictionaries/ResponseStatusEnum');
const {
    responseObject,
} = require('../../../infrastructure/helpers/routerHelper');
const {
    errorHandler,
} = require('../../../infrastructure/helpers/indicate/indicateTemplateErrorHelper');
const IndicateTemplateRouter = new Router();

IndicateTemplateRouter.get('/active', async function (ctx, _next) {
    const {
        result,
        error,
    } = await IndicateTemplateController.getIndicateTemplateActivate();
    const response = error
        ? errorHandler(error, ResponseStatusEnum)
        : { status: ResponseStatusEnum(200), msg: result };
    return responseObject(ctx, response.status, response.msg);
});

IndicateTemplateRouter.get('/by-id/:indicateTemplateId', async function (
    ctx,
    _next,
) {
    const indicateTemplateId = ctx.params.indicateTemplateId;
    if (!indicateTemplateId) {
        const response = errorHandler('INVALID_PARAMS', ResponseStatusEnum);
        return responseObject(ctx, response.status, response.msg);
    }
    const {
        result,
        error,
    } = await IndicateTemplateController.getIndicateTemplateById(
        indicateTemplateId,
    );
    const response = error
        ? errorHandler(error, ResponseStatusEnum)
        : { status: ResponseStatusEnum(200), msg: result };
    return responseObject(ctx, response.status, response.msg);
});

module.exports = IndicateTemplateRouter;
