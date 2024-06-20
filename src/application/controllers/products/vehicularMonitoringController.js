'use strict';

const vehicularMonitoringModule = require('../../../domain/products/vehicularMonitoringModule');

const createVehicularMonitoring = async (userId, subscriptionId, keys) => {
    return await vehicularMonitoringModule.createVehicularMonitoring(
        userId,
        subscriptionId,
        keys,
    );
};

const updateVehicularMonitoring = async (subscriptionId, keys) => {
    return await vehicularMonitoringModule.updateVehicularMonitoring(
        subscriptionId,
        keys,
    );
};

const getByUserVehicularMonitoring = async (creatorId) => {
    return await vehicularMonitoringModule.getByUserVehicularMonitoring(
        creatorId,
    );
};

const getBySubscriptionVehicularMonitoring = async () => {
    return await vehicularMonitoringModule.getBySubscriptionVehicularMonitoring();
};

const getAllVehicularMonitoring = async () => {
    return await vehicularMonitoringModule.getAllVehicularMonitoring();
};

module.exports = {
    createVehicularMonitoring,
    updateVehicularMonitoring,
    getByUserVehicularMonitoring,
    getBySubscriptionVehicularMonitoring,
    getAllVehicularMonitoring,
};
