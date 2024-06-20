'use strict';

const Router = require('koa-router');
const feedbackController = require('../../controllers/feedback/feedbackController');
const ResponseStatusEnum = require('../../../infrastructure/dictionaries/ResponseStatusEnum');
const {
    responseObject,
} = require('../../../infrastructure/helpers/routerHelper');
const {
    errorHandler,
} = require('../../../infrastructure/helpers/feedback/feedbackErrorHelper');
const FeedbackRouter = new Router();

FeedbackRouter.get('/all', async function (ctx, _next) {
    const { result, error } = await feedbackController.getAllFeedbacks();

    const response = error
        ? errorHandler(error, ResponseStatusEnum)
        : { status: ResponseStatusEnum(200), msg: result };

    return responseObject(ctx, response.status, response.msg);
});

FeedbackRouter.get('/by-id/:feedbackId', async function (ctx, _next) {
    const feedbackId = ctx.params.feedbackId;

    if (!feedbackId) {
        const response = errorHandler('INVALID_PARAMS', ResponseStatusEnum);
        return responseObject(ctx, response.status, response.msg);
    }

    const { result, error } = await feedbackController.getFeedbackById(
        feedbackId,
    );

    const response = error
        ? errorHandler(error, ResponseStatusEnum)
        : { status: ResponseStatusEnum(200), msg: result };

    return responseObject(ctx, response.status, response.msg);
});

FeedbackRouter.get('/by-user/:userId', async function (ctx, _next) {
    const userId = ctx.params.userId;

    if (!userId) {
        const response = errorHandler('INVALID_PARAMS', ResponseStatusEnum);
        return responseObject(ctx, response.status, response.msg);
    }

    const { result, error } = await feedbackController.getFeedbackByUserId(
        userId,
    );

    const response = error
        ? errorHandler(error, ResponseStatusEnum)
        : { status: ResponseStatusEnum(200), msg: result };

    return responseObject(ctx, response.status, response.msg);
});

FeedbackRouter.delete('/delete/:feedbackId', async function (ctx, _next) {
    const feedbackId = ctx.params.feedbackId;

    if (!feedbackId) {
        const response = errorHandler('INVALID_PARAMS', ResponseStatusEnum);
        return responseObject(ctx, response.status, response.msg);
    }

    const { result, error } = await feedbackController.removeFeedbackById(
        feedbackId,
    );

    const response = error
        ? errorHandler(error, ResponseStatusEnum)
        : { status: ResponseStatusEnum(200), msg: 'ok' };

    return responseObject(ctx, response.status, response.msg);
});

module.exports = FeedbackRouter;
