'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MIndicationSchema = new Schema({
  indicator: { type: Schema.Types.ObjectId, ref: 'MUser', default: null },
  client: { type: Schema.Types.ObjectId, ref: 'MUser', default: null },
  indicateTemplate: { type: Schema.Types.ObjectId, ref: 'MIndicateTemplate', default: null },
  payment: { type: Schema.Types.ObjectId, ref: 'MPayment', default: null },
  updatedAt: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
});

module.exports.MIndicationSchema = MIndicationSchema;
module.exports.MIndication = mongoose.model('MIndication', MIndicationSchema);
