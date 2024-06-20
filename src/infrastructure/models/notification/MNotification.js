'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MNotificationSchema = new Schema({
  createAt: { type: Date, default: Date.now },
  type: { type: String, default: null },
  title: { type: String, default: null },
  subTitle: { type: String, default: null },
  description: { type: String, default: null },
  icon: { type: String, default: null },
  redirectTo: { type: String, default: null },
  redirectBlog: { type: String, default: null }
});

module.exports.MNotificationSchema = MNotificationSchema;
module.exports.MNotification = mongoose.model('MNotification', MNotificationSchema);
