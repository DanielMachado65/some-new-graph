'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MQueryComposerLogSchema = new Schema({
  createAt: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: 'MUser', default: null },
  requester: { type: String, default: null },
  query: { type: Schema.Types.ObjectId, ref: 'MQuery', default: null },
  status: { type: Boolean, default: false },
  message: { type: String, default: null, required: true }
});

module.exports.MQueryComposerLogSchema = MQueryComposerLogSchema;
module.exports.MQueryComposerLog = mongoose.model('MQueryComposerLog', MQueryComposerLogSchema);
