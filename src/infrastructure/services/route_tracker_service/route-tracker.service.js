const {
  UtilizationLogsTracker,
} = require("@diegomoura637/utilization-log-producer");

const routeTracker = new UtilizationLogsTracker(
  process.env.APPLICATION_ID,
  "auth_user_id"
);

module.exports.routeTracker = routeTracker;
