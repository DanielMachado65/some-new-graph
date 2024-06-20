'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MGatewaySchema = new Schema({
    createAt: { type: Date, default: Date.now },
    user: { type: Schema.Types.ObjectId, ref: 'MUser', default: null },
    payment: { type: Schema.Types.ObjectId, ref: 'MPayment', default: null },
    gatewayName: { type: String, default: null },
    gatewayResponse: { type: Schema.Types.Object, default: null }
});

module.exports.MGatewaySchema = MGatewaySchema;
module.exports.MGateway = mongoose.model('MGateway', MGatewaySchema);
