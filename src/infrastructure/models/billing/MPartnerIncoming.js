"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MPartnerIncomingSchema = new Schema({
  partner: { type: Schema.Types.ObjectId, ref: "MUser", default: null },
  user: { type: Schema.Types.ObjectId, ref: "MUser", default: null },
  payment: { type: Schema.Types.ObjectId, ref: "MPayment", default: null },
  coupon: { type: Schema.Types.ObjectId, ref: "MCoupon", default: null },
  couponCode: { type: String, default: null },
  incomingRefValue: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports.MPartnerIncomingSchema = MPartnerIncomingSchema;
module.exports.MPartnerIncoming = mongoose.model(
  "MPartnerIncoming",
  MPartnerIncomingSchema
);
