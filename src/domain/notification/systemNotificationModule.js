"use strict";
const { MSystemNotification } = require("mongoose").models;
const SystemNotificationTypesEnum = require("../../infrastructure/dictionaries/SystemNotificationTypesEnum");
const systemNotificationRepository = require('./components/systemNotification.repositoy');

const createNew = async (notification) => {
  if (notification) {
    let objectEnum = SystemNotificationTypesEnum(notification.type);
    let obj = {
      type: objectEnum.type,
      title: objectEnum.title,
      description: notification.description,
      icon: objectEnum.IconCssClass,
      redirectTo: objectEnum.redirectTo,
    };
    await MSystemNotification.create(obj);
  }
};

const createNewNotification = async (type, description) => {
  const notificationDetails = SystemNotificationTypesEnum(type);

  try {
    if (notificationDetails) {
      const preNotification = {
        type: notificationDetails.type,
        title: notificationDetails.title,
        description: description,
        icon: notificationDetails.IconCssClass,
        redirectTo: notificationDetails.redirectTo,
      };
      const notification = await MSystemNotification.create(preNotification);

      return { result: notification };
    } else {
      return {
        error: "UNKNOWN_TYPE_NOTIFICATION_ERROR",
        data: { notificationDetails },
      };
    }
  } catch (error) {
    return { error: "UNKNOWN_NOTIFICATION_ERROR", data: error };
  }
};

const getLasts = async () => {
  let lasts = await MSystemNotification.find({ visualized: false })
    .sort({ createAt: -1 })
    .limit(5)
    .lean();
  let withoutRead = await MSystemNotification.countDocuments({
    visualized: false,
  });
  return {
    lasts: lasts,
    withoutRead: withoutRead,
  };
};

const getLot = async (dt) => {
  let filter = {
    createAt: { $lt: dt },
  };
  let notifications = await MSystemNotification.find(filter)
    .sort({ createAt: -1 })
    .limit(30)
    .lean();
  for (let n of notifications) {
    if (!n.visualized) {
      n.visualized = true;
      await n.save();
    }
  }
  return notifications;
};

const getNotifications = async () => {
  await MSystemNotification.updateMany({}, { $set: { visualized: true } });
  return MSystemNotification.find({}).sort({ createAt: -1 }).limit(100).lean();
};

const setVisualized = async (id) => {
  return systemNotificationRepository.updateOne(
    { _id: id },
    { visualized: true }
  );
};
module.exports = {
  createNew,
  createNewNotification,
  getNotifications,
  getLasts,
  getLot,
  setVisualized,
};
