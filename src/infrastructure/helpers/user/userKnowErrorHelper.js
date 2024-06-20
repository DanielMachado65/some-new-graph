'use strict';

const {
    INVALID_PARAMS,
    INTERNAL_SERVER_ERROR_MESSAGE,
} = require('../../constants/message/system.error.message');
const USER_KNOW_ERRORS = require('../../constants/message/user/user.know.errors.message');

module.exports.errorHandler = (error, ResponseStatusEnum) => {
    switch (error) {
        case 'INVALID_PARAMS':
            return {
                status: ResponseStatusEnum(405),
                msg: INVALID_PARAMS,
            };

        case 'CREATE_USER_KNOW_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg: USER_KNOW_ERRORS.CREATE_USER_KNOW_ERROR,
            };

        case 'VALIDATION_USER_KNOW_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg: USER_KNOW_ERRORS.VALIDATION_USER_KNOW_ERROR,
            };

        case 'INVALID_NAME_TYPE_USER_KNOW':
            return {
                status: ResponseStatusEnum(401),
                msg: USER_KNOW_ERRORS.INVALID_NAME_TYPE_USER_KNOW,
            };

        case 'INVALID_DOCUMENT_TYPE_USER_KNOW':
            return {
                status: ResponseStatusEnum(401),
                msg: USER_KNOW_ERRORS.INVALID_DOCUMENT_TYPE_USER_KNOW,
            };

        case 'INVALID_EMAIL_TYPE_USER_KNOW':
            return {
                status: ResponseStatusEnum(401),
                msg: USER_KNOW_ERRORS.INVALID_EMAIL_TYPE_USER_KNOW,
            };

        case 'INVALID_PHONE_NUMBER_TYPE_USER_KNOW':
            return {
                status: ResponseStatusEnum(401),
                msg: USER_KNOW_ERRORS.INVALID_PHONE_NUMBER_TYPE_USER_KNOW,
            };

        case 'INVALID_ADDRESS_TYPE_USER_KNOW':
            return {
                status: ResponseStatusEnum(401),
                msg: USER_KNOW_ERRORS.INVALID_ADDRESS_TYPE_USER_KNOW,
            };

        case 'INVALID_ADDRESS_UF_TYPE_USER_KNOW':
            return {
                status: ResponseStatusEnum(401),
                msg: USER_KNOW_ERRORS.INVALID_ADDRESS_UF_TYPE_USER_KNOW,
            };

        case 'GET_ALL_USER_KNOW_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg: USER_KNOW_ERRORS.GET_ALL_USER_KNOW_ERROR,
            };

        case 'EMAIL_ALREADY_EXISTS_USER_KNOW_VALIDATION':
            return {
                status: ResponseStatusEnum(401),
                msg: USER_KNOW_ERRORS.EMAIL_ALREADY_EXISTS_USER_KNOW_VALIDATION,
            };

        default:
            return {
                status: ResponseStatusEnum(500),
                msg: INTERNAL_SERVER_ERROR_MESSAGE,
            };
    }
};
