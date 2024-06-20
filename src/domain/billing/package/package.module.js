'use strict';

const packageFacade = require('./package.facade');

const createNew = async (obj) => {
    return packageFacade.createNew(obj);
};

const getById = async (id) => {
    return packageFacade.getById(id);
};

const getEnables = async () => {
    return packageFacade.getEnables();
};

const getBatchByIds = async (packagesIds) => {
    return packageFacade.getBatchByIds(packagesIds);
};

module.exports = {
    createNew,
    getById,
    getEnables,
    getBatchByIds,
};
