'use strict';

const {
    INVALID_PARAMS,
    INTERNAL_SERVER_ERROR_MESSAGE,
} = require('../../constants/message/system.error.message');
const QUIZ_ERRORS = require('../../constants/message/quiz.errors.message');
const USER_ERRORS = require('../../constants/message/user/user.error.message');

module.exports.errorHandler = (error, ResponseStatusEnum) => {
    switch (error) {
        case 'INVALID_PARAMS':
            return {
                status: ResponseStatusEnum(405),
                msg: INVALID_PARAMS,
            };
        case 'INVALID_USER':
            return {
                status: ResponseStatusEnum(401),
                msg: USER_ERRORS.INVALID_USER,
            };

        case 'CREATE_QUIZ_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg: QUIZ_ERRORS.CREATE_QUIZ_ERROR,
            };

        case 'INVALID_ANSWERS_QUIZ_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg: QUIZ_ERRORS.INVALID_ANSWERS_QUIZ_ERROR,
            };

        case 'INVALID_EXPLANATION_QUIZ_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg: QUIZ_ERRORS.INVALID_EXPLANATION_QUIZ_ERROR,
            };

        case 'INVALID_QUESTION_QUIZ_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg: QUIZ_ERRORS.INVALID_QUESTION_QUIZ_ERROR,
            };

        case 'INVALID_RIGHT_ANSWER_QUIZ_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg: QUIZ_ERRORS.INVALID_RIGHT_ANSWER_QUIZ_ERROR,
            };

        case 'INVALID_TITLE_TYPE_QUIZ':
            return {
                status: ResponseStatusEnum(401),
                msg: QUIZ_ERRORS.INVALID_TITLE_TYPE_QUIZ,
            };

        case 'INVALID_COUPON_NAME_TYPE_QUIZ':
            return {
                status: ResponseStatusEnum(401),
                msg: QUIZ_ERRORS.INVALID_COUPON_NAME_TYPE_QUIZ,
            };

        case 'INVALID_QUESTION_TIME_QUIZ':
            return {
                status: ResponseStatusEnum(401),
                msg: QUIZ_ERRORS.INVALID_QUESTION_TIME_QUIZ,
            };

        case 'INVALID_DISCOUNT_PERCENTAGE_QUIZ':
            return {
                status: ResponseStatusEnum(401),
                msg: QUIZ_ERRORS.INVALID_DISCOUNT_PERCENTAGE_QUIZ,
            };

        case 'INVALID_IMAGE_QUIZ_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg: QUIZ_ERRORS.INVALID_IMAGE_QUIZ_ERROR,
            };

        case 'GET_QUIZ_BY_ID_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg: QUIZ_ERRORS.GET_QUIZ_BY_ID_ERROR,
            };

        case 'GET_MESSAGE_AND_TITLE_BY_QUIZ_ID_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg: QUIZ_ERRORS.GET_MESSAGE_AND_TITLE_BY_QUIZ_ID_ERROR,
            };

        case 'REMOVE_QUIZ_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg: QUIZ_ERRORS.REMOVE_QUIZ_ERROR,
            };

        default:
            return {
                status: ResponseStatusEnum(500),
                msg: INTERNAL_SERVER_ERROR_MESSAGE,
            };
    }
};
