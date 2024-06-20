'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MVoucherSchema = new Schema({
  creator: { type: Schema.Types.ObjectId, ref: "MUser", default: null },
  createAt: { type: Date, default: Date.now },
  status: { type: Boolean, default: true },
  code: { type: String, default: null },
  creditsToApply: { type: Number, default: 0 },
  dateOfUse: { type: Date, default: null },
  user: { type: Schema.Types.ObjectId, ref: "MUser", defualt: null }
});

module.exports.MVoucherSchema = MVoucherSchema;
module.exports.MVoucher = mongoose.model('MVoucher', MVoucherSchema);
