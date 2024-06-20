'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MLogSchema = new Schema({
  createAt: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: 'MUser', default: null },
  query: { type: Schema.Types.ObjectId, ref: 'MQuery', default: null },
  status: { type: Boolean, default: false },
  error: { type: String, default: null },
  code: { type: Number, default: 0 }
});

module.exports.MLogSchema = MLogSchema;
module.exports.MLog = mongoose.model('MLog', MLogSchema);
