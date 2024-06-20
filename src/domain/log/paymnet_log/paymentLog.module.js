'use strict';

const paymentLogFacade = require('./paymentLog.facade');

const getById = async (id) => {
    return paymentLogFacade.getById(id);
};

const createNewLog = async (log) => {
    return paymentLogFacade.createNewLog(log);
};

module.exports = {
    getById,
    createNewLog,
};
