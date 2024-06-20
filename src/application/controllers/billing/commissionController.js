(async () => {
    'use strict';

    const commissionModule = require('../../../domain/billing/commissionModule');

    const getById = async (id) => {
        return await commissionModule.getById(id);
    };

    const getCommisionsByPeriod = async (month, year) => {
        return await commissionModule.getCommisionsByPeriod(month, year);
    };

    const getCommissionByUser = async (userid, month, year) => {
        return await commissionModule.getCommissionByUser(userid, month, year);
    };

    const executeCommissioning = async (month, year) => {
        return await commissionModule.executeCommissioning(month, year);
    };

    const getDataCommissionToReport = async (month, year) => {
        return await commissionModule.getDataCommissionToReport(month, year);
    };

    module.exports = {
        getById,
        getCommisionsByPeriod,
        getCommissionByUser,
        executeCommissioning,
        getDataCommissionToReport,
    };
})();
