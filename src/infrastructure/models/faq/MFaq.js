"use strict";

const { model, Schema } = require("mongoose");

const MFaqSchema = new Schema(
  {
    title: { type: String, default: null },
    answer: { type: String, default: null },
    type: {
      type: String,
      default: "all",
      enum: ["all", "query", "package", "signature"],
    },
    deleteAt: { type: Date, default: null },
  },
  {
    timestamps: {
      createdAt: "createAt",
      updatedAt: "updateAt",
    },
  }
);

model("MFaq", MFaqSchema);
