'use strict';

const invoiceFacade = require('./invoice.facade');

const createNew = async (obj) => {
    return invoiceFacade.createNew(obj);
};

const getJsonById = async (id) => {
    return invoiceFacade.getJsonById(id);
};

const getById = async (id) => {
    return invoiceFacade.getById(id);
};

const getByPayment = async (payment) => {
    return invoiceFacade.getByPayment(payment);
};

const getSummary = async (invoiceId) => {
    return invoiceFacade.getSummary(invoiceId);
};

const find = async (filter, opts) => {
    return invoiceFacade.find(filter, opts);
};

const grantDiscount = async (invoiceId, motive, value, userId) => {
    return invoiceFacade.grantDiscount(invoiceId, motive, value, userId);
};

const getPopulatedInvoicesWithConsumptionsAndQueriesToReportQueries = async (
    refMonth,
    refYear,
    billings,
) => {
    return invoiceFacade.getPopulatedInvoicesWithConsumptionsAndQueriesToReportQueries(
        refMonth,
        refYear,
        billings,
    );
};

module.exports = {
    createNew,
    getJsonById,
    getById,
    getByPayment,
    getSummary,
    find,
    grantDiscount,
    getPopulatedInvoicesWithConsumptionsAndQueriesToReportQueries,
};
