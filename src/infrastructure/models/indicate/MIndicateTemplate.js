"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MIndicateTemplateSchema = new Schema({
  creator: { type: Schema.Types.ObjectId, ref: "MUser", default: null },
  title: { type: String, default: null },
  description: { type: String, default: null },
  status: { type: Boolean, default: false },
  commission: { type: Number, default: null },
  percentage: { type: Number, default: null },
  version: { type: Number, default: null },
  dataToShare: {
    text: { type: String, default: null },
    url: { type: String, default: null },
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports.MIndicateSchema = MIndicateTemplateSchema;
module.exports.MIndicateTemplate = mongoose.model(
  "MIndicateTemplate",
  MIndicateTemplateSchema
);
