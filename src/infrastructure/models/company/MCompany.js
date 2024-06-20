"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MCompanySchema = new Schema(
  {
    medias: [
      {
        logo: { type: String, default: null },
        title: { type: String, default: null },
        description: { type: String, default: null },
        url: { type: String, default: null },
      },
    ],
    faq: [{ type: Schema.Types.ObjectId, ref: "MFaq", default: null }],
  },
  {
    timestamps: {
      createdAt: "createAt",
      updatedAt: "updateAt",
    },
  }
);

module.exports.MCompanySchema = MCompanySchema;
module.exports.MCompany = mongoose.model("MCompany", MCompanySchema);
