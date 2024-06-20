"use strict";

const { model, Schema } = require("mongoose");

const NFeEmissionControllerSchema = new Schema(
  {
    month: { type: Number, required: true },
    year: { type: Number, required: true },
    status: { type: Boolean, required: true, default: true },
    generatedValue: { type: Schema.Types.Decimal128, default: 0.0 },
    limitValue: { type: Schema.Types.Decimal128, default: 0.0 },
  },
  {
    timestamps: true,
  }
);

model("NFeEmissionController", NFeEmissionControllerSchema);
