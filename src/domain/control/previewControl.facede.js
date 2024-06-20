"use strict";

const { MPreviewControl } = require("mongoose").models;

const getNumberViewsPerUserInMonth = async (userId) => {
  const date = new Date();
  return await MPreviewControl.countDocuments({
    user: userId,
    refMonth: date.getMonth(),
    refYear: date.getFullYear(),
  });
};

const createPreviewControl = async (userId) => {
  await MPreviewControl.create({
    user: userId,
  });
};

module.exports = {
  createPreviewControl,
  getNumberViewsPerUserInMonth,
};
