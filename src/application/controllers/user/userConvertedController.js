(async function () {
    'use strict';
    const userConvertedModule = require('../../../domain/user/userConvertedModule');

    const insertNewUserConverted = async (email, ip) => {
        return await userConvertedModule.insertNewUserConverted(email, ip);
    };

    const getAllUsersConverteds = async (initDate, endDate) => {
        return await userConvertedModule.getAllUsersConverteds(
            initDate,
            endDate,
        );
    };

    module.exports = {
        insertNewUserConverted,
        getAllUsersConverteds,
    };
})();
