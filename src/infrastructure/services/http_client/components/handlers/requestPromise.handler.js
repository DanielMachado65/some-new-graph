'use strict';

const requestPromise = require('request-promise')
const {RestContract} =require('../contracts/rest.contract');

module.exports.RequestPromiseHandler = class RequestPromiseHandler extends RestContract {
    post = async () => {
        throw new Error('Not implemented yet')
    }
    get = async () => {
        throw new Error('Not implemented yet')
    }
    delete = async () => {
        throw new Error('Not implemented yet')
    }
    put = async () => {
        throw new Error('Not implemented yet')
    }
    patch = async () => {
        throw new Error('Not implemented yet')
    }
}
