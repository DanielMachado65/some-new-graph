'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MCreditsLogSchema = new Schema({
  createAt: { type: Date, default: Date.now },
  billing: { type: Schema.Types.ObjectId, ref: 'MBilling', default: null },
  payment: { type: Schema.Types.ObjectId, ref: 'MPayment', default: null },
  valueCredited: { type: Number, default: 0 },
  status: { type: Boolean, default: false },
  message: { type: String, default: null }
});

module.exports.MCreditsLogSchema = MCreditsLogSchema;
module.exports.MCreditsLog = mongoose.model('MCreditsLog', MCreditsLogSchema);
