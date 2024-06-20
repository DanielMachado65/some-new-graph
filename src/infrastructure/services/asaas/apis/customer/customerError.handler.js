'use strict';
const {DispatcherError} = require('../components/handlers/dispatcherError.handler')
module.exports.CustomerErrorHandler = class CustomerErrorHandler extends DispatcherError{
    constructor() {
        super();
    }
    InvalidUserException(){
        super.throwException("Invalid user. User must be sent and can't be null or empty.");
    }

    InvalidExternalIdException(){
        super.throwException("The user id from asaas is wrong or invalid.");
    }

}
