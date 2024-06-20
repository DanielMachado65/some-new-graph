'use strict';

const { isNumber } = require('../../utils/dataTypeValidation');

const validatePhoneNumberData = ({ timesClosed }) => {
    if (timesClosed && !isNumber(timesClosed))
        return { error: 'INVALID_CLIENTE_INDICATION_ERROR', data: timesClosed };
    return { result: { timesClosed } };
};

const errorHandler = (errorObject) => {
    console.log('Error ==> ' + errorObject.error);
    console.log('Data object error ==> ' + errorObject.data);

    switch (errorObject.error) {
        case 'CREATE_MODEL_CONTROL_USER_NAVIGATION_ERROR':
            return { error: 'CREATE_CONTROL_USER_NAVIGATION_ERROR' };

        case 'UPDATE_MODEL_CONTROL_USER_NAVIGATION_ERROR':
            return { error: 'UPDATE_CONTROL_USER_NAVIGATION_ERROR' };

        default:
            return errorObject;
    }
};

module.exports = {
    validatePhoneNumberData,
    errorHandler,
};
