'use strict';

module.exports.ResponseStructure = class ResponseStructure {
    constructor() {
    }

    setResponse(response){
        this.response = response
    }

    setStatus(status){
        this.status = status
    }

    setError(message){
        this.error = new Error(message)
    }
}
