"use strict";

const { MControlUserNavigation } = require("mongoose").models;

const createControlUserNavigation = async (userId, { dialog }) => {
  try {
    await MControlUserNavigation.createCollection();
    await MControlUserNavigation.create([
      {
        user: userId,
        dialog,
      },
    ]);
  } catch (_error) {
    return {
      error: "CREATE_MODEL_CONTROL_USER_NAVIGATION_ERROR",
      data: _error,
    };
  }
  return { result: "ok" };
};

const updateDialogPhoneNumberByUserId = async (userId, data) => {
  let response = null;
  try {
    await MControlUserNavigation.createCollection();
    const updatedAt = new Date();
    response = await MControlUserNavigation.findOneAndUpdate(
      {
        user: userId,
      },
      {
        $set: { "dialog.phoneNumber": data, updatedAt },
      }
    );
  } catch (_error) {
    return {
      error: "UPDATE_MODEL_CONTROL_USER_NAVIGATION_ERROR",
      data: _error,
    };
  }
  return { result: response };
};

const getByUserId = async (userId) => {
  try {
    const filter = { user: userId };
    const response = await MControlUserNavigation.findOne(filter).exec();
    return { result: response };
  } catch (_error) {
    return {
      error: "GET_CONTROL_USER_NAVIGATION_BY_USER_ID_ERROR",
      data: _error,
    };
  }
};

module.exports = {
  createControlUserNavigation,
  updateDialogPhoneNumberByUserId,
  getByUserId,
};
