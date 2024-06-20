'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MMailLogSchema = new Schema({
  createAt: { type: Date, default: Date.now },
  type: { type: String, default: null },
  mailTo: { type: String, default: null }
});

module.exports.MMailLogSchema = MMailLogSchema;
module.exports.MMailLog = mongoose.model('MMailLog', MMailLogSchema);
