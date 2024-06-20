"use strict";

const PopupService = require("../../../infrastructure/services/whatsapp_data_assignment/popupAssignment.service");

async function getPopupAssing(userId) {
  return await PopupService.getPopupAssing(userId);
}

async function postPopupAssing(body) {
  return await PopupService.postPopupAssing(body);
}

async function postPopupReject(body) {
  return await PopupService.postPopupReject(body);
}

module.exports = {
  getPopupAssing,
  postPopupAssing,
  postPopupReject,
};
