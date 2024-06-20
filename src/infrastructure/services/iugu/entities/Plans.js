"use strict";
const axios = require("axios");
const headerUtil = require("./header.util");

module.exports.Plans = class Plans {
  name;
  interval;
  interval_type;
  value_cents;
  identifier;
  payable_with;
  plan_id_for_manipulate;

  constructor(
    name,
    interval,
    interval_type,
    value_cents,
    identifier,
    payable_with
  ) {
    this.name = name;
    this.interval = interval;
    this.interval_type = interval_type;
    this.value_cents = value_cents;
    this.identifier = identifier;
    this.payable_with = payable_with;
    this.base_plan_url = "https://api.iugu.com/v1/plans";
  }

  setName(name) {
    this.name = name;
  }
  setInterval(interval) {
    this.interval = interval;
  }
  setIntervalType(interval_type) {
    this.interval_type = interval_type;
  }
  setValueCents(value_cents) {
    this.value_cents = value_cents;
  }
  setIdentifier(identifier) {
    this.identifier = identifier;
  }
  setPayableWith(payMethod) {
    this.payable_with = payMethod;
  }
  setPlanIdForManipulate(id) {
    this.plan_id_for_manipulate = id;
  }

  static Validate(plan) {
    if (!(plan instanceof Plans))
      throw new Error("address object must be a Address Type object");
  }

  createPlan = async (plan) => {
    const reqData = await axios.post(
      this.base_plan_url,
      headerUtil.makeHeader(),
      plan
    );
    return reqData.data;
  };

  updatePlan = async (id, plan) => {
    const reqData = await axios.put(
      this.base_plan_url + "/" + id,
      headerUtil.makeHeader(),
      plan
    );
    return reqData.data;
  };

  deletePlan = async (id) => {
    const reqData = await axios.delete(
      this.base_plan_url + "/" + id,
      headerUtil.makeHeader()
    );
    return reqData.data;
  };

  getPlan = async (id) => {
    const reqData = await axios.get(
      this.base_plan_url + "/" + id,
      headerUtil.makeHeader()
    );
    return reqData.data;
  };

  getPlanByIdentifier = async (id) => {
    const reqData = await axios.get(
      this.base_plan_url + "/identifier/" + id,
      headerUtil.makeHeader()
    );
    return reqData.data;
  };

  getPlans = async () => {
    const reqData = await axios.get(
      this.base_plan_url,
      headerUtil.makeHeader()
    );
    return reqData.data;
  };

  toObject() {
    return {
      name: this.name,
      interval: this.interval,
      interval_type: this.interval_type,
      value_cents: this.value_cents,
      identifier: this.identifier,
      payable_with: this.payable_with,
    };
  }
};
