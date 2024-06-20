"use strict";

const { model, Schema } = require("mongoose");

const MAnalyticsSchema = new Schema(
  {
    email: { type: String, default: null },
    link: { type: String, default: null },
    placa: { type: String, default: null },
    queryId: {
      type: Schema.Types.ObjectId,
      ref: "MQuery",
      default: null,
    },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

model("MAnalytics", MAnalyticsSchema);
