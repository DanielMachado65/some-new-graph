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

IndicateTemplateRouter.post('/create', async function (ctx, _next) {
    const userId = ctx.auth_user_id;
    const data = ctx.request.body;

    const isValidParams =
        userId &&
        data.hasOwnProperty('title') &&
        data.hasOwnProperty('description') &&
        data.hasOwnProperty('dataToShare') &&
        data.hasOwnProperty('commission') &&
        data.hasOwnProperty('percentage');

    data.user = userId;

    if (!isValidParams) {
        const response = errorHandler('INVALID_PARAMS', ResponseStatusEnum);
        return responseObject(ctx, response.status, response.msg);
    }

    const { error } = await IndicateTemplateController.createIndicateTemplate(
        userId,
        data,
    );

    const response = error
        ? errorHandler(error, ResponseStatusEnum)
        : { status: ResponseStatusEnum(204), msg: null };

    return responseObject(ctx, response.status, response.msg);
});

IndicateTemplateRouter.get('/all', async function (ctx, _next) {
    const {
        result,
        error,
    } = await IndicateTemplateController.getAllIndicateTemplate();
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

IndicateTemplateRouter.get('/by-user/:userId', async function (ctx, _next) {
    const userId = ctx.params.userId;

    if (!userId) {
        const response = errorHandler('INVALID_PARAMS', ResponseStatusEnum);
        return responseObject(ctx, response.status, response.msg);
    }

    const {
        result,
        error,
    } = await IndicateTemplateController.getIndicateTemplateByUserId(userId);

    const response = error
        ? errorHandler(error, ResponseStatusEnum)
        : { status: ResponseStatusEnum(200), msg: result };

    return responseObject(ctx, response.status, response.msg);
});

module.exports = IndicateTemplateRouter;
