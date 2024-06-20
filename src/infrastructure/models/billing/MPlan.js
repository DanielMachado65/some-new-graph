"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PlansTypeDict = require("../../dictionaries/plan/PlansType.dictionary");

const valueValidator = (val) => {
  return val >= 100 && !isNaN(val);
};

const intervalValidator = (interval) => {
  return interval >= 1 && !isNaN(interval);
};

const MPlanSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "MUser",
      default: null,
    },
    status: {
      type: Boolean,
      default: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    interval: {
      type: Number,
      default: 1,
      required: true,
      validate: [
        intervalValidator,
        "The billing interval must be greater than 1",
      ],
    },
    intervalType: {
      type: String,
      default: "months",
      validate: {
        validator: (o) => {
          return ["months", "weeks"].includes(o);
        },
        message: (props) => {
          return (
            props +
            " =>  Its not a valid interval type. IntervalTypes : ['months','weeks']"
          );
        },
      },
      required: true,
    },
    valueCents: {
      type: Number,
      validate: [valueValidator, "The target value must be greater than 100"],
      required: true,
      default: 100,
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
    deactivatedAt: {
      type: Date,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    textLabels: [
      {
        value: {
          type: String,
          default: null,
        },
        description: {
          type: String,
          default: null,
        },
      },
    ],
    addCredits: {
      type: Boolean,
      default: true,
    },
    badgeImage: {
      type: String,
      default: null,
    },
    payableWith: {
      type: String,
      default: "all",
      enum: ["all", "credit_card", "bank_slip"],
      required: [true, "Need be setted a payable way"],
    },
    type: {
      type: String,
      default: null,
    },
    externalId: {
      type: String,
      default: null,
    },
  },
  {
    usePushEach: true,
  }
);

MPlanSchema.pre("save", async function () {
  this.type = PlansTypeDict.get(this.type);
});

module.exports.MPlanSchema = MPlanSchema;
module.exports.MPlan = mongoose.model("MPlan", MPlanSchema);
