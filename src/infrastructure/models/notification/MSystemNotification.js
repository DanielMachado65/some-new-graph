'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MSystemNotificationSchema = new Schema({
  createAt: { type: Date, default: Date.now },
  type: { type: String, default: null },
  title: { type: String, default: null },
  description: { type: String, default: null },
  icon: { type: String, default: null },
  redirectTo: { type: String, default: null },
  visualized: { type: Boolean, default: false }
});

module.exports.MSystemNotificationSchema = MSystemNotificationSchema;
module.exports.MSystemNotification = mongoose.model('MSystemNotification', MSystemNotificationSchema);
