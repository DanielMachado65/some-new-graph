const { Schema, model } = require("mongoose");

const MCarRevendorSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "MUser", required: true },
    status: { type: Boolean },
  },
  {
    timestamps: {
      createdAt: "createAt",
      updatedAt: "updateAt",
    },
  }
);

model("MCarRevendor", MCarRevendorSchema);
