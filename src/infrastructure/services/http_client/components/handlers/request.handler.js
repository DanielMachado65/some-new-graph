'use strict';

const request = require('request');
const {RestContract} =require('../contracts/rest.contract');

module.exports.RequestHandler = class RequestHandler extends RestContract {
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
