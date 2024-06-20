'use strict';

const _ = require('lodash');

const isValidEmail = ({ quizId, quizAnswers }) => {
    try {
        const hasNotQuizAnswered = quizAnswers.filter((quizAnswer) => {
            return quizAnswer && quizAnswer.quiz
                ? quizAnswer.quiz._id.toString() === quizId.toString()
                : false;
        }).length;
        if (hasNotQuizAnswered) return { result: false };
        return { result: true };
    } catch (error) {
        return { error: 'VALIDATION_EMAIL_QUIZ_ANSWER_ERROR', data: error };
    }
};

const getTotalQuestions = (answers) => {
    const totalQuestions = answers.length;
    return { result: totalQuestions };
};

const getHitsNumber = (answers) => {
    const hitsNumber = answers.reduce(
        (total, answer) =>
            answer.rightAnswer === answer.userAnswer ? total + 1 : total,
        0,
    );
    return { result: hitsNumber };
};

const validateHitsNumber = (totalQuestions, hitsNumber) => {
    if (hitsNumber > totalQuestions)
        return { error: 'INVALID_HITS_NUMBER_QUIZ_ANSWER_ERROR', data: null };
    return { result: true };
};

const validateAnswers = (answers) => {
    try {
        let messageError = null;
        for (let answer of answers) {
            if (!answer.question || typeof answer.question != 'string') {
                messageError = 'INVALID_QUESTION_QUIZ_ANSWER_ERROR';
                break;
            }
            if (!Array.isArray(answer.answers) || !answer.answers.length) {
                messageError = 'INVALID_ANSWERS_QUIZ_ANSWER_ERROR';
                break;
            }
            if (!answer.rightAnswer || typeof answer.rightAnswer != 'string') {
                messageError = 'INVALID_RIGHT_ANSWER_QUIZ_ANSWER_ERROR';
                break;
            }
            if (!answer.imageURL || typeof answer.imageURL != 'string') {
                messageError = 'INVALID_IMAGE_QUIZ_ANSWER_ERROR';
                break;
            }
            if (!answer.userAnswer || typeof answer.userAnswer != 'string') {
                messageError = 'INVALID_USER_ANSWER_QUIZ_ANSWER_ERROR';
                break;
            }
        }

        if (typeof messageError === 'string')
            return { error: messageError, data: null };
        return { result: answers };
    } catch (error) {
        return { error: 'VALIDATION_ANSWERS_QUIZ_ANSWER_ERROR', data: error };
    }
};

const randomString = (length) => {
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return [...new Array(length)].reduce(
        (result) =>
            result +
            characters.charAt(Math.floor(Math.random() * characters.length)),
        '',
    );
};

const generateCouponName = (title) => {
    const snakeCaseTitle = title.split(' ').join('_');
    const randomCode = randomString(4);

    return `${snakeCaseTitle}_${randomCode}`.toUpperCase();
};

const getValueOfDiscountPercentage = (hitsNumber, discountPercentage) =>
    parseFloat(hitsNumber * discountPercentage);

const getDataOfFacebookObject = ({ shared }) => {
    return {
        shared: !!shared,
        time: new Date(),
    };
};

const getDTOData = (quizAnswers, payments) => {
    try {
        quizAnswers.forEach((quizAnswer) => (quizAnswer.readyBought = false));

        if (!payments || payments.length === 0) return { result: quizAnswers };

        payments.forEach((payment) => {
            const documentsFounded = _.remove(
                quizAnswers,
                (quizAnswer) => quizAnswer.coupon.code === payment.coupon.code,
            );
            documentsFounded.forEach(
                (quizAnswer) => (quizAnswer.readyBought = true),
            );
            quizAnswers = quizAnswers.concat(documentsFounded);
        });

        quizAnswers = _.orderBy(quizAnswers, ['createdAt'], ['desc']);

        return { result: quizAnswers };
    } catch (_error) {
        return {
            error: 'GET_DTO_DATA_ERROR_QUIZ_ANSWER',
            data: { quizAnswers, payments },
        };
    }
};

const quizAnswerErrorHandler = (errorObject) => {
    console.log('Error ==> ' + errorObject.error);
    console.log('Data object error ==> ' + errorObject.data);

    switch (errorObject.error) {
        case 'CREATE_MODEL_QUIZ_ANSWER_ERROR':
        case 'CREATE_COUPON_QUIZ_ANSWER_ERROR':
            return { error: 'CREATE_QUIZ_ANSWER_ERROR' };

        case 'UPDATE_FACEBOOK_DATA_ON_MODEL_QUIZ_ANSWER_ERROR':
            return { error: 'UPDATE_QUIZ_ANSWER_ERROR' };

        case 'VALIDATION_EMAIL_QUIZ_ANSWER_ERROR':
            return { error: 'VALIDATE_EMAIL_QUIZ_ANSWER_ERROR' };

        case 'VALIDATION_ANSWERS_QUIZ_ANSWER_ERROR':
            return { error: 'VALIDATION_QUIZ_ANSWER_ERROR' };

        case 'GET_DTO_DATA_ERROR_QUIZ_ANSWER':
            return { error: 'GET_ALL_QUIZ_ANSWER_ERROR' };

        default:
            return errorObject;
    }
};

module.exports = {
    isValidEmail,
    getTotalQuestions,
    getHitsNumber,
    validateHitsNumber,
    validateAnswers,
    generateCouponName,
    quizAnswerErrorHandler,
    getValueOfDiscountPercentage,
    getDataOfFacebookObject,
    getDTOData,
};
