const { TrackErrorService } = require("@diegomoura637/sentry-service-package");
const trackErrorInstance = new TrackErrorService();

module.exports = {
  trackErrorInstance,
};
