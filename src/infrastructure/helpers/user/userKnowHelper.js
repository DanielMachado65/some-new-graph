'use strict';

const validateName = (name) => {
    try {
        const isNotValid = typeof name != 'string';
        if (isNotValid)
            return { error: 'INVALID_NAME_TYPE_USER_KNOW', data: name };
        return { result: name };
    } catch (error) {
        return { error: 'VALIDATION_NAME_USER_KNOW_ERROR', data: error };
    }
};

const validateDocument = (document) => {
    try {
        const isNotValid =
            typeof document != 'string' ||
            (document.length != 11 && document.length != 14);
        if (isNotValid)
            return { error: 'INVALID_DOCUMENT_TYPE_USER_KNOW', data: document };
        return { result: document };
    } catch (error) {
        return { error: 'VALIDATION_DOCUMENT_USER_KNOW_ERROR', data: error };
    }
};

const validateEmail = (email, isEmailExists) => {
    try {
        if (isEmailExists)
            return {
                error: 'EMAIL_ALREADY_EXISTS_USER_KNOW_VALIDATION',
                data: email,
            };
        if (typeof email != 'string')
            return { error: 'INVALID_EMAIL_TYPE_USER_KNOW', data: email };
        return { result: email };
    } catch (error) {
        return { error: 'VALIDATION_EMAIL_USER_KNOW_ERROR', data: error };
    }
};

const validatePhoneNumber = (phoneNumber) => {
    try {
        const isNotValid = typeof phoneNumber != 'string';
        if (isNotValid)
            return {
                error: 'INVALID_PHONE_NUMBER_TYPE_USER_KNOW',
                data: phoneNumber,
            };
        return { result: phoneNumber };
    } catch (error) {
        return {
            error: 'VALIDATION_PHONE_NUMBER_USER_KNOW_ERROR',
            data: error,
        };
    }
};

const validateAddress = (address) => {
    try {
        if (typeof address != 'object')
            return { error: 'INVALID_ADDRESS_TYPE_USER_KNOW', data: address };

        if (typeof address.uf != 'string')
            return {
                error: 'INVALID_ADDRESS_UF_TYPE_USER_KNOW',
                data: address.uf,
            };

        return { result: address };
    } catch (error) {
        return { error: 'VALIDATION_ADDRESS_USER_KNOW_ERROR', data: error };
    }
};

const errorHandler = async (errorObject) => {
    console.log('Error ==> ' + errorObject.error);
    console.log('Object error ==> ' + errorObject.data);

    switch (errorObject.error) {
        case 'CREATE_MODEL_USER_KNOW_ERROR':
            return { error: 'CREATE_USER_KNOW_ERROR' };

        case 'VALIDATION_NAME_USER_KNOW_ERROR':
        case 'VALIDATION_DOCUMENT_USER_KNOW_ERROR':
        case 'VALIDATION_EMAIL_USER_KNOW_ERROR':
        case 'VALIDATION_PHONE_NUMBER_USER_KNOW_ERROR':
        case 'VALIDATION_ADDRESS_USER_KNOW_ERROR':
            return { error: 'VALIDATION_USER_KNOW_ERROR' };

        default:
            return errorObject;
    }
};

module.exports = {
    validateName,
    validateDocument,
    validateEmail,
    errorHandler,
    validatePhoneNumber,
    validateAddress,
};
