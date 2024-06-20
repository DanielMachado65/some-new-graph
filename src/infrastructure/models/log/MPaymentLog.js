"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MPaymentLogSchema = new Schema({
  createAt: { type: Date, default: Date.now },
  chargeId: { type: String, default: null },
  payment: { type: Schema.Types.ObjectId, ref: "MPayment", default: null },
  token: { type: String, default: null },
  raw: { type: Schema.Types.Mixed, default: null },
});

module.exports.MPaymentLogSchema = MPaymentLogSchema;
module.exports.MPaymentLog = mongoose.model("MPaymentLog", MPaymentLogSchema);
