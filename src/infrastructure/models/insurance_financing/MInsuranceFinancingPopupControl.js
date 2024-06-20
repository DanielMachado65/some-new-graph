"use strict";

const { model, Schema } = require("mongoose");

const MInsuranceFinancingPopupControlSchema = new Schema({
  wasShown: { type: Boolean, default: true },
  query: { type: Schema.Types.ObjectId, ref: "MQuery", required: true },
});

model("MInsuranceFinancingPopupControl", MInsuranceFinancingPopupControlSchema);
