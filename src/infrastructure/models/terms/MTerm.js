'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MTermSchema = new Schema({
  title: { type: String, default: null },
  status: { type: Boolean, default: false },
  version: { type: Number, default: 1.0 },
  body: { type: String, default: null },
  createAt: { type: Date, default: Date.now }
});

module.exports.MTermSchema = MTermSchema;
module.exports.MTerm = mongoose.model('MTerm', MTermSchema);
