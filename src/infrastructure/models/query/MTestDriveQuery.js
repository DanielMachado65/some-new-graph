"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MTestDriveQuerySchema = new Schema(
  {
    createAt: { type: Date, default: Date.now },
    documentQuery: { type: String, default: null },
    documentType: { type: String, default: null },
    executionTime: { type: String, default: null },
    user: {
      type: Schema.Types.ObjectId,
      ref: "MUser",
      default: null,
    },
    keys: {
      placa: { type: String, default: null },
      chassi: { type: String, default: null },
      motor: { type: String, default: null },
      renavam: { type: String, default: null },
      uf: { type: String, default: null },
    },
    refClass: { type: String, default: null },
    responseJSON: { type: Schema.Types.Mixed, default: null },
    stackResult: [
      {
        rawData: { type: Schema.Types.Mixed, default: null },
        serviceLog: {
          type: Schema.Types.ObjectId,
          ref: "MServiceLog",
          default: null,
        },
        serviceCode: { type: Number, default: 0 },
        dataFound: { type: Boolean, default: true },
        hasError: { type: Boolean, default: false },
        supplierCode: { type: Number, default: 0 },
      },
    ],
    failedServices: [
      {
        serviceLog: {
          type: Schema.Types.ObjectId,
          ref: "MServiceLog",
          default: null,
        },
        serviceCode: { type: Number, default: 0 },
        serviceName: { type: String, default: null },
        supplierCode: { type: Number, default: 0 },
      },
    ],
    status: { type: Boolean, default: true },
    code: { type: Number, default: 0 },
    log: {
      error: { type: String, default: null },
    },
    userActions: {
      chosenFipeId: { type: String, default: null },
      chosenVersion: { type: String, default: null },
    },
    control: {
      requestIp: { type: String, default: null },
    },
  },
  {
    usePushEach: true,
  }
);

module.exports.MTestDriveQuerySchema = MTestDriveQuerySchema;
module.exports.MTestDriveQuery = mongoose.model(
  "MTestDriveQuery",
  MTestDriveQuerySchema
);