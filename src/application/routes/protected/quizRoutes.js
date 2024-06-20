(async function () {
    'use strict';

    const Router = require('koa-router');
    const quizController = require('../../controllers/quiz/quizController');
    const ResponseStatusEnum = require('../../../infrastructure/dictionaries/ResponseStatusEnum');
    const {
        errorHandler,
    } = require('../../../infrastructure/helpers/quiz/quizErrorHelper');
    const {
        responseObject,
    } = require('../../../infrastructure/helpers/routerHelper');
    const QuizRouter = new Router();

    QuizRouter.post('/create', async function (ctx, _next) {
        const userId = ctx.auth_user_id;
        const {
            title,
            message,
            questions,
            enable,
            questionTime,
            discountPercentage,
            couponName,
        } = ctx.request.body;

        const isValidParams =
            userId &&
            title &&
            Array.isArray(questions) &&
            questions &&
            questionTime &&
            discountPercentage &&
            couponName;

        if (!isValidParams) {
            const response = errorHandler('INVALID_PARAMS', ResponseStatusEnum);
            return responseObject(ctx, response.status, response.msg);
        }

        const { result, error } = await quizController.createQuiz(userId, {
            title,
            message,
            questions,
            enable,
            questionTime,
            discountPercentage,
            couponName,
        });

        const response = error
            ? errorHandler(error, ResponseStatusEnum)
            : { status: ResponseStatusEnum(200), msg: result };

        return responseObject(ctx, response.status, response.msg);
    });

    QuizRouter.patch('/update', async function (ctx, _next) {
        const {
            quizId,
            title,
            message,
            questions,
            enable,
            questionTime,
            discountPercentage,
            couponName,
        } = ctx.request.body;

        const isValidParams =
            quizId &&
            title &&
            Array.isArray(questions) &&
            questions.length &&
            questionTime &&
            discountPercentage &&
            couponName;

        if (!isValidParams) {
            const response = errorHandler('INVALID_PARAMS', ResponseStatusEnum);
            return responseObject(ctx, response.status, response.msg);
        }

        const { result, error } = await quizController.updateQuiz(quizId, {
            title,
            message,
            questions,
            enable,
            questionTime,
            discountPercentage,
            couponName,
        });

        const response = error
            ? errorHandler(error, ResponseStatusEnum)
            : { status: ResponseStatusEnum(200), msg: result };

        return responseObject(ctx, response.status, response.msg);
    });

    QuizRouter.get('/by-creator/:id', async function (ctx, _next) {
        let creatorId = ctx.params.id;

        if (!creatorId) {
            const response = errorHandler('INVALID_PARAMS', ResponseStatusEnum);
            return responseObject(ctx, response.status, response.msg);
        }

        const { result, error } = await quizController.getQuizByCreator(
            creatorId,
        );

        const response = error
            ? errorHandler(error, ResponseStatusEnum)
            : { status: ResponseStatusEnum(200), msg: result };

        return responseObject(ctx, response.status, response.msg);
    });

    QuizRouter.get('/by-id/:id', async function (ctx, _next) {
        const quizId = ctx.params.id;

        if (!quizId) {
            const response = errorHandler('INVALID_PARAMS', ResponseStatusEnum);
            return responseObject(ctx, response.status, response.msg);
        }
        const { result, error } = await quizController.getQuizById(quizId);

        const response = error
            ? errorHandler(error, ResponseStatusEnum)
            : { status: ResponseStatusEnum(200), msg: result };

        return responseObject(ctx, response.status, response.msg);
    });

    QuizRouter.get('/all', async function (ctx, _next) {
        const { result, error } = await quizController.getAllQuiz();

        const response = error
            ? errorHandler(error, ResponseStatusEnum)
            : { status: ResponseStatusEnum(200), msg: result };

        return responseObject(ctx, response.status, response.msg);
    });

    QuizRouter.delete('/:id', async (ctx) => {
        const quizId = ctx.params.id;

        if (!quizId) {
            const response = errorHandler('INVALID_PARAMS', ResponseStatusEnum);
            return responseObject(ctx, response.status, response.msg);
        }

        const { result, error } = await quizController.removeByQuizId(quizId);

        const response = error
            ? errorHandler(error, ResponseStatusEnum)
            : { status: ResponseStatusEnum(204), msg: result };

        return responseObject(ctx, response.status, response.msg);
    });

    module.exports = QuizRouter;
})();
