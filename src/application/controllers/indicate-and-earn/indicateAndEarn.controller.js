"use strict";
const mount = require("koa-mount");
const Router = require("koa-router");
const HttpCodes = require("../../../infrastructure/enumerators/httpCode.enum");
const {
  basicAuthenticationMiddleware,
} = require("../../middlewares/authMiddleware");

const indicateAndEarnRoutes = new Router();
const {
  responseObject,
} = require("../../../infrastructure/helpers/routerHelper");
const {
  getHashlink,
  getTransactionsCredit,
  getTransactionsDebit,
  getTransactionsTotals,
  getGetTransactionsBalance,

  setIndicated,
  setTransactionDebitWithdrawal,
  setTransactionDebitWithOncWallet,
} = require("../../../domain/indicate-and-earn/indicateAndEarn.module");

const errorHandler = (ctx, error, msg) => {
  const errorResponse = error && error.response;
  const status =
    (errorResponse && errorResponse.status) || HttpCodes.GONE_ERROR;
  const statusText = (errorResponse && errorResponse.statusText) || msg;
  return responseObject(ctx, status, statusText);
};

indicateAndEarnRoutes.post(
  "/create-hash",
  basicAuthenticationMiddleware,
  createHash
);
async function createHash(ctx) {
  try {
    const userId = ctx.auth_user_id;
    const response = await getHashlink(userId);

    return responseObject(ctx, HttpCodes.SUCCESS, response.data);
  } catch (error) {
    errorHandler(ctx, error, error.message);
  }
}

indicateAndEarnRoutes.get(
  "/transactions-credit",
  basicAuthenticationMiddleware,
  getCreditTransactions
);
async function getCreditTransactions(ctx) {
  try {
    const userId = ctx.auth_user_id;
    const response = await getTransactionsCredit(userId);

    return responseObject(ctx, HttpCodes.SUCCESS, response);
  } catch (error) {
    errorHandler(ctx, error, error.message);
  }
}

indicateAndEarnRoutes.get(
  "/transactions-debit",
  basicAuthenticationMiddleware,
  getDebitTransactions
);
async function getDebitTransactions(ctx) {
  try {
    const userId = ctx.auth_user_id;
    const response = await getTransactionsDebit(userId);

    return responseObject(ctx, HttpCodes.SUCCESS, response);
  } catch (error) {
    errorHandler(ctx, error, error.message);
  }
}

indicateAndEarnRoutes.get(
  "/transactions-totals",
  basicAuthenticationMiddleware,
  getTotals
);
async function getTotals(ctx) {
  try {
    const userId = ctx.auth_user_id;
    const response = await getTransactionsTotals(userId);

    return responseObject(ctx, HttpCodes.SUCCESS, response.data);
  } catch (error) {
    errorHandler(ctx, error, error.message);
  }
}

indicateAndEarnRoutes.get(
  "/transactions-balance",
  basicAuthenticationMiddleware,
  getBalance
);
async function getBalance(ctx) {
  try {
    const userId = ctx.auth_user_id;
    const response = await getGetTransactionsBalance(userId);

    return responseObject(ctx, HttpCodes.SUCCESS, response.data);
  } catch (error) {
    errorHandler(ctx, error, error.message);
  }
}
indicateAndEarnRoutes.post("/indicated", createIndicated);
async function createIndicated(ctx) {
  try {
    const keys = ctx.request.body;
    const response = await setIndicated(keys);

    return responseObject(ctx, HttpCodes.SUCCESS, response);
  } catch (error) {
    errorHandler(ctx, error, error);
  }
}

indicateAndEarnRoutes.post(
  "/transaction-debit-withdrawal",
  basicAuthenticationMiddleware,
  createTransactionDebitWithdrawal
);
async function createTransactionDebitWithdrawal(ctx) {
  try {
    const userId = ctx.auth_user_id;
    const keys = ctx.request.body;
    const response = await setTransactionDebitWithdrawal(userId, keys);

    return responseObject(ctx, HttpCodes.SUCCESS, response.data);
  } catch (error) {
    errorHandler(ctx, error, error.message);
  }
}

indicateAndEarnRoutes.post(
  "/transaction-debit-with-onc-wallet",
  basicAuthenticationMiddleware,
  createTransactionDebitWithOncWallet
);
async function createTransactionDebitWithOncWallet(ctx) {
  try {
    const userId = ctx.auth_user_id;
    const { value } = ctx.request.body;
    const response = await setTransactionDebitWithOncWallet({
      idOrigin: userId,
      value,
    });

    return responseObject(ctx, HttpCodes.SUCCESS, response.data);
  } catch (error) {
    errorHandler(ctx, error, error.message);
  }
}

module.exports = mount(
  "/api/indicate-and-earn-query",
  indicateAndEarnRoutes.routes()
);
