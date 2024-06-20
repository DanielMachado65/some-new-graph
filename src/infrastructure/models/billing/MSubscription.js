'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MSubscriptionSchema = new Schema({
  plan: {
    type: Schema.Types.ObjectId,
    ref: "MPlan",
    default: null,
    required: [true, "The plan is required to create a new subscription"],
    validate: {
      validator: (_id) => new Promise(async (res, rej) => {
        res(!!await mongoose.models.MPlan
          .findOne({
            $and: [{
              _id
            },
            {
              status: true
            }
            ]
          })
          .lean()
          .exec()
        );
      }),
      message: props => `${props.value} is not a valid plan`
    }
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "MUser",
    default: null,
    required: true
  },
  payments: [{
    payment: {
      type: Schema.Types.ObjectId,
      ref: "MPayment",
      required: true
    },
    refMonth: { type: Number },
    refYear: { type: Number },
    renewedAt: {
      type: Date,
      default: null
    }
  }],
  expireAt: {
    type: Date,
    required: true,
  },
  payableWith: {
    type: String,
    default: "all",
    enum: ["all", "credit_card", "bank_slip"],
    required: [true, "Need be setted a payable way"]
  },
  ignoreNotificationBilling: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    default: null
  },
  createAt: {
    type: Date,
    default: Date.now
  },
  externalId: {
    type: String,
    default: null
  },
  deactivatedAt: {
    type: Date,
    default: null,
  },
}, {
  usePushEach: true
});

MSubscriptionSchema.pre('save', async function () {
  const plan = await mongoose.models.MPlan
    .findOne(this.plan)
    .select('payableWith')
    .lean()
    .exec();
  this.payableWith = plan.payableWith || this.payableWith;
});

module.exports.MSubscriptionSchema = MSubscriptionSchema;
module.exports.MSubscription = mongoose.model('MSubscription', MSubscriptionSchema);
