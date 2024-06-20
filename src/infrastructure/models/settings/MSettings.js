'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MSettingsSchema = new Schema({
  theme: {
    name: { type: String, default: null },
    path: { type: String, default: null }
  },
  layout: {
    topSideBar: {
      backgroundColor: { type: String, default: null },
    },
    bandTitle: {
      fontColor: { type: String, default: null },
      backgroundColor: { type: String, default: null },
    },
    buttons: {
      class: { type: String, default: null },
      backgroundColor: { type: String, default: null },
      hoverColor: { type: String, default: null }

    },
    hasAvatar: { type: Boolean, default: true }
  },
  user: { type: Schema.Types.ObjectId, ref: "MUser", required: true, unique: true, default: null },
  createAt: { type: Date, default: Date.now }
});

module.exports.MSettingsSchema = MSettingsSchema;
module.exports.MSettings = mongoose.model("MSettings", MSettingsSchema);
