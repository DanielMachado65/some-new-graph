"use strict";
const axios = require("axios");
const headerUtil = require("./header.util");
const util = require("../../../utils/utils");

module.exports.Subscription = class Subscription {
  customer_id;
  plan_identifier;
  expires_at;
  payable_with;
  ignore_due_email;
  signature_id_for_manipulate;
  constructor(
    customer_id,
    plan_identifier,
    expires_at,
    payable_with,
    ignore_due_email
  ) {
    this.customer_id = customer_id;
    this.plan_identifier = plan_identifier;
    this.expires_at = expires_at;
    this.payable_with = payable_with;
    this.ignore_canceled_email = true;
    this.ignore_due_email = true;
    this.base_subscription_url = "https://api.iugu.com/v1/subscriptions";
  }

  static Status = Object.freeze({
    AGUARDANDO: "AGUARDANDO",
    ATIVO: "ATIVO",
    CANCELADO: "CANCELADO",
  });

  static Validate(subscription) {
    if (!(subscription instanceof Subscription))
      throw new Error("address object must be a Address Type object");
  }

  setCustomerId(customer_id) {
    this.customer_id = customer_id;
  }

  setPlanIdentifier(plan_identifier) {
    this.plan_identifier = plan_identifier;
  }

  setExpiresAt(expires_at) {
    this.expires_at = expires_at;
  }

  setPayableWith(payMethod) {
    this.payable_with = payMethod;
  }

  setIgnoreDueEmail(ignore_due_email) {
    this.ignore_due_email = ignore_due_email;
  }

  setSignatureIdForManipulate(id) {
    this.signature_id_for_manipulate = id;
  }

  createSubscription = async (subscription) => {
    const reqData = await axios.post(
      this.base_subscription_url,
      headerUtil.makeHeader(),
      subscription
    );
    return reqData.data;
  };

  activateSubscription = async (id) => {
    const reqData = await axios.post(
      `${this.base_subscription_url}/${id}/activate`,
      headerUtil.makeHeader()
    );
    return reqData.data;
  };

  deactivateSubscription = async (id) => {
    const reqData = await axios.post(
      `${this.base_subscription_url}/${id}/suspend`,
      headerUtil.makeHeader()
    );
    return reqData.data;
  };

  updateSubscription = async (id, subscription) => {
    const reqData = await axios.put(
      `${this.base_subscription_url}/${id}`,
      headerUtil.makeHeader(),
      subscription
    );
    return reqData.data;
  };

  addCreditsToSubscription = async (id, quantity) => {
    const reqData = await axios.put(
      `${this.base_subscription_url}/${id}/add_credits`,
      headerUtil.makeHeader(),
      quantity
    );
    return reqData.data;
  };

  removeCreditsOfSubscription = async (id, quantity) => {
    const reqData = await axios.put(
      `${this.base_subscription_url}/${id}/remove_credits`,
      headerUtil.makeHeader(),
      quantity
    );
    return reqData.data;
  };

  deleteSubscription = async (id) => {
    const reqData = await axios.delete(
      `${this.base_subscription_url}/${id}`,
      headerUtil.makeHeader()
    );
    return reqData.data;
  };

  getSubscription = async (id) => {
    const reqData = await axios.get(
      `${this.base_subscription_url}/${id}`,
      headerUtil.makeHeader()
    );
    return reqData.data;
  };

  getSubscritpions = async () => {
    const reqData = await axios.get(
      `${this.base_subscription_url}`,
      headerUtil.makeHeader()
    );
    return reqData.data;
  };

  subscriptionStatusEnum = (code) => {
    code = typeof code === "string" ? util.tryParseInt(code) : code;
    switch (code) {
      case 1:
        return "AGUARDANDO";
      case 2:
        return "ATIVO";
      case 3:
        return "CANCELADO";
      default:
        return "AGUARDANDO";
    }
  };

  toObject() {
    return {
      customer_id: this.customer_id,
      plan_identifier: this.plan_identifier,
      expires_at: this.expires_at,
      payable_with: this.payable_with,
      ignore_canceled_email: this.ignore_canceled_email,
      ignore_due_email: this.ignore_due_email,
    };
  }
};
