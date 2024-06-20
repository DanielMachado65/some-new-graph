"use strict";

const { model, Schema } = require("mongoose");

const MQueryInfoSchema = new Schema(
  {
    image: { type: String, default: "" },
    name: { type: String, default: "" },
    description: { type: String, default: "" },
    isAvailable: {
      type: String,
      default: "none",
      enum: ["none", "maybe", "always"],
    },
    isAvailableToOthers: {
      type: String,
      default: "none",
      enum: ["none", "maybe", "always"],
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

model("MQueryInfo", MQueryInfoSchema);
