"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InvoiceStatusDict = require("../../dictionaries/InvoiceStatus.dictionary");

const MInvoiceSchema = new Schema(
  {
    createAt: { type: Date, default: Date.now },
    initialDate: { type: Date, default: null },
    expirationDate: { type: Date, default: null },
    billing: { type: Schema.Types.ObjectId, ref: "MBilling", default: null },
    payment: { type: Schema.Types.ObjectId, ref: "MPayment", default: null },
    consumptionStatementLote: [
      { type: Schema.Types.ObjectId, ref: "MConsumptionStatement" },
    ],
    status: { type: String, default: InvoiceStatusDict.get(1) },
    value: { type: Number, default: 0.0 },
    paymenteDate: { type: Date, default: null },
    notification: {
      sentEmails: { type: Number, default: 0 },
      hasBeenNotified: { type: Boolean, default: false },
      lastNotificationDate: { type: Date, default: null },
    },
    accumulatedInvoices: [
      {
        description: { type: String, default: null },
        totalValue: { type: Number, default: 0.0 },
        createAt: { type: Date, default: Date.now },
        refInvoice: {
          type: Schema.Types.ObjectId,
          ref: "MInvoice",
          default: null,
        },
      },
    ],
    discounts: [
      {
        motive: { type: String, default: null },
        user: { type: Schema.Types.ObjectId, ref: "MUser", default: null },
        createAt: { type: Date, default: Date.now },
        value: { type: Number, default: 0.0 },
      },
    ],
    refYear: { type: Number, default: 0 },
    refMonth: { type: Number, default: 0 },
  },
  {
    usePushEach: true,
  }
);

module.exports.MInvoiceSchema = MInvoiceSchema;
module.exports.MInvoice = mongoose.model("MInvoice", MInvoiceSchema);
