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

QuizAnswerRouter.get('/validate', async function (ctx, _next) {
    const quizId = ctx.request.query.quizId;
    const email = ctx.request.query.email;

    if (!quizId || !email) {
        const response = errorHandler('INVALID_PARAMS', ResponseStatusEnum);
        return responseObject(ctx, response.status, response.msg);
    }
    const { result, error } = await quizAnswerController.validateEmail({
        quizId,
        email,
    });

    const response = error
        ? errorHandler(error, ResponseStatusEnum)
        : { status: ResponseStatusEnum(200), msg: result };

    return responseObject(ctx, response.status, response.msg);
});

QuizAnswerRouter.post('/create', async function (ctx, _next) {
    const params = ctx.request.body;

    const isValidParams =
        params &&
        params.quizId &&
        params.email &&
        Array.isArray(params.answers) &&
        params.answers.length;

    if (!isValidParams) {
        const response = errorHandler('INVALID_PARAMS', ResponseStatusEnum);
        return responseObject(ctx, response.status, response.msg);
    }

    const quizId = params.quizId;

    const { result, error } = await quizAnswerController.createQuizAnswer(
        quizId,
        params,
    );

    const response = error
        ? errorHandler(error, ResponseStatusEnum)
        : { status: ResponseStatusEnum(200), msg: result };

    return responseObject(ctx, response.status, response.msg);
});

QuizAnswerRouter.post('/send-email', quizAnswerController.sendEmail);

QuizAnswerRouter.patch('/facebook/:quizAnswerId', async function (ctx, _next) {
    const quizAnswerId = ctx.params.quizAnswerId;
    const params = ctx.request.body;

    if (!params) {
        const response = errorHandler('INVALID_PARAMS', ResponseStatusEnum);
        return responseObject(ctx, response.status, response.msg);
    }

    const { error } = await quizAnswerController.updateDataFacebook(
        quizAnswerId,
        params,
    );

    const response = error
        ? errorHandler(error, ResponseStatusEnum)
        : { status: ResponseStatusEnum(204), msg: 'ok' };

    return responseObject(ctx, response.status, response.msg);
});

module.exports = QuizAnswerRouter;
