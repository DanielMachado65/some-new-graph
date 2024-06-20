"use strict";

const EmailSuppressionFacade = require("./emailSuppression.facade");
const Event = require("events");
class EmailSuppressionEmitter extends Event {}

const emailSuppressionEmitter = new EmailSuppressionEmitter();

const EVENTS = {
  ADD_USER_TO_SUPPRESSION_LIST: "add_user_to_suppression_list",
};

emailSuppressionEmitter.on(
  EVENTS.ADD_USER_TO_SUPPRESSION_LIST,
  EmailSuppressionFacade.addUserToSuppressionEmailList
);

module.exports = {
  addUserToSuppressionEmailList: (user, email, ip) => {
    emailSuppressionEmitter.emit(
      EVENTS.ADD_USER_TO_SUPPRESSION_LIST,
      user,
      email,
      ip
    );
  },
};
