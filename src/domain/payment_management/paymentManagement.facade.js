const { MPaymentsManagement } = require("mongoose").models;

async function createOrUpdatePaymentManagementRules(params) {
  return MPaymentsManagement.create(params);
}

async function getCurrentPaymentManagementRules() {
  return MPaymentsManagement.findOne().sort({ createdAt: -1 });
}

module.exports = {
  createOrUpdatePaymentManagementRules,
  getCurrentPaymentManagementRules,
};
