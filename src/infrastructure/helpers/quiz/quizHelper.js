'use strict';

const validateTitle = (title) => {
    try {
        const isNotValid = typeof title != 'string';
        if (isNotValid)
            return { error: 'INVALID_TITLE_TYPE_QUIZ', data: title };
        return { result: title };
    } catch (error) {
        return { error: 'VALIDATION_TITLE_QUIZ_ERROR', data: error };
    }
};

const validateCouponName = (couponName) => {
    try {
        const isNotValid = typeof couponName != 'string';
        if (isNotValid)
            return { error: 'INVALID_COUPON_NAME_TYPE_QUIZ', data: couponName };
        return { result: couponName };
    } catch (error) {
        return { error: 'VALIDATION_COUPON_NAME_QUIZ_ERROR', data: error };
    }
};

const validateQuestionTime = (questionTime) => {
    try {
        const isNotValid = typeof questionTime != 'number' || questionTime <= 0;
        if (isNotValid)
            return { error: 'INVALID_QUESTION_TIME_QUIZ', data: questionTime };
        return { result: questionTime };
    } catch (error) {
        return { error: 'VALIDATION_QUESTION_TIME_QUIZ_ERROR', data: error };
    }
};

const validateDiscountPercentage = (discountPercentage) => {
    try {
        const isNotValid =
            typeof discountPercentage != 'number' || discountPercentage <= 0;
        if (isNotValid)
            return {
                error: 'INVALID_DISCOUNT_PERCENTAGE_QUIZ',
                data: discountPercentage,
            };
        return { result: discountPercentage };
    } catch (error) {
        return {
            error: 'VALIDATION_DISCOUNT_PERCENTAGE_QUIZ_ERROR',
            data: error,
        };
    }
};

const validateQuestions = (questions) => {
    try {
        let messageError = null;
        for (let question of questions) {
            if (!question.question || typeof question.question != 'string') {
                messageError = 'INVALID_QUESTION_QUIZ_ERROR';
                break;
            }
            if (
                !question.rightAnswer ||
                typeof question.rightAnswer != 'string'
            ) {
                messageError = 'INVALID_RIGHT_ANSWER_QUIZ_ERROR';
                break;
            }
            if (!Array.isArray(question.answers) || !question.answers.length) {
                messageError = 'INVALID_ANSWERS_QUIZ_ERROR';
                break;
            }
            if (
                !question.imageURL ||
                (typeof question.imageURL != 'object' &&
                    typeof question.imageURL != 'string')
            ) {
                messageError = 'INVALID_IMAGE_QUIZ_ERROR';
                break;
            }
        }

        if (typeof messageError === 'string')
            return { error: messageError, data: null };
        return { result: questions };
    } catch (error) {
        return { error: 'VALIDATION_QUESTIONS_QUIZ_ERROR', data: error };
    }
};

const quizErrorHandler = async (errorObject) => {
    console.log('Error ==> ' + errorObject.error);
    console.log('Object error ==> ' + errorObject.data);

    switch (errorObject.error) {
        case 'INVALID_USER_ERROR':
            return { error: 'INVALID_USER' };

        case 'CREATE_MODEL_QUIZ_ERROR':
            return { error: 'CREATE_QUIZ_ERROR' };

        case 'UPDATE_MODEL_QUIZ_ERROR':
            return { error: 'UPDATE_QUIZ_ERROR' };

        case 'INVALID_TYPE_IMAGE_QUIZ_ERROR':
        case 'UPLOAD_QUESTIONS_IMAGES_QUIZ_ERROR':
            return { error: 'INVALID_IMAGE_QUIZ_ERROR' };

        case 'VALIDATION_QUESTIONS_QUIZ_ERROR':
        case 'VALIDATION_TITLE_QUIZ_ERROR':
        case 'VALIDATION_QUESTION_TIME_QUIZ_ERROR':
        case 'VALIDATION_DISCOUNT_PERCENTAGE_QUIZ_ERROR':
        case 'VALIDATION_COUPON_NAME_QUIZ_ERROR':
            return { error: 'VALIDATION_QUIZ_ERROR' };

        default:
            return errorObject;
    }
};

module.exports = {
    validateTitle,
    validateCouponName,
    validateQuestions,
    quizErrorHandler,
    validateQuestionTime,
    validateDiscountPercentage,
};
