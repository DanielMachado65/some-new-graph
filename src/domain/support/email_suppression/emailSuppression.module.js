"use strict";

const EmailSuppressionEmitter = require("./emailSuppression.emitter");
const UserFacade = require("../../user/user/user.facade");
const weakValidator = require("../../../infrastructure/utils/weakValidator.util");

const addUserToSuppressionEmailList = async (email, ip) => {
  const user = await UserFacade.getByEmail(email, { _id: 1 });
  weakValidator.weakValidation(user);
  EmailSuppressionEmitter.addUserToSuppressionEmailList(user._id, email, ip);
};

module.exports = {
  addUserToSuppressionEmailList,
};
