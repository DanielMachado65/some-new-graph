'use strict';

const kondutoModule = require('../../../domain/konduto/kondutoModule');

const createOrder = async (creator) => {
    return await kondutoModule.createOrder(creator);
};

module.exports = {
    createOrder,
};
