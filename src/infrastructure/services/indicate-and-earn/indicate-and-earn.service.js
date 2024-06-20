const HttpRequest = require("axios");
const BASE_URL = process.env.INDICATE_API_BASE_URL;

const errorMessageWrapper = (error) => {
  const messageError =
    error.response &&
    error.response.data &&
    error.response.data.error &&
    error.response.data.error.message;

  return messageError === "Indicated already exists!"
    ? "Este e-mail já foi usado em uma compra passada"
    : "Algo deu errado!";
};

const getHashlink = async function (keys) {
  return await HttpRequest({
    method: "POST",
    url: `${BASE_URL}/hash-link`,
    data: keys,
  });
};

const getTransactionsCredit = async function (key) {
  try {
    const response = await HttpRequest({
      method: "GET",
      url: `${BASE_URL}/participants/${key}/transactions/credit`,
    });

    return response.data;
  } catch (error) {
    return [];
  }
};

const getTransactionsDebit = async function (key) {
  try {
    const response = await HttpRequest({
      method: "GET",
      url: `${BASE_URL}/participants/${key}/transactions/debit`,
    });

    return response.data;
  } catch (error) {
    return [];
  }
};

const getTransactionsTotals = async function (key) {
  return await HttpRequest({
    method: "GET",
    url: `${BASE_URL}/participants/${key}/transactions/totals`,
  });
};

const getTransactionsBalance = async function (key) {
  return await HttpRequest({
    method: "GET",
    url: `${BASE_URL}/participants/${key}/transactions/balance`,
  });
};

const setIndicated = async function (keys) {
  try {
    const response = await HttpRequest({
      method: "POST",
      url: `${BASE_URL}/indicateds`,
      data: keys,
    });

    return response.data;
  } catch (error) {
    throw errorMessageWrapper(error);
  }
};

const setTransactionCredit = async function (keys) {
  try {
    return await HttpRequest({
      method: "POST",
      url: `${BASE_URL}/transactions/credit`,
      data: keys,
    });
  } catch (error) {}
};

const setTransactionDebitWithdrawal = async function (keys) {
  return await HttpRequest({
    method: "POST",
    url: `${BASE_URL}/transactions/debit/withdrawal`,
    data: keys,
  });
};

const setTransactionDebitWithOncWallet = async function (keys) {
  return await HttpRequest({
    method: "POST",
    url: `${BASE_URL}/transactions/debit/onc_wallet`,
    data: keys,
  });
};

module.exports = {
  getHashlink,
  getTransactionsCredit,
  getTransactionsDebit,
  getTransactionsTotals,
  getTransactionsBalance,
  setIndicated,
  setTransactionCredit,
  setTransactionDebitWithdrawal,
  setTransactionDebitWithOncWallet,
};
