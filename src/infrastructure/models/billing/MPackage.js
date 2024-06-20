'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MPackageSchema = new Schema({
  status: { type: Boolean, default: true },
  createAt: { type: Date, default: Date.now },
  purchasePrice: { type: Number, default: 0.00 }, // preço do pacote que o cliente irá pagar
  attributedValue: { type: Number, default: 0.00 }, // valor para ser atribuido em créditos para o cliente
  name: { type: String, deafult: null, unique: true, required: true }, // nome do pacote
  discountPercent: { type: Number, default: 0.00 } // percentual de desconto
}, {
  usePushEach: true
});

module.exports.MPackageSchema = MPackageSchema;
module.exports.MPackage = mongoose.model('MPackage', MPackageSchema);
