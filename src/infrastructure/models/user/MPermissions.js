"use strict";

const { Schema, model } = require("mongoose");

const MPermissionsSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "MUser",
      required: true,
      unique: true,
    },
    views: [
      {
        state: { type: String, default: null },
        isBlock: { type: String, default: true },
        features: [
          {
            name: { type: String, default: null },
            isBlock: { type: String, default: true },
          },
        ],
      },
    ],
  },
  {
    usePushEach: true,
  }
);

model("MPermissions", MPermissionsSchema);
