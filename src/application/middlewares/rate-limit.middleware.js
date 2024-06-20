const { RateLimit } = require("koa2-ratelimit");

module.exports.rateLimiter = (
  intervalInMinutes = 10,
  maxRequestsPerInterval = 5
) => {
  return RateLimit.middleware({
    interval: { min: intervalInMinutes },
    max: maxRequestsPerInterval,
    message:
      "Too many requests created from this IP, please try again after an hour",
  });
};
