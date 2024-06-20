"use strict";

const { MSubscription } = require("mongoose").models;
const utils = require("../../infrastructure/utils/utils");
const subscriptionStatusEnum = require("../../infrastructure/dictionaries/SubscriptionStatusEnum");

const subscriptionRenewed = async (data) => {
  const subscriptionId = data.id;
  try {
    const match = {
      externalId: subscriptionId,
    };
    const subscription = await MSubscription.findOneAndUpdate(match, {
      $set: {
        status: subscriptionStatusEnum(2),
      },
    }).populate("plan", "name valueCents addCredits type");
    if (subscription && subscription.plan)
      subscription.plan.valueCents = utils.convertValueCentsToFloat(
        subscription.plan.valueCents
      );
    return subscription;
  } catch (_error) {
    console.log(_error);
    throw _error;
  }
};

const subscriptionSuspended = async (data) => {
  const subscriptionId = data.id;

  try {
    const match = {
      externalId: subscriptionId,
    };
    return await MSubscription.findOneAndUpdate(match, {
      $set: {
        status: subscriptionStatusEnum(3),
      },
    })
      .populate("creator", "email name")
      .populate("plan", "name");
  } catch (_error) {
    console.log(_error);
    throw _error;
  }
};

module.exports = {
  subscriptionRenewed,
  subscriptionSuspended,
};
