const proxy = require("koa-proxies");
const { isDevEnv } = require("../../../infrastructure/config/config");

const ULURU_BASE_API_URL = process.env.ULURU_BASE_API_URL;

const pathsToProxy = [
  "/api/v2/test-drive",
  "/api/query/v2/representation",
  "/api/query/v2/reprocess",
  "/api/query/v3/reprocess",
  "/api/query/v2/replace",
  "/api/user/when-deleted",
  "/api/general/location",
  "/api/general/support",
  "/api/general/user-count",
  "/api/coupon/count-created",
  "/api/user/cancel-deletion",
  "/api/user/set-to-deletion",
  "/api/user/data/download",
  "/api/user/log",
  "/api/user/consent",
  "/api/company/all-available-info-comparison",
  "/api/company/all-testimonials",
  "/api/company/all-faq",
  "/api/company/media",
  "/api/billing/account-funds",
  "/api/partner/incomings",
  "/api/query/representation",
  "/api/health-check",
  "/api/query/reprocess",
  "/api/user/signup",
  "/api/user/profile",
  "/api/auth/log-in",
  "/api/auth/password-change",
  "/api/auth/password-recovery",
  "/api/v3",
  "/api/owner-review",
  "/api/price-table/products",
  "/api/my-cars/notify-schedule",
  "/api/product/credit-packs",
];
const proxyOptions = { target: ULURU_BASE_API_URL, logs: isDevEnv };

module.exports = {
  proxies: pathsToProxy.map((path) => proxy(path, proxyOptions)),
};
