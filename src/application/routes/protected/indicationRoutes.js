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

IndicationRouter.post('/', async function (ctx, _next) {
    const data = ctx.request.body;

    const isValidParams =
        data.hasOwnProperty('client') &&
        data.hasOwnProperty('indicator') &&
        data.hasOwnProperty('indicateTemplate') &&
        data.hasOwnProperty('payment');

    if (!isValidParams) {
        const response = errorHandler('INVALID_PARAMS', ResponseStatusEnum);
        return responseObject(ctx, response.status, response.msg);
    }

    const { error } = await IndicationController.createIndication(data);

    const response = error
        ? errorHandler(error, ResponseStatusEnum)
        : { status: ResponseStatusEnum(204), msg: null };

    return responseObject(ctx, response.status, response.msg);
});

IndicationRouter.patch('/:indicationId', async function (ctx, _next) {
    const data = ctx.request.body;
    const indicationId = ctx.params.indicationId;

    const isValidParams =
        indicationId &&
        data.hasOwnProperty('client') &&
        data.hasOwnProperty('indicator') &&
        data.hasOwnProperty('indicateTemplate') &&
        data.hasOwnProperty('payment');

    if (!isValidParams) {
        const response = errorHandler('INVALID_PARAMS', ResponseStatusEnum);
        return responseObject(ctx, response.status, response.msg);
    }

    const { result, error } = await IndicationController.updateIndication(
        indicationId,
        data,
    );

    const response = error
        ? errorHandler(error, ResponseStatusEnum)
        : { status: ResponseStatusEnum(204), msg: result };

    return responseObject(ctx, response.status, response.msg);
});

IndicationRouter.get('/all', async (ctx, _next) => {
    const { result, error } = await IndicationController.getAllIndications();

    const response = error
        ? errorHandler(error, ResponseStatusEnum)
        : { status: ResponseStatusEnum(200), msg: result };

    return responseObject(ctx, response.status, response.msg);
});

IndicationRouter.get('/by-id/:indicationId', async (ctx, _next) => {
    const indicationId = ctx.params.indicationId;

    if (!indicationId) {
        const response = errorHandler('INVALID_PARAMS', ResponseStatusEnum);
        return responseObject(ctx, response.status, response.msg);
    }

    const { result, error } = await IndicationController.getIndicationById(
        indicationId,
    );

    const response = error
        ? errorHandler(error, ResponseStatusEnum)
        : { status: ResponseStatusEnum(200), msg: result };

    return responseObject(ctx, response.status, response.msg);
});

IndicationRouter.get('/by-indicator/:indicatorId', async (ctx, _next) => {
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

IndicationRouter.get('/by-client/:clientId', async (ctx, _next) => {
    const clientId = ctx.params.clientId;

    if (!clientId) {
        const response = errorHandler('INVALID_PARAMS', ResponseStatusEnum);
        return responseObject(ctx, response.status, response.msg);
    }

    const {
        result,
        error,
    } = await IndicationController.getIndicationByClientId(clientId);

    const response = error
        ? errorHandler(error, ResponseStatusEnum)
        : { status: ResponseStatusEnum(200), msg: result };

    return responseObject(ctx, response.status, response.msg);
});

IndicationRouter.get('/by-indicate/:indicateId', async (ctx, _next) => {
    const indicateId = ctx.params.indicateId;

    if (!indicateId) {
        const response = errorHandler('INVALID_PARAMS', ResponseStatusEnum);
        return responseObject(ctx, response.status, response.msg);
    }

    const {
        result,
        error,
    } = await IndicationController.getIndicationByIndicateTemplateId(
        indicateId,
    );

    const response = error
        ? errorHandler(error, ResponseStatusEnum)
        : { status: ResponseStatusEnum(200), msg: result };

    return responseObject(ctx, response.status, response.msg);
});

IndicationRouter.get('/by-payment/:paymentId', async (ctx, _next) => {
    const paymentId = ctx.params.paymentId;

    if (!paymentId) {
        const response = errorHandler('INVALID_PARAMS', ResponseStatusEnum);
        return responseObject(ctx, response.status, response.msg);
    }

    const {
        result,
        error,
    } = await IndicationController.getIndicationByPaymentId(paymentId);

    const response = error
        ? errorHandler(error, ResponseStatusEnum)
        : { status: ResponseStatusEnum(200), msg: result };

    return responseObject(ctx, response.status, response.msg);
});

// getAllIndications,
// getIndicationById,
// getIndicationByIndicatorId,
// getIndicationByClientId,
// getIndicationByIndicateTemplateId,
// getIndicationByPaymentId,

module.exports = IndicationRouter;
