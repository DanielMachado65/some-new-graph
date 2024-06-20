'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MPaymentErrorLogSchema = new Schema({
  createAt: { type: Date, default: Date.now },
  billing: { type: Schema.Types.ObjectId, ref: 'MBilling', default: null },
  payment: { type: Schema.Types.Mixed, default: null },
  error: { type: Schema.Types.Mixed, default: null }
});

module.exports.MPaymentErrorLogSchema = MPaymentErrorLogSchema;
module.exports.MPaymentErrorLog = mongoose.model('MPaymentErrorLog', MPaymentErrorLogSchema);
