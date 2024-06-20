"use strict";

const UserFacade = require("./user.facade");
const Events = require("events");
class UserEmitter extends Events {}
const userEmitter = new UserEmitter();

const EVENTS = {
  UPDATE_USER: "update-user",
};

userEmitter.on(EVENTS.UPDATE_USER, async ({ customer, userId }) => {
  await UserFacade.updateOne(
    { _id: userId },
    { "externalControls.iugu.id": customer.id }
  );
});

module.exports = {
  EVENTS,
  emitter: userEmitter,
};
