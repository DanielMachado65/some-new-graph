'use strict';

const consumptionFacade = require('./consumption.facade');

const createNew = async (obj) => {
    return consumptionFacade.createNew(obj);
};

const getById = async (id) => {
    return consumptionFacade.getById(id);
};

const getTotalConsumption = async (billing, dt) => {
    return consumptionFacade.getTotalConsumption(billing, dt);
};

const getByQuery = async (queryId) => {
    return consumptionFacade.getByQuery(queryId);
};

const find = async (filter) => {
    return consumptionFacade.find(filter);
};

const getByArrayBilling = async (billings, initDate, endDate) => {
    return consumptionFacade.getByArrayBilling(billings, initDate, endDate);
};

function extractAllConsumptionIdsFromInvoices(invoices) {
    return consumptionFacade.extractAllConsumptionIdsFromInvoices(invoices);
}

module.exports = {
    createNew,
    getById,
    getTotalConsumption,
    getByQuery,
    find,
    getByArrayBilling,
    extractAllConsumptionIdsFromInvoices,
};
