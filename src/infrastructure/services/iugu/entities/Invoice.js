"use strict";

const { Contract } = require("./Contract");
const { Client } = require("./Client");
const { Item } = require("./Item");

module.exports.Invoice = class Invoice extends Contract {
  keep_dunning;
  email;
  due_date;
  ensure_workday_due_date;
  items;
  notification_url;
  ignore_due_email;
  payable_with;
  payer;
  order_id;
  customer_id;

  constructor(
    keepDunning = true,
    email,
    dueDate,
    ensureWorkdayDueDate = true,
    items,
    notificationUrl,
    ignoreDueEmail = false,
    payableWith,
    orderId,
    payer,
    customerId
  ) {
    super("invoices");
    this.keep_dunning = keepDunning;
    this.email = email;
    this.due_date = dueDate;
    this.ensure_workday_due_date = ensureWorkdayDueDate;
    if (items) {
      Item.ValidateItems(items);
      this.items = items;
    }
    this.notification_url = notificationUrl || super.urlCallback;
    this.ignore_canceled_email = true;
    this.ignore_due_email = true;
    if (payableWith) {
      Contract.ValidatePaymentMethod(payableWith);
      this.payable_with = payableWith;
    }
    this.order_id = orderId;
    this.payer = payer;
    this.customer_id = customerId;
  }

  static Validate(invoice) {
    if (!(invoice instanceof Invoice))
      throw new Error("invoice object must be a Invoice Type object");
  }

  setKeepDunning(value) {
    this.keep_dunning = value;
    return this;
  }

  setEmail(value) {
    this.email = value;
    return this;
  }

  setDueDate(value) {
    this.due_date = value;
    return this;
  }

  setEnsureWorkdayDueDate(value) {
    this.ensure_workday_due_date = value;
    return this;
  }

  setItems(value) {
    Item.ValidateItems(value);
    this.items = value;
    return this;
  }

  setNotificationUrl(value) {
    this.notification_url = value;
    return this;
  }

  setIgnoreDueEmail(value) {
    this.ignore_due_email = value;
    return this;
  }

  setPayableWith(value) {
    Contract.ValidatePaymentMethod(value);
    this.payable_with = value;
    return this;
  }

  setOrderId(value) {
    this.order_id = value;
    return this;
  }

  setCustomerId(value) {
    this.customer_id = value;
    return this;
  }

  setPayer(value) {
    Client.Validate(value);
    this.payer = value;
    return this;
  }

  toObject() {
    return {
      keep_dunning: this.keep_dunning,
      email: this.email,
      due_date: this.due_date,
      ensure_workday_due_date: this.ensure_workday_due_date,
      items: this.items,
      notification_url: this.notification_url,
      ignore_canceled_email: this.ignore_canceled_email,
      ignore_due_email: this.ignore_due_email,
      payable_with: this.payable_with,
      order_id: this.order_id,
      customer_id: this.customer_id,
      payer: this.payer.toObject(),
    };
  }

  create = async () => {
    const { payer, ...invoice } = this.toObject();
    return this.doRequest(this.HTTP_METHODS.POST, null, {
      ...invoice,
      ...payer,
    });
  };

  capture = async (invoiceId) => {
    return this.doRequest(this.HTTP_METHODS.POST, `/${invoiceId}/capture`);
  };

  refund = async (invoiceId, partialValueRefundCents = 0) => {
    return this.doRequest(this.HTTP_METHODS.POST, `/${invoiceId}/refund`, {
      partial_value_refund_cents: partialValueRefundCents,
    });
  };

  duplicate = async (invoiceId, dueDate) => {
    return this.doRequest(this.HTTP_METHODS.POST, `/${invoiceId}/duplicate`, {
      due_date: dueDate,
    });
  };

  cancel = async (invoiceId) => {
    return this.doRequest(this.HTTP_METHODS.PUT, `/${invoiceId}/cancel`);
  };

  get = async (invoiceId) => {
    return this.doRequest(this.HTTP_METHODS.GET, `/${invoiceId}`);
  };

  list = async () => {
    return this.doRequest(this.HTTP_METHODS.GET);
  };

  sendToEmail = async (invoiceId) => {
    return this.doRequest(this.HTTP_METHODS.POST, `/${invoiceId}/send_email`);
  };
};
