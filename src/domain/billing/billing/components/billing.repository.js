"use strict";

const mongoose = require("mongoose");
const { MBilling } = mongoose.models;
const {
  BaseRepository,
} = require("../../../../infrastructure/repository/BaseRepository");

class BillingRepository extends BaseRepository {
  constructor() {
    super(MBilling);
  }

  async getBillingByUserId(userId, projection = {}) {
    return this.model.findOne({ user: userId }, projection).lean().exec();
  }

  getByIdWithPriceTable(billingId, projection = {}) {
    return this.model
      .findOne({ _id: billingId }, projection)
      .populate([
        {
          path: "priceTable",
          select: "name template",
        },
      ])
      .lean();
  }


  async updateAccountFundsv2(billId, credits) {
    const billing = await this.model.findOne({
      _id: billId,
    });
    const accountFunds = billing.accountFunds;
  
    billing.accountFunds = credits;
    await billing.save();
    return {
      accountFunds,
      billing
    };
  }
}

module.exports = new BillingRepository();
