"use strict";

const { model, Schema } = require("mongoose");
const QueryTypesEnum = require("../../dictionaries/QueryTypesEnum");

const { MQueryMapper } = require("./MQueryMapper");
const { MQueryRules } = require("./MQueryRules");

const MQueryComposerSchema = new Schema(
  {
    createAt: { type: Date, default: Date.now },
    status: { type: Boolean, default: true },
    queryCode: { type: Number, default: 0, required: true, unique: true },
    name: { type: String, default: null },
    type: { type: String, default: QueryTypesEnum(1) },
    isRecommended: { type: Boolean, default: false },
    isNewFeature: { type: Boolean, default: false },
    showInComparisonTable: { type: Boolean, default: false },
    title: { type: String, default: "" },
    fullDescription: { type: String, default: "" },
    shortDescription: { type: String, default: "" },
    faq: [{ type: Schema.Types.ObjectId, ref: "MFaq", default: null }],
    queryInfos: [
      { type: Schema.Types.ObjectId, ref: "MQueryInfo", default: null },
    ],
    testimonials: [
      { type: Schema.Types.ObjectId, ref: "MTestimonial", default: null },
    ],
    exampleQuery: { type: Schema.Types.ObjectId, ref: "MQuery", default: null },
    services: [{ type: Schema.Types.ObjectId, ref: "MService", default: null }],
    queryMap: {
      type: Schema.Types.ObjectId,
      ref: "MQueryMapper",
      default: null,
    },
    queryRules: {
      type: Schema.Types.ObjectId,
      ref: "MQueryRules",
      default: null,
    },
    buyable: { type: Boolean, default: true },
  },
  {
    usePushEach: true,
  }
);

MQueryComposerSchema.post("save", async function () {
  let queryCompositionId = this._id;
  if (!this.queryMap) {
    let queryMapping = new MQueryMapper();
    queryMapping.queryComposition = queryCompositionId;
    queryMapping = await MQueryMapper.create(queryMapping);
    this.queryMap = queryMapping._id;
    await this.save();
  }
  if (!this.queryRules) {
    let queryRules = new MQueryRules();
    queryRules.queryComposition = queryCompositionId;
    await MQueryRules.create(queryRules);
    this.queryRules = queryRules._id;
    await this.save();
  }
});

model("MQueryComposer", MQueryComposerSchema);
