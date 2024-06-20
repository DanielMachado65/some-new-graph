'use strict';

const subscriptionModule = require('../../../domain/billing/subscriptionModule');

const createSubscription = async (creatorId, data) => {
    return await subscriptionModule.createSubscription(creatorId, data);
};

const getSubscriptionById = async (subscriptionId) => {
    return await subscriptionModule.getSubscriptionById(subscriptionId);
};

const getSubscriptionByCreator = async (creatorId) => {
    return await subscriptionModule.getSubscriptionByCreator(creatorId);
};

const getAllSubscriptions = async () => {
    return await subscriptionModule.getAllSubscriptions();
};

const activateSubscription = async (subscriptionId) => {
    return await subscriptionModule.activateSubscription(subscriptionId);
};

const deactivateSubscription = async (subscriptionId) => {
    return await subscriptionModule.deactivateSubscription(subscriptionId);
};

const updateSubscription = async (subscriptionId, data) => {
    return await subscriptionModule.updateSubscription(subscriptionId, data);
};

const deleteSubscriptionById = async (subscriptionId) => {
    return await subscriptionModule.deleteSubscriptionById(subscriptionId);
};

module.exports = {
    createSubscription,
    getSubscriptionById,
    getSubscriptionByCreator,
    getAllSubscriptions,
    activateSubscription,
    deactivateSubscription,
    updateSubscription,
    deleteSubscriptionById,
};
