"use strict";

const AnalyticsRepository = require("./components/analytics.repository");
const DateUtil = require("../../infrastructure/utils/date.util");
const marketingSender = require("../mail/marketing/marketingSender.service");

const createAnalytics = (email, link, placa, queryId) => {
  return AnalyticsRepository.createAnalytics(email, link, placa, queryId);
};

const getAllAnalyticsByDate = (maybeMonth, maybeYear) => {
  const { startDate, endDate } = DateUtil.getMonthStartEndDateOrDefault(
    maybeMonth,
    maybeYear
  );
  return AnalyticsRepository.reportAllByDate(startDate, endDate);
};

module.exports = {
  createAnalytics,
  getAllAnalyticsByDate,
};
