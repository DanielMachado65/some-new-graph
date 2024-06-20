'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MFrontLogSchema = new Schema(
  {
    ip: { type: String, default: null },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'MUser',
      default: null,
    },
    navigator: {
      downlink: { type: Number, default: null },
      platform: { type: String, default: null },
      userAgent: { type: String, default: null },
    },
    name: { type: String, default: null },
    runningApplication: { type: String, default: null },
    code: { type: String, default: null },
    description: { type: String, default: null },
    fn: { type: String, default: null },
    details: { type: String, default: null },
    status: {
      result: { type: Boolean, default: false },
      value: { type: Schema.Types.Mixed, default: null },
    },
    data: { type: Schema.Types.Object, default: null },
    payment: { type: Schema.Types.Object, default: null },
    creditsLog: {
      type: Schema.Types.ObjectId,
      ref: 'MCreditsLog',
      default: null,
    },
    gatewayLog: {
      type: Schema.Types.ObjectId,
      ref: 'MGateway',
      default: null,
    },
    kondutoLog: {
      type: Schema.Types.ObjectId,
      ref: 'MKondutoLog',
      default: null,
    },
    paymentLog: {
      type: Schema.Types.ObjectId,
      ref: 'MPaymentLog',
      default: null,
    },
    paymentErrorLog: {
      type: Schema.Types.ObjectId,
      ref: 'MPaymentErrorLog',
      default: null,
    },
  },
  {
    timestamps: {
      createdAt: 'createAt',
      updatedAt: 'updateAt',
    },
  },
);

module.exports.MFrontLogSchema = MFrontLogSchema;
module.exports.MFrontLog = mongoose.model('MFrontLog', MFrontLogSchema);

