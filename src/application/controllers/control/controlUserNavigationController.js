'use strict';

const ControlUserNavigationModule = require('../../../domain/control/controlUserNavigationModule');
const {
    validatePhoneNumberData,
    errorHandler,
} = require('../../../infrastructure/helpers/control/controlUserNavigationHelper');
const { getUserById } = require('../../../domain/user/user/userModule');

const createControlUserNavigation = async (userId, data) => {
    try {
        const userExists = await getUserById(userId);
        if (!userExists) return { error: 'USER_DOES_NOT_EXISTS', data: null };

        const userControlNavigationResponse = await ControlUserNavigationModule.createControlUserNavigation(
            userId,
            data,
        );
        if (userControlNavigationResponse.error)
            return errorHandler(userControlNavigationResponse);

        return { result: 'ok' };
    } catch (error) {
        return { error: 'CREATE_CONTROL_USER_NAVIGATION_ERROR', data: error };
    }
};

const updateDialogPhoneNumberByUserId = async (userId, data) => {
    try {
        const dataValidationResponse = await validatePhoneNumberData(data);
        if (dataValidationResponse.error)
            return errorHandler(dataValidationResponse);

        const indicateResponse = await ControlUserNavigationModule.updateDialogPhoneNumberByUserId(
            userId,
            data,
        );
        if (indicateResponse.error) return errorHandler(indicateResponse);

        return { result: indicateResponse };
    } catch (error) {
        return { error: 'UPDATE_CONTROL_USER_NAVIGATION_ERROR', data: error };
    }
};

const getByUserId = async (clientId) => {
    const response = await ControlUserNavigationModule.getByUserId(clientId);
    if (response.error) return errorHandler(response);
    return response;
};

module.exports = {
    createControlUserNavigation,
    updateDialogPhoneNumberByUserId,
    getByUserId,
};
