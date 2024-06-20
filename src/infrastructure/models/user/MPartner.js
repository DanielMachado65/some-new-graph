"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PartnerTypesEnum = require("../../dictionaries/PartnerTypesEnum");

const MPartnerSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "MUser",
      required: true,
      unique: true,
    },
    partnerType: { type: String, default: PartnerTypesEnum(1) },
    percentage: { type: Number, default: 0.0 },
    rules: {
      queries: [
        {
          queryComposition: {
            type: Schema.Types.ObjectId,
            ref: "MQueryComposer",
            default: null,
          },
          cost: { type: Number, default: 0.0 },
        },
      ],
      billing: {
        financialLockLimit: { type: Number, default: 0.0 },
        accountFundsLimit: { type: Number, default: 0.0 },
        registerRate: { type: Number, default: 0.0 },
        gateways: {
          gerenciaNet: {
            clientSecret: { type: String, deafult: null },
            clientId: { type: String, deafult: null },
          },
        },
      },
      user: {
        hasDisableUsers: { type: Boolean, default: false },
      },
      coupons: {
        discountPercentage: { type: Number, default: 0 },
        discountValue: { type: Number, default: 0 },
        minValueToApply: { type: Number, default: 0 },
        limitUsage: { type: Number, default: Number.MAX_SAFE_INTEGER },
      },
    },
  },
  {
    usePushEach: true,
  }
);

module.exports.MPartnerSchema = MPartnerSchema;
module.exports.MPartner = mongoose.model("MPartner", MPartnerSchema);
