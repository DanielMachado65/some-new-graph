'use strict';

const Router = require('koa-router');
const quizController = require('../../controllers/quiz/quizController');
const ResponseStatusEnum = require('../../../infrastructure/dictionaries/ResponseStatusEnum');
const {
    responseObject,
} = require('../../../infrastructure/helpers/routerHelper');
const QuizRouter = new Router();
const {
    errorHandler,
} = require('../../../infrastructure/helpers/quiz/quizErrorHelper');

QuizRouter.get('/by-id/:id', async function (ctx, _next) {
    const quizId = ctx.params.id;

    if (!quizId) {
        const response = errorHandler('INVALID_PARAMS', ResponseStatusEnum);
        return responseObject(ctx, response.status, response.msg);
    }
    const { result, error } = await quizController.getEnabledQuizById(quizId);

    const response = error
        ? errorHandler(error, ResponseStatusEnum)
        : { status: ResponseStatusEnum(200), msg: result };

    return responseObject(ctx, response.status, response.msg);
});

QuizRouter.get('/basic-info/:id', async function (ctx, _next) {
    const quizId = ctx.params.id;

    if (!quizId) {
        const response = errorHandler('INVALID_PARAMS', ResponseStatusEnum);
        return responseObject(ctx, response.status, response.msg);
    }
    const { result, error } = await quizController.getMessageAndTitleByQuizId(
        quizId,
    );

    const response = error
        ? errorHandler(error, ResponseStatusEnum)
        : { status: ResponseStatusEnum(200), msg: result };

    return responseObject(ctx, response.status, response.msg);
});

module.exports = QuizRouter;
