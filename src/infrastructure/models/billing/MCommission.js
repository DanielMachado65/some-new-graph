'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MCommissionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "MUser", default: null },
  registrationFee: { type: Number, default: 0.00 },
  referenceMonth: { type: Number, default: null },
  referenceYear: { type: Number, default: null },
  paymentDate: { type: Date, default: null },
  commissionTotalValue: { type: Number, default: 0.00 },
  createAt: { type: Date, default: Date.now },
  consumptionStatements: [{ type: Schema.Types.ObjectId, ref: 'MConsumptionStatement', default: null }]
}, {
  usePushEach: true
});

module.exports.MCommissionSchema = MCommissionSchema;
module.exports.MCommission = mongoose.model('MCommission', MCommissionSchema);
