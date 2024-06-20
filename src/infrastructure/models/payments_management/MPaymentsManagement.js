"use strict";

const { Schema, model, Types } = require("mongoose");

const MPaymentsManagementSchema = new Schema(
  {
    splittingType: {
      type: String,
      required: true,
      enum: ["absolute", "percent"],
    },
    fillingOrder: {
      type: String,
      enum: ["random", "sequential"],
    },
    rules: {
      _id: false,
      required: true,
      validate: [
        {
          validator: function (value) {
            return value.length >= 1;
          },
          message: "At least one rule is required",
        },
        {
          validator: function (value) {
            if (this.splittingType === "percent") {
              const sum = value.reduce(
                (total, rule) => total + (rule.percent || 0),
                0
              );
              return sum === 100;
            }
            return true;
          },
          message: "The sum of percentages must be equal to 100",
        },
      ],
      type: [
        {
          cnpj: {
            type: String,
            required: true,
          },

          /** Percent */
          percent: {
            type: Number,
            required: function () {
              const parentDocument = this.parent();
              return parentDocument.splittingType === "percent";
            },
          },

          /** Absolute */
          maxValueCents: {
            type: Number,
            required: function () {
              const parentDocument = this.parent();
              return parentDocument.splittingType === "absolute";
            },
          },
          fillOrder: {
            type: Number,
            required: function () {
              const parentDocument = this.parent();
              return (
                parentDocument.splittingType === "absolute" &&
                parentDocument.fillingOrder === "sequential"
              );
            },
          },
        },
      ],
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false }, // Adds createdAt and updatedAt fields
  }
);

model("MPaymentsManagement", MPaymentsManagementSchema);
