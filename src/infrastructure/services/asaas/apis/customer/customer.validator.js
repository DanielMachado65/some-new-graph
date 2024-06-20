'use strict';

const { CustomerErrorHandler } = require('./customerError.handler')

module.exports.CustomerValidator = class CustomerValidator extends CustomerErrorHandler{
    validateIfIsValidUser(user) {
        if (!user || !user._id) this.InvalidUserException();
    }

    validateExternalId(externalId) {
        if (!externalId) this.InvalidExternalIdException();
    }
}
