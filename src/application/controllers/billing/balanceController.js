(async function () {
    'use strict';

    const balanceModule = require('../../../domain/billing/balanceModule');

    const getByUser = async (userid, initDate, endDate) => {
        return await balanceModule.getByUser(userid, initDate, endDate);
    };

    const getByAssigner = async (assignerid, initDate, endDate) => {
        return await balanceModule.getByAssigner(assignerid, initDate, endDate);
    };

    const getLasts = async (initDate, endDate) => {
        return await balanceModule.getLasts(initDate, endDate);
    };

    module.exports = {
        getByUser,
        getByAssigner,
        getLasts,
    };
})();
