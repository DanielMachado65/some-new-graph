(async function () {
    'use strict';

    const invoiceModule = require('../../../domain/billing/invoice/invoice.module');

    const createNew = async (obj) => {
        return await invoiceModule.createNew(obj);
    };

    const getJsonById = async (id) => {
        return await invoiceModule.getJsonById(id);
    };

    const getSummary = async (id) => {
        return await invoiceModule.getSummary(id);
    };

    const grantDiscount = async (invoiceId, motive, value, userId) => {
        return await invoiceModule.grantDiscount(
            invoiceId,
            motive,
            value,
            userId,
        );
    };

    module.exports = {
        createNew,
        getJsonById,
        getSummary,
        grantDiscount,
    };
})();
