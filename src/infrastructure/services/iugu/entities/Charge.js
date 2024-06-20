"use strict";

const { Contract } = require("./Contract");
const { Item } = require("./Item");
const { Client } = require("./Client");

module.exports.Charge = class Charge extends Contract {
  method;
  token;
  customer_payment_method_id;
  restrict_payment_method;
  customer_id;
  invoice_id;
  email;
  months;
  discount_cents;
  bank_slip_extra_days;
  keep_dunning;
  items;
  payer;
  order_id;

  constructor() {
    super("charge");
  }

  setToken(value) {
    this.token = value;
    return this;
  }

  setMethod(value) {
    Contract.ValidatePaymentMethod(value);
    this.method = value;
    return this;
  }

  setCustomerPaymentMethodId(value) {
    this.customer_payment_method_id = value;
    return this;
  }

  setRestrictPaymentMethod(value) {
    this.restrict_payment_method = value;
    return this;
  }

  setCustomerId(value) {
    this.customer_id = value;
    return this;
  }

  setInvoiceId(value) {
    this.invoice_id = value;
    return this;
  }

  setEmail(value) {
    this.email = value;
    return this;
  }

  setMonths(value) {
    this.months = value;
    return this;
  }

  setDiscountCents(value) {
    this.discount_cents = value;
    return this;
  }

  setBankSlipExtraDays(value) {
    this.bank_slip_extra_days = value;
    return this;
  }

  setKeepDunning(value) {
    this.keep_dunning = value;
    return this;
  }

  setItems(value) {
    Item.ValidateItems(value);
    this.items = value;
    return this;
  }

  setOrderId(value) {
    this.order_id = value;
    return this;
  }

  setPayer(value) {
    Client.Validate(value);
    this.payer = value;
    return this;
  }

  toObject() {
    return {
      method: this.method,
      token: this.token,
      customer_payment_method_id: this.customer_payment_method_id,
      restrict_payment_method: this.restrict_payment_method,
      customer_id: this.customer_id,
      invoice_id: this.invoice_id,
      email: this.email,
      months: this.months,
      discount_cents: this.discount_cents,
      bank_slip_extra_days: this.bank_slip_extra_days,
      keep_dunning: this.keep_dunning,
      items: this.items,
      payer: this.payer,
      order_id: this.order_id,
    };
  }

  create = async () => {
    const { payer, ...chargeData } = this.toObject();
    return this.doRequest(this.HTTP_METHODS.POST, null, {
      ...payer,
      ...chargeData,
    });
  };
};
