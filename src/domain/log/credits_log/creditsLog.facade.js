'use strict';

const { MCreditsLog } = require('mongoose').models;

const getById = async (id) => {
    return MCreditsLog.findOne({ _id: id });
};

const getByPayment = async (payment) => {
    return MCreditsLog.findOne({ payment: payment });
};

const createNewLog = async (log) => {
    return MCreditsLog.create(log);
};

module.exports = {
    getByPayment,
    getById,
    createNewLog,
};
