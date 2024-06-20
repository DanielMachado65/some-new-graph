'use strict';

const { MIuguLog } = require('mongoose').models;

const createRegister = async (data, error) => {
    await MIuguLog.create([
        {
            event: data.event,
            data,
            error,
        },
    ]);
};

module.exports = {
    createRegister,
};
