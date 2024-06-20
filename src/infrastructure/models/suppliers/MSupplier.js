'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MSupplierSchema = new Schema({
  createAt: { type: Date, default: Date.now },
  name: { type: String, default: null },
});

module.exports.MSupplierSchema = MSupplierSchema;
module.exports.MSupplier = mongoose.model('MSupplier', MSupplierSchema);
