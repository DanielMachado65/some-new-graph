"use strict";

const { MVehicularMonitoring } = require("mongoose").models;
const mailType = require("../../infrastructure/constants/mailType");
const mailSender = require("../mail/mailSender.service");
const mailLogModule = require("../log/mailLogModule");

const createVehicularMonitoring = async (userId, subscriptionId, keys) => {
  let responseData = {
    error: null,
    data: null,
  };

  try {
    await MVehicularMonitoring.createCollection();
    try {
      responseData.data = await MVehicularMonitoring.create([
        {
          user: userId,
          subscription: subscriptionId,
          keys: keys,
        },
      ]);
    } catch (error) {
      responseData.error = error.message;
      responseData.data = null;
    }
  } catch (error) {
    responseData.error = error.message;
  }
  return responseData;
};

const updateVehicularMonitoring = async (subscriptionId, keys) => {
  let responseData = {
    error: null,
    data: null,
  };

  try {
    await MVehicularMonitoring.createCollection();
    try {
      responseData.data = await MVehicularMonitoring.findOneAndUpdate(
        {
          subscription: subscriptionId,
        },
        {
          $set: {
            keys: keys,
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

const getByUserVehicularMonitoring = async (userId) => {
  return await MVehicularMonitoring.find({ user: userId }).exec();
};

const getBySubscriptionVehicularMonitoring = async (subscriptionId) => {
  return await MVehicularMonitoring.find({
    subscription: subscriptionId,
  }).exec();
};

const getAllVehicularMonitoring = async () => {
  return await MVehicularMonitoring.find().exec();
};

module.exports = {
  createVehicularMonitoring,
  updateVehicularMonitoring,
  getByUserVehicularMonitoring,
  getBySubscriptionVehicularMonitoring,
  getAllVehicularMonitoring,
};
