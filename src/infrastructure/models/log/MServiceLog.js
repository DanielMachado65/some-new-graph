'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MServiceLogSchema = new Schema({
  log: { type: Schema.Types.ObjectId, ref: "MLog" },
  serviceCode: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
  status: { type: Boolean, default: true },
  error: { type: String, default: null },
  reprocessing: {
    is: { type: Boolean, default: false },
    count: { type: Number, default: 0 },
    last: { type: Date, default: null },
    originalServiceCode: { type: Number, default: 0 }
  }
});

module.exports.MServiceLogSchema = MServiceLogSchema;
module.exports.MServiceLog = mongoose.model('MServiceLog', MServiceLogSchema);
