'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MControlUserNavigationSchema = new Schema({
  user: { type: Schema.Types.Object, ref: "MUser", default: null, unique: true },
  dialog: {
    phoneNumber: {
      timesClosed: { type: Number, default: 0 },
    },
  },
  createAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: null }
});

module.exports.MControlUserNavigationSchema = MControlUserNavigationSchema;
module.exports.MControlUserNavigation = mongoose.model('MControlUserNavigation', MControlUserNavigationSchema);
