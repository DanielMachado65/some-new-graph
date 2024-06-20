'use strict';

module.exports.DispatcherError = class DispatcherError {
    constructor() {
        this.defaultMessageError = 'Internal server error or unknown error';
    }
    throwException(message){
        throw new Error(message || this.defaultMessageError)
    }
}
