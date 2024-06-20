'use strict';

const { isString } = require('../../utils/dataTypeValidation');

const validateAllData = ({ client, indicator, indicateTemplate, payment }) => {
    if (client && !isString(client))
        return { error: 'INVALID_CLIENTE_INDICATION_ERROR', data: client };
    if (indicator && !isString(indicator))
        return { error: 'INVALID_INDICATOR_INDICATION_ERROR', data: indicator };
    if (indicateTemplate && !isString(indicateTemplate))
        return {
            error: 'INVALID_INDICATE_TEMPLATE_INDICATION_ERROR',
            data: indicateTemplate,
        };
    if (payment && !isString(payment))
        return { error: 'INVALID_PAYMENT_INDICATION_ERROR', data: payment };
    return { result: { client, indicator, indicateTemplate, payment } };
};

const indicationErrorHandler = (errorObject) => {
    console.log('Error ==> ' + errorObject.error);
    console.log('Data object error ==> ' + errorObject.data);

    switch (errorObject.error) {
        case 'CREATE_MODEL_INDICATION_ERROR':
            return { error: 'CREATE_INDICATION_ERROR' };

        case 'UPDATE_MODEL_INDICATION_ERROR':
            return { error: 'UPDATE_INDICATION_ERROR' };

        default:
            return errorObject;
    }
};

module.exports = {
    validateAllData,
    indicationErrorHandler,
};
