"use strict";

const { Schema, model } = require("mongoose");

const MRecommendationSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "MUser", required: true },
    name: { type: String, default: null },
    email: { type: String, default: null },
    company: { type: String, default: null },
    nominative: {
      name: { type: String, default: null },
      email: { type: String, default: null },
      company: { type: String, default: null },
      phoneNumber: { type: String, default: null },
      accessAt: { type: Date, default: null },
      adherenceAt: { type: Date, default: null },
    },
    additionalInformation: { type: String, default: null },
    createAt: { type: Date, default: Date.now },
  },
  {
    usePushEach: true,
  }
);

model("MRecommendation", MRecommendationSchema);
