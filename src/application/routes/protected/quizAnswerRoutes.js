'use strict';

const Router = require('koa-router');
const quizAnswerController = require('../../controllers/quiz/quizAnswerController');
const ResponseStatusEnum = require('../../../infrastructure/dictionaries/ResponseStatusEnum');
const {
    responseObject,
} = require('../../../infrastructure/helpers/routerHelper');
const QuizAnswerRouter = new Router();
const {
    errorHandler,
} = require('../../../infrastructure/helpers/quizAnswer/quizAnswerErrorHelper');

QuizAnswerRouter.get('/by-quiz-id/:id', async function (ctx, _next) {
    const quizId = ctx.params.id;

    if (!quizId) {
        const response = errorHandler('INVALID_PARAMS', ResponseStatusEnum);
        return responseObject(ctx, response.status, response.msg);
    }
    const { result, error } = await quizAnswerController.getQuizAnswerByQuizId(
        quizId,
    );

    const response = error
        ? errorHandler(error, ResponseStatusEnum)
        : { status: ResponseStatusEnum(200), msg: result };

    return responseObject(ctx, response.status, response.msg);
});

QuizAnswerRouter.get('/by-email/:email', async function (ctx, _next) {
    const email = ctx.params.email;

    if (!email) {
        const response = errorHandler('INVALID_PARAMS', ResponseStatusEnum);
        return responseObject(ctx, response.status, response.msg);
    }
    const { result, error } = await quizAnswerController.getQuizAnswerByEmail(
        email,
    );

    const response = error
        ? errorHandler(error, ResponseStatusEnum)
        : { status: ResponseStatusEnum(200), msg: result };

    return responseObject(ctx, response.status, response.msg);
});

QuizAnswerRouter.get('/all', async function (ctx, _next) {
    const filter = {};
    if (ctx.query.initDate && ctx.query.initDate.trim().length)
        filter.initDate = ctx.query.initDate;
    if (ctx.query.endDate && ctx.query.endDate.trim().length)
        filter.endDate = ctx.query.endDate;
    if (ctx.query.email && ctx.query.email.trim().length)
        filter.email = ctx.query.email.trim();
    if (ctx.query.quizId && ctx.query.quizId.trim().length)
        filter.quizId = ctx.query.quizId.trim();

    const { result, error } = await quizAnswerController.getAllQuizAnswer(
        filter,
    );

    const response = error
        ? errorHandler(error, ResponseStatusEnum)
        : { status: ResponseStatusEnum(200), msg: result };

    return responseObject(ctx, response.status, response.msg);
});

module.exports = QuizAnswerRouter;
