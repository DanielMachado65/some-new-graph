'use strict';

const settingsModule = require('../../../domain/settings/settingsModule');

const updateByUser = async (userid, settings) => {
    return settingsModule.updateByUser(userid, settings);
};

const getByUser = async (userid) => {
    return settingsModule.getByUser(userid);
};

const getById = async (id) => {
    return settingsModule.getById(id);
};

module.exports = {
    updateByUser,
    getByUser,
    getById,
};
