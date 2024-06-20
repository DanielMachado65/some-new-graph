'use strict';

const billingModule = require('../../../domain/billing/billing/billing.module');

const getById = async (id) => {
    return await billingModule.getById(id);
};

const completeExtractConsumption = async (userId) => {
    let _result = null;
    try {
        _result = await billingModule.completeExtractConsumption(userId);
    } catch (err) {
        _result = err;
    }
    return _result;
};

const changeUserPriceTable = async (userId, newPriceTable) => {
    return await billingModule.changeUserPriceTable(userId, newPriceTable);
};

const addCreditsByUser = async (userId, credits, assigner) => {
    return await billingModule.addCreditsByUser(userId, credits, assigner);
};

const getCreditsByUser = async (userId) => {
    let result = { cod: 200, data: null };
    let response = await billingModule.getCreditsByUser(userId);
    if (response.error) {
        result.cod = 404;
        result.data = response.error;
    } else result.data = response.data;
    return result;
};

const clientsPostPaidSummeryConsumption = async () => {
    return billingModule.clientsPostPaidSummeryConsumption();
};

const getTotalByPriceTable = async (priceTableId) => {
    return billingModule.getTotalByPriceTable(priceTableId);
};

const updateAccountFunds = async (billingid, credits, assigner) => {
    return billingModule.updateAccountFunds(billingid, credits, assigner);
};

const updateAccountFundsv2 = async (billingid, billingUserId, credits, assigner, password) => {
    return billingModule.updateAccountFundsv2(billingid, billingUserId, credits, assigner, password);
};

const updateFatmin = async (billingid, fatmin) => {
    return billingModule.updateFatmin(billingid, fatmin);
};

const updateDspac = async (billingid, dspac) => {
    return billingModule.updateDspac(billingid, dspac);
};

const updateInvoiceBillingStatus = async (invoiceid) => {
    return billingModule.updateInvoiceBillingStatus(invoiceid);
};

const updateBillingHierarchy = async (userid, ownerid) => {
    return billingModule.updateBillingHierarchy(userid, ownerid);
};

const updateFinancialLock = async (billingid, financialLock) => {
    return billingModule.updateFinancialLock(billingid, financialLock);
};

const updateDeadlineToPay = async (billingid, initDate, endDate) => {
    return billingModule.updateDeadlineToPay(billingid, initDate, endDate);
};

const getAllUserDataToReport = async (args) => {
    return billingModule.getAllUserDataToReport(args);
};

const getPartnerComissionConsumptionrDataToReportByPeriod = async (
    month,
    year,
    prePaid,
    posPaid,
) => {
    return billingModule.getPartnerComissionConsumptionrDataToReportByPeriod(
        month,
        year,
        prePaid,
        posPaid,
    );
};

const getPartnerConsumptionForecastDataToReport = async (partnerId) => {
    return billingModule.getPartnerConsumptionForecastDataToReport(partnerId);
};

const unblockUser = async (userId) => {
    return billingModule.unblockUser(userId);
};

const blockUser = async (userId) => {
    return billingModule.blockUser(userId);
};

const updateSubscriptions = async (id, subscriptions) => {
    return billingModule.updateSubscriptions(id, subscriptions);
};

let updatePaymentExpirationDay = async (billingid, expirationDay) => {
    return billingModule.updatePaymentExpirationDay(billingid, expirationDay);
};

module.exports = {
    getById,
    completeExtractConsumption,
    changeUserPriceTable,
    addCreditsByUser,
    getCreditsByUser,
    clientsPostPaidSummeryConsumption,
    getTotalByPriceTable,
    updateAccountFunds,
    updateAccountFundsv2,
    updateFatmin,
    updateDspac,
    updateInvoiceBillingStatus,
    updateBillingHierarchy,
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
