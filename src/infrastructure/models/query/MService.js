'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MServiceSchema = new Schema({
  createAt: { type: Date, default: Date.now },
  status: { type: Boolean, default: true },
  code: { type: Number, default: 0, required: true, unique: true },
  name: { type: String, default: null },
  supplier: {
    name: { type: String, default: null },
    supplierCode: { type: Number, default: 0 }
  },
  hasAutoSwitching: { type: Boolean, default: false },
  switching: [
    {
      supplier: { type: Number, default: 0 },
      name: { type: String, default: null },
      service: { type: Schema.Types.ObjectId, ref: 'MService', default: null },
      priority: { type: Number, default: 0 }, // de 1 à 5
    }
  ],
  minimumPrice: { type: Number, default: 0.0 }
}, {
  usePushEach: true
});

module.exports.MServiceSchema = MServiceSchema;
module.exports.MService = mongoose.model('MService', MServiceSchema);
