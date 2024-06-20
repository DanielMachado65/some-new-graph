'use strict';

const strategiesEnum = require('./strategies.enum');
const { AxiosHandler } = require('./handlers/axios.handler');
const { RequestHandler } = require('./handlers/request.handler');
const { RequestPromiseHandler } = require('./handlers/requestPromise.handler');

const httpStrategiesMap = new Map();
httpStrategiesMap.set(strategiesEnum.AXIOS, AxiosHandler);
httpStrategiesMap.set(strategiesEnum.REQUEST, RequestHandler);
httpStrategiesMap.set(strategiesEnum.REQUEST_PROMISE, RequestPromiseHandler);

module.exports = httpStrategiesMap;
