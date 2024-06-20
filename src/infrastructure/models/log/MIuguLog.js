'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MIuguLogSchema = new Schema({
  event: { type: String, default: null },
  data: { type: Schema.Types.Object, default: null },
  error: { type: Schema.Types.Object, default: null },
  createAt: { type: Date, default: Date.now },
});

module.exports.MIuguLogSchema = MIuguLogSchema;
module.exports.MIuguLog = mongoose.model('MIuguLog', MIuguLogSchema);
