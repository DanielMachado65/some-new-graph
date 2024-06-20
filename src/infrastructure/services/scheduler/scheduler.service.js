"use strict";

const request = require("request-promise");
const apiBaseUrl = "https://api.olhonocarro.com.br";
const schedulerUrl =
  "https://iujrquenfd.execute-api.sa-east-1.amazonaws.com/prod";

const events = require("events");
const schedulerEmitter = new events.EventEmitter();

const schedule = async ({
  hook,
  endpoint,
  payload = {},
  timeToLoose,
  repeat,
}) => {
  try {
    const schedulerEndpoint = `${schedulerUrl}/schedule`;
    const options = {
      json: true,
      method: "POST",
      uri: schedulerEndpoint,
      body: {
        hook: hook ? hook : `${apiBaseUrl}${endpoint}`,
        payload,
        options: {
          timeToLoose: timeToLoose,
          repeat: repeat,
        },
      },
    };
    return await request(options);
  } catch (error) {
    console.log("Error while trying to schedule a task!");
    console.log("Error:", error);
  }
};

schedulerEmitter.addListener("schedule", schedule);

function emit(args) {
  schedulerEmitter.emit("schedule", args);
}

module.exports = {
  schedule,
  emit,
};
