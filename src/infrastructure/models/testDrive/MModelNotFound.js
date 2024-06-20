"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MModelNotFoundSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  plate: { type: String, default: null },
  brand: { type: String, default: null },
  model: { type: String, default: null },
  codModelBrand: { type: String, default: null },
  fipeId: { type: String, default: null },
  queryId: {
    type: Schema.Types.ObjectId,
    ref: "MTestDriveQuery",
    default: null,
  },
  userModelInformation: { type: String, default: null },
});

module.exports.MModelNotFoundSchema = MModelNotFoundSchema;
module.exports.MModelNotFound = mongoose.model(
  "MModelNotFound",
  MModelNotFoundSchema
);
