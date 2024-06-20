"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const {
  getYearToCorrectTimeZone,
  getMonthToCorrectTimeZone,
} = require("../../utils/date.util");

const MFeedbackSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "MUser",
    default: null,
    required: true,
  },
  query: { type: Schema.Types.ObjectId, ref: "MQuery", default: null },
  evaluation: { type: Number, default: 0 },
  description: { type: String, default: null },
  refMonth: { type: Number, default: getMonthToCorrectTimeZone },
  refYear: { type: Number, default: getYearToCorrectTimeZone },
  createdAt: { type: Date, default: Date.now },
});

mongoose.model("MFeedback", MFeedbackSchema);
