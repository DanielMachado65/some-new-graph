"use strict";

const { model, Schema } = require("mongoose");
const paginate = require("mongoose-paginate-v2");

const { getDateWithCorrectTimeZone } = require("../../utils/date.util");

const _getMonth = () => getDateWithCorrectTimeZone().getMonth();
const _getYear = () => getDateWithCorrectTimeZone().getFullYear();

const MInsuranceFinancingSchema = new Schema({
  createAt: { type: Date, default: Date.now },
  status: { type: Boolean, default: true },
  user: {
    userInterested: {
      type: Schema.Types.ObjectId,
      ref: "MUser",
      required: true,
    },
    name: { type: String, default: null },
    email: { type: String, default: null },
    phone: { type: String, default: null },
  },
  query: { type: Schema.Types.ObjectId, ref: "MQuery", required: true },
  vehicle: {
    plate: { type: String, default: null },
    chassi: { type: String, default: null },
    renavam: { type: String, default: null },
    modelAndBrand: { type: String, default: null },
    fipeTable: { type: String, default: null },
  },
  hasInterestInVehicularInsuranceQuote: {
    type: Boolean,
    required: true,
    default: false,
  },
  hasInterestInVehicularFinancingQuote: {
    type: Boolean,
    required: true,
    default: false,
  },
  hasAcceptedFormToShareOwnInfos: {
    type: Boolean,
    required: true,
    default: false,
  },
  month: { type: Number, default: _getMonth },
  year: { type: Number, default: _getYear },
});

MInsuranceFinancingSchema.plugin(paginate);

model("MInsuranceFinancing", MInsuranceFinancingSchema);
