"use strict";

const { Schema, model } = require("mongoose");

const MUserKnowSchema = new Schema(
  {
    name: { type: String, default: true },
    document: { type: String, default: null },
    email: { type: String, default: null, lowercase: true },
    phoneNumber: { type: String, default: null },
    address: {
      uf: { type: String, default: null },
    },
    createdAt: { type: Date, default: Date.now },
  },
  {
    usePushEach: true,
  }
);

model("MUserKnow", MUserKnowSchema);
