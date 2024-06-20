"use strict";

const { model, Schema } = require("mongoose");

const MCityZipCodeSchema = new Schema(
  {
    city: { type: String, default: null },
    state: { type: String, default: null },
    zipcode: { type: String, default: null },
  },
  {
    timestamps: {
      createdAt: "createAt",
      updatedAt: "updateAt",
    },
  }
);

model("MCityZipCode", MCityZipCodeSchema);