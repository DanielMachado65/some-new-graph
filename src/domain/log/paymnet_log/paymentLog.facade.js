'use strict';

const { MPaymentLog } = require('mongoose').models;

const getById = async (id) => {
    return MPaymentLog.findOne({ _id: id });
};

const createNewLog = async (log) => {
    let paymentLog = new MPaymentLog();
    paymentLog.chargeId = log.chargeId;
    paymentLog.payment = log.payment;
    paymentLog.raw = log.raw;
    paymentLog.token = log.token;
    return MPaymentLog.create(paymentLog);
};

module.exports = {
    getById,
    createNewLog,
};
