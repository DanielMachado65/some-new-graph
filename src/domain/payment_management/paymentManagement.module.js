const paymentManagement = require("./paymentManagement.facade");

async function createOrUpdatePaymentManagementRules(params) {
  return paymentManagement.createOrUpdatePaymentManagementRules(params);
}

async function getCurrentPaymentManagementRules() {
  return paymentManagement.getCurrentPaymentManagementRules();
}

module.exports = {
  createOrUpdatePaymentManagementRules,
  getCurrentPaymentManagementRules,
};