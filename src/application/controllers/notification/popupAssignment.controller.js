"use strict";

const PopupAssignment = require("../../../domain/notification/whatsapp_data_assignment/popupAssignment.module");

const getPopupAssing = async (userId) => {
  return await PopupAssignment.getPopupAssing(userId);
};

const postPopupAssing = async (body) => {
  try {
    return await PopupAssignment.postPopupAssing(body);
  } catch (error) {
    return error;
  }
};

const postPopupReject = async (body) => {
  try {
    return await PopupAssignment.postPopupReject(body);
  } catch (error) {
    return error;
  }
};

module.exports = {
  getPopupAssing,
  postPopupAssing,
  postPopupReject,
};
