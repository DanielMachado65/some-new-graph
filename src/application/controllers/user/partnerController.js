(async function () {
    'use strict';

    const partnerModule = require('../../../domain/user/partnerModule');

    const updateRules = async (userid, partner) => {
        return await partnerModule.updateRules(userid, partner);
    };

    module.exports = {
        updateRules,
    };
})();
