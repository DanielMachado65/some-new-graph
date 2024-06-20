'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MQueryRawLogSchema = new Schema({
  createAt: { type: Date, default: Date.now },
  key: { type: Schema.Types.Mixed, default: null },
  rawData: { type: Schema.Types.Mixed, default: null },
  error: { type: Schema.Types.Mixed, default: null }
});

module.exports.MQueryRawLogSchema = MQueryRawLogSchema;
module.exports.MQueryRawLog = mongoose.model('MQueryRawLog', MQueryRawLogSchema);
