'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MVehicularMonitoringSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'MUser',
    default: null
  },
  subscription: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'MSubscription',
    default: null
  },
  createAt: {
    type: Date,
    default: Date.now
  },
  keys: {
    placa: {
      type: String,
      default: null
    }
  },
}, {
  usePushEach: true
});

module.exports.MVehicularMonitoringSchema = MVehicularMonitoringSchema;
module.exports.MVehicularMonitoring = mongoose.model('MVehicularMonitoring', MVehicularMonitoringSchema);
