'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MBalanceSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "MUser", default: null },
  assigner: {
    isSystem: { type: Boolean, default: true },
    user: { type: Schema.Types.ObjectId, ref: "MUser", default: null },
  },
  consumptionItem: { type: Schema.Types.ObjectId, ref: "MConsumptionStatement", default: null },
  createAt: { type: Date, default: Date.now },
  lastBalance: { type: Number, default: 0.0 },
  currentBalance: { type: Number, default: 0.0 },
  attributedValue: { type: Number, default: 0.0 }
}, {
  usePushEach: true
});

module.exports.MBalanceSchema = MBalanceSchema;
module.exports.MBalance = mongoose.model('MBalance', MBalanceSchema);
