'use strict';

const creditsLogFacade = require('./creditsLog.facade');

const getById = async (id) => {
    return creditsLogFacade.getById(id);
};

const getByPayment = async (payment) => {
    return creditsLogFacade.getByPayment(payment);
};

const createNewLog = async (log) => {
    return creditsLogFacade.createNewLog(log);
};

module.exports = {
    getByPayment,
    getById,
    createNewLog,
};
