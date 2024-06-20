'use strict';

const {
    isString,
    isNumber,
    isObject,
} = require('../../utils/dataTypeValidation');

const validateAllData = ({
    title,
    description,
    status,
    dataToShare,
    commission,
    percentage,
    version,
}) => {
    if (title && !isString(title))
        return { error: 'INVALID_TITLE_INDICATE_TEMPLATE_ERROR', data: title };
    if (description && !isString(description))
        return {
            error: 'INVALID_DESCRIPTION_INDICATE_TEMPLATE_ERROR',
            data: description,
        };
    if (status && !isObject(dataToShare))
        return {
            error: 'INVALID_DATA_TO_SHARE_INDICATE_TEMPLATE_ERROR',
            data: dataToShare,
        };
    if (commission && !isNumber(commission))
        return {
            error: 'INVALID_COMMISSION_INDICATE_TEMPLATE_ERROR',
            data: commission,
        };
    if (percentage && !isNumber(percentage))
        return {
            error: 'INVALID_PERCENTAGE_INDICATE_TEMPLATE_ERROR',
            data: percentage,
        };
    if (version && !isNumber(version))
        return {
            error: 'INVALID_VERSION_INDICATE_TEMPLATE_ERROR',
            data: version,
        };
    return {
        result: {
            title,
            description,
            status,
            dataToShare,
            commission,
            percentage,
            version,
        },
    };
};

const getObjectToCreate = (data, lastVersionData) => {
    try {
        const hasLastVersion = lastVersionData && lastVersionData.version;
        data.version = hasLastVersion
            ? parseFloat((lastVersionData.version + 0.1).toFixed(1))
            : 1;
        data.status = true;
        return { result: data };
    } catch (_error) {
        return {
            error: 'CREATE_OBJECT_TO_SAVE_INDICATE_TEMPLATE_ERROR',
            data: _error,
        };
    }
};

const indicateErrorHandler = (errorObject) => {
    console.log('Error ==> ' + errorObject.error);
    console.log('Data object error ==> ' + errorObject.data);

    switch (errorObject.error) {
        case 'CREATE_MODEL_INDICATE_TEMPLATE_ERROR':
        case 'CREATE_OBJECT_TO_SAVE_INDICATE_TEMPLATE_ERROR_':
            return { error: 'CREATE_INDICATE_TEMPLATE_ERROR' };

        default:
            return errorObject;
    }
};

module.exports = {
    validateAllData,
    getObjectToCreate,
    indicateErrorHandler,
};
