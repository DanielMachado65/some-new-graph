'use strict';

const {
    INVALID_PARAMS,
    INTERNAL_SERVER_ERROR_MESSAGE,
} = require('../../constants/message/system.error.message');
const FEEDBACK_ERRORS = require('../../constants/message/user/feedback.messages');

module.exports.errorHandler = (error, ResponseStatusEnum) => {
    switch (error) {
        case 'INVALID_PARAMS':
            return {
                status: ResponseStatusEnum(405),
                msg: INVALID_PARAMS,
            };
        case 'CREATE_FEEDBACK_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg: FEEDBACK_ERRORS.CREATE_FEEDBACK_ERROR,
            };

        case 'INVALID_DESCRIPTION_FEEDBACK_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg: FEEDBACK_ERRORS.INVALID_DESCRIPTION_FEEDBACK_ERROR,
            };

        case 'INVALID_EVALUATION_FEEDBACK_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg: FEEDBACK_ERRORS.INVALID_EVALUATION_FEEDBACK_ERROR,
            };

        case 'GET_ALL_FEEDBACK_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg: FEEDBACK_ERRORS.GET_ALL_FEEDBACK_ERROR,
            };

        case 'GET_BY_ID_FEEDBACK_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg: FEEDBACK_ERRORS.GET_BY_ID_FEEDBACK_ERROR,
            };

        case 'GET_BY_USER_ID_FEEDBACK_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg: FEEDBACK_ERRORS.GET_BY_USER_ID_FEEDBACK_ERROR,
            };

        case 'REMOVE_FEEDBACK_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg: FEEDBACK_ERRORS.REMOVE_FEEDBACK_ERROR,
            };

        default:
            return {
                status: ResponseStatusEnum(500),
                msg: INTERNAL_SERVER_ERROR_MESSAGE,
            };
    }
};
