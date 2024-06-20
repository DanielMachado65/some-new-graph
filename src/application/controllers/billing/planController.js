'use strict';

const planModule = require('../../../domain/billing/planModule');

const createPlan = async (data) => {
    return await planModule.createPlan(data.creator, data);
};

const updatePlan = async (id, data) => {
    return await planModule.updatePlan(id, data);
};

const getPlan = async (id) => {
    return await planModule.getPlan(id);
};

const getPlanByName = async (name, isPublicRoute) => {
    return await planModule.getPlanByName(name, isPublicRoute);
};

const getPlans = async (isPublicRoute) => {
    return await planModule.getPlans(isPublicRoute);
};

const deletePlan = async (id) => {
    return await planModule.deletePlan(id);
};

const getTypesOnCart = async (signatures) => {
    return await planModule.getTypesOnCart(signatures);
};

module.exports = {
    createPlan,
    getPlan,
    getPlanByName,
    getPlans,
    updatePlan,
    deletePlan,
    getTypesOnCart,
};
