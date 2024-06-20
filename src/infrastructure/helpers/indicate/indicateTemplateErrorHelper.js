'use strict';

const {
    INVALID_PARAMS,
    INTERNAL_SERVER_ERROR_MESSAGE,
} = require('../../constants/message/system.error.message');
const INDICATE_TEMPLATE_ERRORS = require('../../constants/message/user/indicate.template.error.message');

module.exports.errorHandler = (error, ResponseStatusEnum) => {
    switch (error) {
        case 'INVALID_PARAMS':
            return {
                status: ResponseStatusEnum(405),
                msg: INVALID_PARAMS,
            };
        case 'CREATE_INDICATE_TEMPLATE_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg: INDICATE_TEMPLATE_ERRORS.CREATE_INDICATE_TEMPLATE_ERROR,
            };
        case 'INVALID_TITLE_INDICATE_TEMPLATE_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg:
                    INDICATE_TEMPLATE_ERRORS.INVALID_TITLE_INDICATE_TEMPLATE_ERROR,
            };
        case 'INVALID_DESCRIPTION_INDICATE_TEMPLATE_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg:
                    INDICATE_TEMPLATE_ERRORS.INVALID_DESCRIPTION_INDICATE_TEMPLATE_ERROR,
            };
        case 'INVALID_STATUS_INDICATE_TEMPLATE_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg:
                    INDICATE_TEMPLATE_ERRORS.INVALID_STATUS_INDICATE_TEMPLATE_ERROR,
            };
        case 'INVALID_TEXT_TO_SHARE_INDICATE_TEMPLATE_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg:
                    INDICATE_TEMPLATE_ERRORS.INVALID_DATA_TO_SHARE_INDICATE_TEMPLATE_ERROR,
            };
        case 'INVALID_COMMISSION_INDICATE_TEMPLATE_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg:
                    INDICATE_TEMPLATE_ERRORS.INVALID_COMMISSION_INDICATE_TEMPLATE_ERROR,
            };
        case 'INVALID_PERCENTAGE_INDICATE_TEMPLATE_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg:
                    INDICATE_TEMPLATE_ERRORS.INVALID_PERCENTAGE_INDICATE_TEMPLATE_ERROR,
            };
        case 'INVALID_VERSION_INDICATE_TEMPLATE_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg:
                    INDICATE_TEMPLATE_ERRORS.INVALID_VERSION_INDICATE_TEMPLATE_ERROR,
            };
        case 'GET_ALL_INDICATE_TEMPLATE_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg: INDICATE_TEMPLATE_ERRORS.GET_ALL_INDICATE_TEMPLATE_ERROR,
            };
        case 'GET_INDICATE_TEMPLATE_BY_ID_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg: INDICATE_TEMPLATE_ERRORS.GET_INDICATE_TEMPLATE_BY_ID_ERROR,
            };

        case 'GET_INDICATE_TEMPLATE_BY_CREATOR_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg:
                    INDICATE_TEMPLATE_ERRORS.GET_INDICATE_TEMPLATE_BY_CREATOR_ERROR,
            };

        case 'GET_INDICATE_TEMPLATE_ENABLED_BY_ID_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg:
                    INDICATE_TEMPLATE_ERRORS.GET_INDICATE_TEMPLATE_ENABLED_BY_ID_ERROR,
            };

        case 'DEACTIVATE_ALL_INDICATE_TEMPLATE_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg:
                    INDICATE_TEMPLATE_ERRORS.DEACTIVATE_ALL_INDICATE_TEMPLATE_ERROR,
            };

        case 'GET_LAST_VERSION_INDICATE_TEMPLATE_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg:
                    INDICATE_TEMPLATE_ERRORS.GET_LAST_VERSION_INDICATE_TEMPLATE_ERROR,
            };
        default:
            return {
                status: ResponseStatusEnum(500),
                msg: INTERNAL_SERVER_ERROR_MESSAGE,
            };
    }
};
