"use strict";

const insuranceFinancingFacade = require("./insuranceFinancing.facade");
const insuranceFinancingPopupControlFacade = require("./insuranceFinancingPopupControl.facade");
const userFacade = require("../user/user/user.facade");
const queryFacade = require("../query/query/query.facade");
const DateUtil = require("../../infrastructure/utils/date.util");
const xlsxService = require("../../infrastructure/utils/excel.util");

const createNewInsuranceFinancingRecord = async (
  queryId,
  userId,
  hasInterestInVehicularFinancingQuote,
  hasInterestInVehicularInsuranceQuote,
  hasAcceptedFormToShareOwnInfos
) => {
  const query = await queryFacade.getById(queryId, { responseJSON: 1 });
  const user = await userFacade.getById(userId, {
    name: 1,
    email: 1,
    "generalData.phoneNumber1": 1,
    "generalData.phoneNumber2": 1,
  });
  await insuranceFinancingFacade.createNewInsuranceFinanceRecord(
    query,
    user,
    hasInterestInVehicularFinancingQuote,
    hasInterestInVehicularInsuranceQuote,
    hasAcceptedFormToShareOwnInfos
  );
};

const getInsuranceFinancingRecordsByLot = async (page, limit) => {
  return insuranceFinancingFacade.getInsuranceFinanceRecordsByLot(page, limit);
};

const generateInsuranceFinancingReportByMonthAndYear = async (
  month = DateUtil.getMonthToCorrectTimeZone(),
  year = DateUtil.getYearToCorrectTimeZone()
) => {

  const currentMonth = (new Date()).getMonth().toString();
  const currentYear = (new Date()).getFullYear().toString();

  const reportName = insuranceFinancingFacade.getReportName(month, year);
  const report = await insuranceFinancingFacade.hasCreatedReportToThisMonthAndYear(
    reportName
  );
  if (report && (currentMonth!==month || currentYear!==year))
    return [
      reportName,
      await insuranceFinancingFacade.getReportDataOnStorage(reportName),
    ];
  const records = await insuranceFinancingFacade.find(
    { month, year },
    {
      user: 1,
      query: 1,
      vehicle: 1,
      hasInterestInVehicularInsuranceQuote: 1,
      hasInterestInVehicularFinancingQuote: 1,
      hasAcceptedFormToShareOwnInfos: 1,
      status: 1,
      createAt: 1,
    }
  );
  const recordsToReport = insuranceFinancingFacade.transformDataToGenerateReport(
    records
  );

  const buffer = xlsxService.generateBufferFromDataJson(
    recordsToReport,
    reportName
  );
  await insuranceFinancingFacade.uploadReportToStorage(reportName, buffer);
  return [
    reportName,
    await insuranceFinancingFacade.getReportDataOnStorage(reportName),
  ];
};

const getPopupVisibilityStatus = async (queryId) => {
  const registry = await insuranceFinancingPopupControlFacade.findByQueryId(queryId);
  if(registry) return ( { mustBeShow: false } );
  await insuranceFinancingPopupControlFacade.create(queryId);
  return ( { mustBeShow: true } );
}

module.exports = {
  createNewInsuranceFinancingRecord,
  getInsuranceFinancingRecordsByLot,
  generateInsuranceFinancingReportByMonthAndYear,
  getPopupVisibilityStatus,
};
