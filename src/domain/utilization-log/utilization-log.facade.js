"use strict";

const utilizationLogService = require("../../infrastructure/services/utilization-log/utilization-log.service");
const { convertJsonToXLSX } = require("../../infrastructure/utils/excel.util");
const {
  getBrazilianDateFormat,
} = require("../../infrastructure/utils/date.util");

const getUserLogs = async (userId, apiId, limit, page) => {
  return await utilizationLogService.getUserLogs(userId, apiId, limit, page);
};

const downloadUserLogs = async (userId, apiId) => {
  const buffer = await utilizationLogService.getAllLogs(userId, apiId);
  const tempData = await JSON.parse(Buffer.from(buffer).toString());
  return _createDownloadReport(tempData);
};

const _createDownloadReport = (entries) => {
  const reportName = "utilization-logs.xlsx";
  const reportData = entries.map((entry) => ({
    id: entry._id,
    ação: entry.actionName,
    descrição: entry.actionDescription,
    token: entry.token,
    Data: getBrazilianDateFormat(entry.createAt),
  }));

  return [reportName, convertJsonToXLSX(reportData, reportName)];
};

module.exports = {
  getUserLogs,
  downloadUserLogs,
};
