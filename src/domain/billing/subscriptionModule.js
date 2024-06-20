"use strict";
//@TODO refazer
const userModule = require("../user/user/userModule");
const clientModule = require("../iugu/client/client.module");
const iuguService = require("../../infrastructure/services/iugu/iugu.service");
const subscriptionStatusEnum = require("../../infrastructure/dictionaries/SubscriptionStatusEnum");
const subscriptionStatus = require("../../infrastructure/constants/subscription/status.constant");
const { MSubscription, MBilling } = require("mongoose").models;

const createSubscription = async (creatorId, data) => {
  let responseData = {
    error: null,
    data: null,
  };

  const user = await userModule.getById(creatorId);

  if (!user) {
    responseData.error = "The user doesn't exist";
    return responseData;
  }

  const clientId = await clientModule.getClientId(user);

  if (!clientId) {
    responseData.error = "Does not possible to get client id of iugu";
    return responseData;
  }

  try {
    await MSubscription.createCollection();
    try {
      const response = await iuguService.createSubscritpion({
        customer_id: clientId,
        plan_identifier: data.plan,
        expires_at: data.expireAt,
        payable_with: data.payableWith,
        ignore_canceled_email: true,
        ignore_due_email: true,
      });

      const externalId = response.id;

      const arraySubscriptions = await MSubscription.create([
        {
          creator: creatorId,
          plan: data.plan,
          expireAt: data.expireAt,
          payableWith: data.payableWith,
          ignoreNotificationBilling: data.ignoreNotificationBilling,
          status: subscriptionStatusEnum(1),
          externalId: externalId,
        },
      ]);

      const subscriptionObject = arraySubscriptions[0];
      responseData.data = subscriptionObject;

      const match = {
        _id: user.billing._id,
      };

      const objectToSave = {
        subscription: subscriptionObject._id,
      };

      await MBilling.findOneAndUpdate(match, {
        $push: { subscriptions: objectToSave },
      });
    } catch (error) {
      responseData.error = error.message;
      responseData.data = null;
    }
  } catch (error) {
    responseData.error = error.message;
  }

  return responseData;
};

const getSubscriptionByCreator = async (creatorId) => {
  return await MSubscription.find({ creator: creatorId })
    .populate("creator", "_id name email")
    .populate("plan", "_id name status valueCents type")
    .exec();
};

const getSubscriptionById = async (subscriptionId) => {
  return await MSubscription.findOne({ _id: subscriptionId })
    .populate("creator", "_id name email")
    .populate("plan", "_id name status type")
    .exec();
};

const getAllSubscriptions = async () => {
  return await MSubscription.find()
    .populate("creator", "_id name email")
    .populate("plan", "_id name status type")
    .exec();
};

const activateSubscription = async (subscriptionId) => {
  let responseData = {
    error: null,
    data: null,
  };

  try {
    const externalId = await getExternalIdSubscription(subscriptionId);

    if (!externalId) {
      return (response.error = "Not possible to activate this subscription");
    }

    const response = await iuguService.activateSubscription(externalId);

    if (!response) {
      return (response.error = "Not possible to activate this subscription");
    }

    try {
      responseData.data = await MSubscription.findOneAndUpdate(
        {
          _id: subscriptionId,
        },
        {
          $set: {
            status: subscriptionStatusEnum(2),
          },
        },
        {
          upsert: true,
        }
      );

      responseData.data = {
        msg: "Assinatura ativada com sucesso",
      };
    } catch (error) {
      response.error = error.message;
    }

    return responseData;
  } catch (error) {
    responseData.error = error.message;
  }

  return responseData;
};

const deactivateSubscription = async (subscriptionId) => {
  let responseData = {
    error: null,
    data: null,
  };

  try {
    const externalId = await getExternalIdSubscription(subscriptionId);

    if (!externalId) {
      return (response.error = "Not possible to deactivate this subscription");
    }

    const response = await iuguService.deactivateSubscritpion(externalId);

    if (!response) {
      return (response.error = "Not possible to deactivate this subscription");
    }

    try {
      const subscription = await MSubscription.findOneAndUpdate(
        {
          _id: subscriptionId,
        },
        {
          $set: {
            status: subscriptionStatusEnum(3),
            deactivatedAt: Date.now(),
          },
        },
        {
          upsert: true,
        }
      );

      responseData.data = {
        subscription,
        msg: "Assinatura desativada com sucesso",
      };
    } catch (error) {
      response.error = error.message;
    }

    return responseData;
  } catch (error) {
    responseData.error = error.message;
  }

  return responseData;
};

const updateSubscription = async (subscriptionId, data) => {
  let responseData = {
    error: null,
    data: null,
  };

  try {
    let subscription = await MSubscription.findOne({ _id: subscriptionId });

    if (!subscription) {
      return (responseData.error = "Not was possible find this subscription");
    }

    const externalId = await getExternalIdSubscription(subscriptionId);

    if (!externalId) {
      return responseData;
    }

    try {
      await iuguService.updateSubscritpion(externalId, {
        plan_identifier: data.plan,
        expires_at: data.expireAt,
        payable_with: data.payableWith,
        ignore_canceled_email: true,
        ignore_due_email: true,
      });

      responseData.data = await MSubscription.findOneAndUpdate(
        {
          _id: subscriptionId,
        },
        {
          $set: {
            plan: data.plan,
            status: subscriptionStatusEnum(data.status),
            expireAt: data.expireAt,
            payableWith: data.payableWith,
            ignoreNotificationBilling: data.ignoreNotificationBilling,
          },
        },
        {
          upsert: true,
        }
      );
    } catch (error) {
      responseData.error = error.message;
      responseData.data = null;
    }
  } catch (error) {
    responseData.error = error.message;
  }
  return responseData;
};

const deleteSubscriptionById = async (subscriptionId) => {
  let responseData = {
    error: "Not was possible remove this subscription",
  };

  try {
    const externalId = await getExternalIdSubscription(subscriptionId);

    if (!externalId) {
      return responseData;
    }

    const response = await iuguService.deleteSubscritpion(externalId);

    if (!response) {
      return responseData;
    }

    await MSubscription.deleteOne({ _id: subscriptionId });
  } catch (error) {
    responseData.error = error;
    return responseData;
  }
  return null;
};

const getExternalIdSubscription = async (subscriptionId) => {
  let subscription = null;

  try {
    subscription = await MSubscription.findOne({ _id: subscriptionId });

    if (!subscription) {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }

  return subscription.externalId;
};

const getAllSubscriptionsPendingByPlanIds = async (planIds) => {
  return await MSubscription.find({
    plan: { $in: planIds },
    status: subscriptionStatus.AGUARDANDO,
  })
    .lean()
    .exec();
};

const insertPaymentIntoSubscription = async function (
  paymentId,
  subscriptionId
) {
  const subscription = await MSubscription.findOne({ _id: subscriptionId });
  const date = new Date();
  subscription.payments = subscription.payments || [];
  subscription.payments.push({
    payment: paymentId,
    refMonth: date.getMonth(),
    refYear: date.getFullYear(),
    renewedAt: date,
  });

  await subscription.save();
  return JSON.parse(JSON.stringify(subscription));
};

module.exports = {
  createSubscription,
  getSubscriptionById,
  getSubscriptionByCreator,
  getAllSubscriptions,
  activateSubscription,
  deactivateSubscription,
  updateSubscription,
  deleteSubscriptionById,
  getAllSubscriptionsPendingByPlanIds,
  insertPaymentIntoSubscription,
};
