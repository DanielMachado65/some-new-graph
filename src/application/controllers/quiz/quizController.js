(async function () {
    'use strict';

    const quizHelper = require('../../../infrastructure/helpers/quiz/quizHelper');
    const quizModule = require('../../../domain/quiz/quizModule');
    const userModule = require('../../../domain/user/user/userModule');

    const createQuiz = async (
        userId,
        {
            title,
            message,
            questions,
            enable,
            questionTime,
            discountPercentage,
            couponName,
        },
    ) => {
        try {
            const userResponse = await userModule.getUserById(userId);
            if (userResponse.error)
                return quizHelper.quizErrorHandler(userResponse);

            const titleResponse = quizHelper.validateTitle(title);
            if (titleResponse.error)
                return quizHelper.quizErrorHandler(titleResponse);

            const questionTimeResponse = quizHelper.validateQuestionTime(
                questionTime,
            );
            if (questionTimeResponse.error)
                return quizHelper.quizErrorHandler(questionTimeResponse);

            const discountPercentageResponse = quizHelper.validateDiscountPercentage(
                discountPercentage,
            );
            if (discountPercentageResponse.error)
                return quizHelper.quizErrorHandler(discountPercentageResponse);

            const couponNameResponse = quizHelper.validateCouponName(
                couponName,
            );
            if (couponNameResponse.error)
                return quizHelper.quizErrorHandler(couponNameResponse);

            let questionsResponse = quizHelper.validateQuestions(questions);
            if (questionsResponse.error)
                return quizHelper.quizErrorHandler(questionsResponse);

            questionsResponse = await quizModule.uploadImagesOnBucket(
                title,
                questions,
            );
            if (questionsResponse.error)
                return quizHelper.quizErrorHandler(questionsResponse);

            const quizCreatedResponse = await quizModule.createQuiz(userId, {
                title: titleResponse.result,
                message,
                questions: questionsResponse.result,
                enable,
                questionTime: questionTimeResponse.result,
                discountPercentage: discountPercentageResponse.result,
                couponName: couponNameResponse.result,
            });
            if (quizCreatedResponse.error)
                return quizHelper.quizErrorHandler(quizCreatedResponse);

            return { result: quizCreatedResponse.result };
        } catch (error) {
            return { error: 'CREATE_QUIZ_ERROR', data: error };
        }
    };

    const updateQuiz = async (
        quizId,
        {
            title,
            message,
            questions,
            enable,
            questionTime,
            discountPercentage,
            couponName,
        },
    ) => {
        try {
            const titleResponse = quizHelper.validateTitle(title);
            if (titleResponse.error)
                return quizHelper.quizErrorHandler(titleResponse);

            const questionTimeResponse = quizHelper.validateQuestionTime(
                questionTime,
            );
            if (questionTimeResponse.error)
                return quizHelper.quizErrorHandler(questionTimeResponse);

            const discountPercentageResponse = quizHelper.validateDiscountPercentage(
                discountPercentage,
            );
            if (discountPercentageResponse.error)
                return quizHelper.quizErrorHandler(discountPercentageResponse);

            const couponNameResponse = quizHelper.validateCouponName(
                couponName,
            );
            if (couponNameResponse.error)
                return quizHelper.quizErrorHandler(couponNameResponse);

            let questionsResponse = quizHelper.validateQuestions(questions);
            if (questionsResponse.error)
                return quizHelper.quizErrorHandler(questionsResponse);

            questionsResponse = await quizModule.uploadImagesOnBucket(
                title,
                questions,
            );
            if (questionsResponse.error)
                return quizHelper.quizErrorHandler(questionsResponse);

            const quizUpdatedResponse = await quizModule.updateQuiz(quizId, {
                title: titleResponse.result,
                message,
                questions: questionsResponse.result,
                enable,
                questionTime: questionTimeResponse.result,
                discountPercentage: discountPercentageResponse.result,
                couponName: couponNameResponse.result,
            });
            if (quizUpdatedResponse.error)
                return quizHelper.quizErrorHandler(quizUpdatedResponse);

            return { result: quizUpdatedResponse.result };
        } catch (error) {
            return { error: 'UPDATE_QUIZ_ERROR', data: error };
        }
    };

    const getQuizByCreator = async (userId) => {
        const response = await quizModule.getQuizByCreator(userId);
        if (response.error) return quizHelper.quizErrorHandler(response);
        return response;
    };

    const getQuizById = async (quizId) => {
        const response = await quizModule.getQuizById(quizId);
        if (response.error) return quizHelper.quizErrorHandler(response);
        return response;
    };

    const getMessageAndTitleByQuizId = async (quizId) => {
        const response = await quizModule.getMessageAndTitleByQuizId(quizId);
        if (response.error) return quizHelper.quizErrorHandler(response);
        return response;
    };

    const getEnabledQuizById = async (quizId) => {
        const response = await quizModule.getEnabledQuizById(quizId);
        if (response.error) return quizHelper.quizErrorHandler(response);
        return response;
    };

    const getAllQuiz = async () => {
        const response = await quizModule.getAllQuiz();
        if (response.error) return quizHelper.quizErrorHandler(response);
        return response;
    };

    const removeByQuizId = async (quizId) => {
        const response = await quizModule.removeByQuizId(quizId);
        if (response.error) return quizHelper.quizErrorHandler(response);
        return response;
    };

    module.exports = {
        createQuiz,
        updateQuiz,
        getQuizByCreator,
        getQuizById,
        getMessageAndTitleByQuizId,
        getEnabledQuizById,
        getAllQuiz,
        removeByQuizId,
    };
})();
