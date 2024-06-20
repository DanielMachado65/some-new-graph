'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MDealerSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'MUser', required: true, unique: true }
});

module.exports.MDealerSchema = MDealerSchema;
module.exports.MDealer = mongoose.model('MDealer', MDealerSchema);
