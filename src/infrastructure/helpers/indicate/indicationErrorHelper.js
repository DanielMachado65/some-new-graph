'use strict';

const {
    INVALID_PARAMS,
    INTERNAL_SERVER_ERROR_MESSAGE,
} = require('../../constants/message/system.error.message');
const INDICATION_ERRORS = require('../../constants/message/user/indication.errors.message');

module.exports.errorHandler = (error, ResponseStatusEnum) => {
    switch (error) {
        case 'INVALID_PARAMS':
            return {
                status: ResponseStatusEnum(405),
                msg: INVALID_PARAMS,
            };
        case 'CREATE_INDICATION_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg: INDICATION_ERRORS.CREATE_INDICATION_ERROR,
            };
        case 'UPDATE_INDICATION_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg: INDICATION_ERRORS.UPDATE_INDICATION_ERROR,
            };
        case 'INVALID_CLIENTE_INDICATION_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg: INDICATION_ERRORS.INVALID_CLIENTE_INDICATION_ERROR,
            };
        case 'INVALID_INDICATOR_INDICATION_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg: INDICATION_ERRORS.INVALID_INDICATOR_INDICATION_ERROR,
            };
        case 'INVALID_INDICATE_TEMPLATE_INDICATION_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg:
                    INDICATION_ERRORS.INVALID_INDICATE_TEMPLATE_INDICATION_ERROR,
            };
        case 'INVALID_PAYMENT_INDICATION_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg: INDICATION_ERRORS.INVALID_PAYMENT_INDICATION_ERROR,
            };
        case 'GET_ALL_INDICATION_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg: INDICATION_ERRORS.GET_ALL_INDICATION_ERROR,
            };
        case 'GET_INDICATION_BY_ID_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg: INDICATION_ERRORS.GET_INDICATION_BY_ID_ERROR,
            };
        case 'GET_INDICATION_BY_INDICATOR_ID_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg: INDICATION_ERRORS.GET_INDICATION_BY_INDICATOR_ID_ERROR,
            };
        case 'GET_INDICATION_BY_CLIENT_ID_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg: INDICATION_ERRORS.GET_INDICATION_BY_CLIENT_ID_ERROR,
            };
        case 'GET_INDICATION_BY_INDICATE_TEMPLATE_ID_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg:
                    INDICATION_ERRORS.GET_INDICATION_BY_INDICATE_TEMPLATE_ID_ERROR,
            };
        case 'GET_INDICATION_BY_PAYMENT_ID_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg: INDICATION_ERRORS.GET_INDICATION_BY_PAYMENT_ID_ERROR,
            };
        default:
            return {
                status: ResponseStatusEnum(500),
                msg: INTERNAL_SERVER_ERROR_MESSAGE,
            };
    }
};
