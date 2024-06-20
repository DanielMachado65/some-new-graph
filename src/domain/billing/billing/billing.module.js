"use strict";

const billingFacade = require("./billing.facade");
const userFacade = require('../../user/user/user.facade')

const getById = async (id) => {
  return billingFacade.getById(id);
};

const getPrePaidBillingById = async (billingId) => {
  return billingFacade.getPrePaidBillingById(billingId);
};

const getByIdInternal = async (id) => {
  return billingFacade.getByIdInternal(id);
};

const executePaymentOperation = async (userid, query, log) => {
  return billingFacade.executePaymentOperation(userid, query, log);
};

const completeExtractConsumption = async (userid) => {
  return billingFacade.completeExtractConsumption(userid);
};

const changeUserPriceTable = async (userid, priceTable) => {
  return billingFacade.changeUserPriceTable(userid, priceTable);
};

const addCreditsByUser = async (userid, credits, assigner, billing) => {
  return billingFacade.addCreditsByUser(userid, credits, assigner, billing);
};

const executeChargebackOperation = async (query) => {
  return billingFacade.executeChargebackOperation(query);
};

const getCreditsByUser = async (user) => {
  return billingFacade.getCreditsByUser(user);
};

const getByUser = async (userid) => {
  return billingFacade.getByUser(userid);
};

const closeAllInvoicesPosPaid = async () => {
  return billingFacade.closeAllInvoicesPosPaid();
};

const getPosPaidBillings = async () => {
  return billingFacade.getPosPaidBillings();
};

const clientsPostPaidSummeryConsumption = async () => {
  return billingFacade.clientsPostPaidSummeryConsumption();
};

const getTotalByPriceTable = async (priceTableId) => {
  return billingFacade.getTotalByPriceTable(priceTableId);
};

const getCreditsToAdd = (totalValue, discountValue) => {
  return billingFacade.getCreditsToAdd(totalValue, discountValue);
};

const addAccountFunds = async (billingId, billing, credits) => {
  return billingFacade.addAccountFunds(billingId, billing, credits);
};

const addPackagesToBilling = async (
  billingId,
  billing,
  cartPacks,
  packsModel
) => {
  return billingFacade.addPackagesToBilling(
    billingId,
    billing,
    cartPacks,
    packsModel
  );
};

const updateAccountFunds = async (billId, credits, assigner) => {
  return billingFacade.updateAccountFunds(billId, credits, assigner);
};

const updateAccountFundsv2 = async (billingid, billingUserId, credits, assigner, password) => {
  const user = await userFacade.getById(assigner);
  const billingUser = await userFacade.getById(billingUserId);
  return billingFacade.updateAccountFundsv2(user, billingid, billingUser, credits, assigner, password);
};

const updateFatmin = async (billId, fatMin) => {
  return billingFacade.updateFatmin(billId, fatMin);
};

const updateDspac = async (billId, monthly) => {
  return billingFacade.updateDspac(billId, monthly);
};

const updateInvoiceBillingStatus = async (invoiceId) => {
  return billingFacade.updateInvoiceBillingStatus(invoiceId);
};

const updateBillingHierarchy = async (userid, ownerId) => {
  return billingFacade.updateBillingHierarchy(userid, ownerId);
};

const getChildsWallets = async (billingId) => {
  return billingFacade.getChildsWallets(billingId);
};

const updateFinancialLock = async (billId, financialLock) => {
  return billingFacade.updateFinancialLock(billId, financialLock);
};

const updateDeadlineToPay = async (billingId, initDate, endDate) => {
  return billingFacade.updateDeadlineToPay(billingId, initDate, endDate);
};

const getAllUserDataToReport = async ({
  userId,
  billingType,
  initDate,
  endDate,
  minBuyout,
  maxBuyout,
}) => {
  return billingFacade.getAllUserDataToReport({
    userId,
    billingType,
    initDate,
    endDate,
    minBuyout,
    maxBuyout,
  });
};

const getPartnerComissionConsumptionrDataToReportByPeriod = async (
  month,
  year,
  prePaid,
  posPaid
) => {
  return billingFacade.getPartnerComissionConsumptionrDataToReportByPeriod(
    month,
    year,
    prePaid,
    posPaid
  );
};

const getPartnerConsumptionForecastDataToReport = async (partnerId) => {
  return billingFacade.getPartnerConsumptionForecastDataToReport(partnerId);
};

const unblockUser = async (userid) => {
  return billingFacade.unblockUser(userid);
};

const blockUser = async (userid) => {
  return billingFacade.blockUser(userid);
};

const updateSubscriptions = async (userid, subscriptions) => {
  return billingFacade.updateSubscriptions(userid, subscriptions);
};

const updatePaymentExpirationDay = async (billingId, expirationDay) => {
  return billingFacade.updatePaymentExpirationDay(billingId, expirationDay);
};

module.exports = {
  getById,
  getPrePaidBillingById,
  executePaymentOperation,
  completeExtractConsumption,
  changeUserPriceTable,
  addCreditsByUser,
  executeChargebackOperation,
  getCreditsByUser,
  getByUser,
  getByIdInternal,
  getPosPaidBillings,
  closeAllInvoicesPosPaid,
  clientsPostPaidSummeryConsumption,
  getTotalByPriceTable,
  getCreditsToAdd,
  addAccountFunds,
  addPackagesToBilling,
  updateAccountFunds,
  updateAccountFundsv2,
  updateFatmin,
  updateDspac,
  updateInvoiceBillingStatus,
  updateBillingHierarchy,
  getChildsWallets,
  updateFinancialLock,
  updateDeadlineToPay,
  getAllUserDataToReport,
  getPartnerComissionConsumptionrDataToReportByPeriod,
  getPartnerConsumptionForecastDataToReport,
  unblockUser,
  blockUser,
  updateSubscriptions,
  updatePaymentExpirationDay,
};
