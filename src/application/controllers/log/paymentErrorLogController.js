(async () => {
    'use strict';

    const paymentErrorLogModule = require('../../../domain/log/paymentErrorLogModule');

    const getErrorsLogs = async () => {
        return await paymentErrorLogModule.getErrorsLogs();
    };

    module.exports = {
        getErrorsLogs,
    };
})();
