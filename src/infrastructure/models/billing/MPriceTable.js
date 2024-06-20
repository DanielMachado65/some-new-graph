"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MPriceTableSchema = new Schema(
  {
    creator: { type: Schema.Types.ObjectId, ref: "MUser", default: null },
    createAt: { type: Date, default: Date.now },
    name: { type: String, default: null, unique: true, required: true },
    plan: { type: Schema.Types.ObjectId, ref: "MPlan", default: null },
    template: [
      {
        querycode: { type: Number, default: 0, required: true },
        queryComposer: {
          type: Schema.Types.ObjectId,
          ref: "MQueryComposer",
          default: null,
        },
        marketingPrice: { type: Number, default: 0.0 },
        totalPrice: { type: Number, default: 0.0 },
        oldPrice: { type: Number, default: 0.0 },
        consumptionRanges: [
          {
            rangeStart: { type: Number, default: 0, required: true },
            price: { type: Number, default: 0.0, required: true },
          },
        ],
      },
    ],
  },
  {
    usePushEach: true,
  }
);

module.exports.MPriceTableSchema = MPriceTableSchema;
module.exports.MPriceTable = mongoose.model("MPriceTable", MPriceTableSchema);
