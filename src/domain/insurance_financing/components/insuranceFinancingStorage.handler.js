"use strict";

const s3Service = require("../../../infrastructure/services/aws/oncS3Service");
const InsuranceFinancingReportsBucket = "insurance-financing-reports";

async function getReportDataOnStorage(reportName) {
  const response = await s3Service.getObject(
    InsuranceFinancingReportsBucket,
    reportName
  );
  return (response && response.Body) || null;
}

async function hasCreatedReportToThisMonthAndYear(reportName) {
  try {
    return !!(await getReportDataOnStorage(reportName));
  } catch (e) {
    return false;
  }
}

const uploadReportToStorage = async (reportName, buffer) => {
  await s3Service.upload(InsuranceFinancingReportsBucket, reportName, buffer);
};

module.exports = {
  getReportDataOnStorage,
  hasCreatedReportToThisMonthAndYear,
  uploadReportToStorage,
};
