'use strict';

const {
    INVALID_PARAMS,
    INTERNAL_SERVER_ERROR_MESSAGE,
} = require('../../constants/message/system.error.message');
const CONTROL_USER_NAVIGATION = require('../../constants/message/user/control.user.navigation.messages');

module.exports.errorHandlerControlUserNavigation = (
    error,
    ResponseStatusEnum,
) => {
    switch (error) {
        case 'INVALID_PARAMS':
            return {
                status: ResponseStatusEnum(405),
                msg: INVALID_PARAMS,
            };
        case 'CREATE_CONTROL_USER_NAVIGATION_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg:
                    CONTROL_USER_NAVIGATION.CREATE_CONTROL_USER_NAVIGATION_ERROR,
            };
        case 'UPDATE_CONTROL_USER_NAVIGATION_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg:
                    CONTROL_USER_NAVIGATION.UPDATE_CONTROL_USER_NAVIGATION_ERROR,
            };
        case 'GET_CONTROL_USER_NAVIGATION_BY_USER_ID_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg:
                    CONTROL_USER_NAVIGATION.GET_CONTROL_USER_NAVIGATION_BY_USER_ID_ERROR,
            };
        default:
            return {
                status: ResponseStatusEnum(500),
                msg: INTERNAL_SERVER_ERROR_MESSAGE,
            };
    }
};
