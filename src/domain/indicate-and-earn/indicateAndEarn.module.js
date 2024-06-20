"use strict";

const billingFacade = require("../billing/billing/billing.facade");
const indicateAndEarnFacade = require("./indicateAndEarn.facade");
const priceUtils = require("../../infrastructure/utils/price.util");

const getHashlink = indicateAndEarnFacade.indicateAndEarnGetHashlink;
const getTransactionsCredit =
  indicateAndEarnFacade.indicateAndEarnGetTransactionsCredit;
const getTransactionsDebit =
  indicateAndEarnFacade.indicateAndEarnGetTransactionsDebit;
const getTransactionsTotals =
  indicateAndEarnFacade.indicateAndEarnGetTransactionsTotals;
const getGetTransactionsBalance =
  indicateAndEarnFacade.indicateAndEarnGetTransactionsBalance;

const setIndicated = indicateAndEarnFacade.indicateAndEarnSetIndicated;
const setTransactionCredit =
  indicateAndEarnFacade.indicateAndEarnSetTransactionCredit;
const setTransactionDebitWithdrawal =
  indicateAndEarnFacade.indicateAndEarnSetTransactionDebitWithdrawal;

const setTransactionDebitWithOncWallet = async ({ idOrigin, value }) => {
  await indicateAndEarnFacade.indicateAndEarnSetTransactionDebitWithOncWallet({
    idOrigin,
    value,
  });
  const response = await billingFacade.addCreditsToUser(
    idOrigin,
    priceUtils.fromCents(value)
  );
  const currentBalance = priceUtils.toCents(response.currentBalance);
  return { data: { currentBalance } };
};

module.exports = {
  getHashlink,
  getTransactionsCredit,
  getTransactionsDebit,
  getTransactionsTotals,
  getGetTransactionsBalance,

  setIndicated,
  setTransactionCredit,
  setTransactionDebitWithdrawal,
  setTransactionDebitWithOncWallet,
};
