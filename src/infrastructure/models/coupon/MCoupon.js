'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MCouponSchema = new Schema({
  creator: { type: Schema.Types.ObjectId, ref: 'MUser', default: null },
  createAt: { type: Date, default: Date.now },
  status: { type: Boolean, default: true },
  code: { type: String, default: null },
  generator: { type: Schema.Types.ObjectId, ref: 'MUser', default: null },
  rules: {
    discountPercentage: { type: Number, default: 0 },
    discountValue: { type: Number, default: 0 },
    minValueToApply: { type: Number, default: 0 },
    expirationDate: { type: Date, default: null },
    limitUsage: { type: Number, default: Number.MAX_SAFE_INTEGER },
    usageMaxToUser: { type: Number, default: 0 },
    /*@deprected*/
    authorized: {
      queries: [{
        code: { type: Number, default: 0 },
        limit: { type: Number, default: Number.MAX_SAFE_INTEGER },
      }],
      packages: [{
        packageid: { type: Schema.Types.ObjectId, ref: 'MPackage', default: null },
        limit: { type: Number, default: Number.MAX_SAFE_INTEGER },
      }],
      signatures: [{
        code: { type: Schema.Types.ObjectId, ref: 'MPlan', default: null },
        limit: { type: Number, default: Number.MAX_SAFE_INTEGER },
      }],
    },
  },
}, {
  usePushEach: true,
});

module.exports.MCouponSchema = MCouponSchema;
module.exports.MCoupon = mongoose.model('MCoupon', MCouponSchema);
