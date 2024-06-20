"use strict";

const {
  BaseRepository,
} = require("../../../infrastructure/repository/BaseRepository");
const { MSubscription } = require("mongoose").models;

module.exports.SubscriptionRepository = class SubscriptionRepository extends BaseRepository {
  constructor() {
    super(MSubscription);
  }

  async createSubscriptionOnDatabase(creatorId, data, statusToSet) {
    const subscriptionCreated = await this.model.create([
      {
        creator: creatorId,
        plan: data.plan,
        expireAt: data.expireAt,
        payableWith: data.payableWith,
        ignoreNotificationBilling: data.ignoreNotificationBilling,
        status: statusToSet,
        externalId: externalId,
      },
    ]);
    return subscriptionCreated[0];
  }

  async setActivatedSignatureOnDatabase(subscriptionId, statusToSet) {
    return await this.model.findOneAndUpdate(
      {
        _id: subscriptionId,
      },
      {
        $set: {
          status: statusToSet,
        },
      },
      {
        upsert: true,
      }
    );
  }

  async setDeactivatedSignatureOnDatabase(subscriptionId, statusToSet) {
    return await this.model.findOneAndUpdate(
      {
        _id: subscriptionId,
      },
      {
        $set: {
          status: statusToSet,
          deactivatedAt: Date.now(),
        },
      },
      {
        upsert: true,
      }
    );
  }

  async updateSubscriptionOnDatabase(subscriptionId, data, statusToSet) {
    return await this.model.findOneAndUpdate(
      {
        _id: subscriptionId,
      },
      {
        $set: {
          plan: data.plan,
          status: statusToSet,
          expireAt: data.expireAt,
          payableWith: data.payableWith,
          ignoreNotificationBilling: data.ignoreNotificationBilling,
        },
      },
      {
        upsert: true,
      }
    );
  }

  async searchByCreator(creatorId) {
    return await this.model
      .find({ creator: creatorId })
      .populate("creator", "_id name email")
      .populate("plan", "_id name status valueCents type")
      .exec();
  }

  async searchBySubscriptionId(subscriptionId) {
    return await this.model
      .findOne({ _id: subscriptionId })
      .populate("creator", "_id name email")
      .populate("plan", "_id name status type")
      .exec();
  }

  async getAllSubscriptions() {
    return await this.model
      .find()
      .populate("creator", "_id name email")
      .populate("plan", "_id name status type")
      .exec();
  }
};
