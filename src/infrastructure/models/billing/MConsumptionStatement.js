'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MConsumptionStatementSchema = new Schema({
    createAt: { type: Date, default: Date.now },
    invoice: { type: Schema.Types.ObjectId, ref: 'MInvoice', default: null },
    billing: { type: Schema.Types.ObjectId, ref: 'MBilling', default: null },
    query: { type: Schema.Types.ObjectId, ref: 'MQuery', default: null },
    querycode: { type: Number, default: 0 },
    description: { type: String, default: null },
    tag: { type: String, default: null },
    status: { type: Boolean, default: false }, // se pago true, caso não false
    value: { type: Number, default: 0 },
    range: { type: Number, default: 0 },
    totalConsumptions: { type: Number, default: 0 },
    commission: {
        value: { type: Number, default: 0 },
        fixedBaseValue: { type: Number, default: 0 },
        percentage: { type: Number, default: 0.00 },
        fixedCosts: {
            isFatmin: { type: Boolean, default: false },
            isDspac: { type: Boolean, default: false },
        }
    },
    payday: { type: Date, default: null } // data de pagamento
}, {
    usePushEach: true
});

module.exports.MConsumptionStatement = mongoose.model(
    'MConsumptionStatement',
    MConsumptionStatementSchema
);
