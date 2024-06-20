"use strict";

const { model, Schema } = require("mongoose");

const MTestimonialSchema = new Schema(
  {
    authorName: { type: String, default: null },
    content: { type: String, default: "" },
    user: { type: Schema.Types.ObjectId, ref: "MUser", default: null },
    deleteAt: { type: Date, default: null },
  },
  {
    timestamps: {
      createdAt: "createAt",
      updatedAt: "updateAt",
    },
  }
);

model("MTestimonial", MTestimonialSchema);
