'use strict';

const Router = require('koa-router');
const IndicationController = require('../../controllers/indicate/indicationController');
const ResponseStatusEnum = require('../../../infrastructure/dictionaries/ResponseStatusEnum');
const {
    responseObject,
} = require('../../../infrastructure/helpers/routerHelper');
const {
    errorHandler,
} = require('../../../infrastructure/helpers/indicate/indicationErrorHelper');
const IndicationRouter = new Router();

IndicationRouter.get('/by-indicator/:indicatorId', async function (ctx, _next) {
    const indicatorId = ctx.params.indicatorId;

    if (!indicatorId) {
        const response = errorHandler('INVALID_PARAMS', ResponseStatusEnum);
        return responseObject(ctx, response.status, response.msg);
    }

    const {
        result,
        error,
    } = await IndicationController.getIndicationByIndicatorId(indicatorId);

    const response = error
        ? errorHandler(error, ResponseStatusEnum)
        : { status: ResponseStatusEnum(200), msg: result };

    return responseObject(ctx, response.status, response.msg);
});

module.exports = IndicationRouter;
