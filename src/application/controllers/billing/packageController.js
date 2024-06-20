(async function () {
    'use strict';

    const packageModule = require('../../../domain/billing/package/package.module');

    const createNew = async (obj) => {
        return await packageModule.createNew(obj);
    };

    const getById = async (id) => {
        return await packageModule.getById(id);
    };

    const getEnables = async () => {
        return await packageModule.getEnables();
    };

    module.exports = {
        createNew,
        getById,
        getEnables,
    };
})();
