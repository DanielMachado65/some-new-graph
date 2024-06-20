"use strict";

const { Schema, model } = require("mongoose");

function getMonth() {
  return new Date().getMonth();
}

function getYear() {
  return new Date().getFullYear();
}

const MPreviewControlSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "MUser", default: null },
    payment: { type: Schema.Types.ObjectId, ref: "MPayment", default: null },
    refYear: { type: Number, default: getMonth },
    refMonth: { type: Number, default: getYear },
  },
  {
    usePushEach: true,
    timestamps: true,
  }
);

model("MPreviewControl", MPreviewControlSchema);
