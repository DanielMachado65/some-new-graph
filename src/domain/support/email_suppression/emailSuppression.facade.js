"use strict";

const {
  EmailSuppressionRepository,
} = require("./components/emailSuppression.repository");

const emailSuppressionRepository = new EmailSuppressionRepository();

const addUserToSuppressionEmailList = async (user, email, ip) => {
  await emailSuppressionRepository.create({ user, email, ip });
};

const isSuppressedEmail = async (email) => {
  return emailSuppressionRepository.has({ email });
};

const isSuppressedUser = async (user) => {
  return emailSuppressionRepository.has({ user });
};

const removeUserFromSuppressionList = async (user) => {
  await emailSuppressionRepository.removeUserFromSuppressionList(user);
};

const removeEmailFromSuppressionList = async (user) => {
  await emailSuppressionRepository.removeEmailFromSuppressionList(user);
};

module.exports = {
  addUserToSuppressionEmailList,
  isSuppressedEmail,
  isSuppressedUser,
  removeUserFromSuppressionList,
  removeEmailFromSuppressionList,
};
