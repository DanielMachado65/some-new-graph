'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MKondutoLogSchema = new Schema({
  createAt: { type: Date, default: Date.now },
  userId: { type: Schema.Types.ObjectId, ref: "MUser", default: null },
  order: { type: Schema.Types.Object, default: null },
  responseOrder: { type: Schema.Types.Object, default: null }
});

mongoose.model('MKondutoLog', MKondutoLogSchema);
