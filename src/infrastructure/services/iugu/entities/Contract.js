"use strict";

const axios = require("axios");

module.exports.Contract = class Contract {
  _apiKey =
    process.env.ENV === "dev"
      ? process.env.IUGU_TEST_API_KEY
      : process.env.IUGU_PRODUCTION_API_KEY;
  _apiKeyEncoded = `Basic ${Buffer.from(this._apiKey + ": ").toString(
    "base64"
  )}`;
  _requestTimeOut = parseInt(process.env.IUGU_DEFAULT_TIMEOUT || 60000);
  _baseUrlApi = process.env.IUGU_API_BASE_URL;
  _accountId = process.env.IUGU_ACCOUNT_ID;
  urlCallback = process.env.IUGU_CALLBACK_URL;

  HTTP_METHODS = Object.freeze({
    POST: "post",
    GET: "get",
    PUT: "put",
    DELETE: "delete",
    PATCH: "patch",
  });

  static PAYMENT_METHODS = Object.freeze({
    CREDIT_CARD: "credit_card",
    BANK_BILLET: "bank_slip",
    PIX: "pix",
  });
  path;
  constructor(path) {
    this.path = path || String();
  }

  getAccountId() {
    return this._accountId;
  }

  setUrlCallback(value) {
    this.urlCallback = value;
  }

  static ValidatePaymentMethod = function (method) {
    const hasMethod = Object.values(Contract.PAYMENT_METHODS).find(
      (key) => key === method
    );
    if (!hasMethod) throw new Error("Invalid payment method");
  };

  doRequest = async (method, urlParams, body = null) => {
    const url =
      this._baseUrlApi + this.path + (urlParams ? urlParams : String());
    const { data } = await axios({
      method,
      url,
      headers: {
        "Content-Type": "application/json",
        Authorization: this._apiKeyEncoded,
      },
      timeout: this._requestTimeOut,
      data: body,
      responseType: "json",
    });
    return data;
  };
};
