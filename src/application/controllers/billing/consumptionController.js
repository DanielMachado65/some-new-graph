(async function () {
    'use strict';

    const consumptionStatementModule = require('../../../domain/billing/consumption/consumptionStatement.module');
    const billingModule = require('../../../domain/billing/billing/billing.module');

    const getTotalConsumption = async (userid, dt) => {
        let billing = await billingModule.getByUser(userid);
        if (billing) {
            return await consumptionStatementModule.getTotalConsumption(
                billing._id,
                dt,
            );
        }
        return null;
    };

    module.exports = {
        getTotalConsumption,
    };
})();
