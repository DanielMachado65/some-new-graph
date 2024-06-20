"use strict";

const { model, Schema } = require("mongoose");
const {
  NFe: { Status },
} = require("@diegomoura637/enotas-service");

const NFeSchema = new Schema(
  {
    status: {
      type: String,
      enum: [
        Status.HOPE_FOR_AUTHORIZATION,
        Status.HOPE_FOR_BE_CANCELED,
        Status.CANCEL_WAS_DENIED,
        Status.NOT_SENT,
        Status.AUTHORIZED,
        Status.DENIED,
        Status.ERROR_SENT,
      ],
      default: Status.HOPE_FOR_AUTHORIZATION,
    },
    description: { type: String },
    xmlLink: { type: String },
    pdfLink: { type: String },
    value: { type: Schema.Types.Decimal128, default: 0.0 },
    user: { type: Schema.Types.ObjectId, ref: "MUser", required: true },
    payment: { type: Schema.Types.ObjectId, ref: "MPayment", required: true },
    externalNfeId: { type: String, default: null },
    cnpj: { type: String, default: '25400804000109' },
    isManuallyGenerated: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

model("MNFe", NFeSchema);
