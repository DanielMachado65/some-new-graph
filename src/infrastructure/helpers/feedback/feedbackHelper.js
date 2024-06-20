'use strict';

const isValidDescription = ({ description }) => {
    return typeof description === 'string';
};

const isValidEvaluation = ({ evaluation }) => {
    return typeof evaluation === 'number';
};

const validateAllData = (data) => {
    if (!isValidDescription(data))
        return { error: 'INVALID_DESCRIPTION_FEEDBACK_ERROR' };
    if (!isValidEvaluation(data))
        return { error: 'INVALID_EVALUATION_FEEDBACK_ERROR' };
    return { result: data };
};

const feedbackErrorHandler = (errorObject) => {
    console.log('Error ==> ' + errorObject.error);
    console.log('Data object error ==> ' + errorObject.data);

    switch (errorObject.error) {
        case 'CREATE_MODEL_FEEDBACK_ERROR':
            return { error: 'CREATE_FEEDBACK_ERROR' };

        default:
            return errorObject;
    }
};

module.exports = {
    validateAllData,
    feedbackErrorHandler,
};
