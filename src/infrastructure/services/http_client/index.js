'use strict';

const httpStrategies = require('./components/strategies.enum');
const httpHandlerStrategy = require('./components/strategiesHandlers.map');

module.exports.HttpClientService = class HttpClientService {
    constructor(httpStrategy = httpStrategies.AXIOS) {
        const Handler = httpHandlerStrategy.get(httpStrategy);
        this.handler = new Handler();
    }

    static strategyBuilder() {
        return {
            useAxios() {
                return httpStrategies.AXIOS;
            },
            useRequest() {
                return httpStrategies.REQUEST;
            },
            useRequestPromise() {
                return httpStrategies.REQUEST_PROMISE;
            },
            useSoap() {
                throw new Error('Not implemented yet');
            },
        };
    }

    post = async (url, body, options) => {
        return this.handler.post(url, body, options);
    };
    get = async (url, options) => {
        return this.handler.get(url, options);
    };
    put = async (url, body, options) => {
        return this.handler.put(url, body, options);
    };
    delete = async (url, options) => {
        return this.handler.delete(url, options);
    };
    patch = async (url, body, options) => {
        return this.handler.patch(url, body, options);
    };
};
