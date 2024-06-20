"use strict";

const { Schema, model } = require("mongoose");

const MUserConvertedSchema = new Schema({
  email: { type: String, default: true, required: true, unique: true },
  ip: { type: String, default: null },
  cpf: { type: String, default: true },
  isOwnerVehicle: { type: Boolean, default: false },
  createAt: { type: Date, default: Date.now },
  key: { type: String, default: null },
});

model("MUserConverted", MUserConvertedSchema);
