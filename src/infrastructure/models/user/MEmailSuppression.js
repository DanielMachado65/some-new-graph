"use strict";

const { Schema, model } = require("mongoose");
const { isEmail } = require("validator");

const MEmailSuppression = new Schema(
  {
    ip: { type: String, default: null },
    user: {
      type: Schema.Types.ObjectId,
      ref: "MUser",
      required: true,
      unique: true,
    },
    email: {
      type: String,
      validate: {
        validator: function (email) {
          return isEmail(email);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
      required: [true, "E-mail is required"],
    },
    status: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

model("MEmailSuppression", MEmailSuppression);
