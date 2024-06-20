"use strict";
const { Contract } = require("./Contract");
const { CreditCard } = require("./CreditCard");

module.exports.Token = class Token extends Contract {
  account_id = this.getAccountId();
  method = this.PAYMENT_METHODS.CREDIT_CARD;
  test;
  data;

  constructor() {
    super("payment_token");
  }

  setTest(value) {
    this.test = value;
    return this;
  }

  setData(value) {
    CreditCard.ValidateCreditCard(value);
    this.data = value;
    return this;
  }

  toObject() {
    return {
      account_id: this.account_id,
      method: this.method,
      test: this.test,
      data: this.data.toObject(),
    };
  }

  static ValidateToken(token) {
    if (!(token instanceof Token))
      throw new Error("Invalid token object. Must be a Token type");
  }

  create = async () => {
    const body = this.toObject();
    return this.doRequest(this.HTTP_METHODS.POST, null, body);
  };
};
