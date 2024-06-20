"use strict";

const sendMailService = require("../../infrastructure/services/mail_gun/mailGunService");
const insuranceFinancingView = require("./components/insuranceFinancing.view");
const {
  InsuranceFinancingRepository,
} = require("./components/insuranceFinancing.repository");
const {
  getBrazilianDateFormat,
} = require("../../infrastructure/utils/date.util");

const {
  InsuranceFinancingEntity,
} = require("./components/insuranceFinancing.entity");

const InsuranceFinancingStorageHandler = require("./components/insuranceFinancingStorage.handler");

const insuranceFinancingRepository = new InsuranceFinancingRepository();

function _getHtmlStringToSendInternalEmail(insuranceFinanceObject) {
  return insuranceFinancingView.renderInternalTemplateEmail(
    insuranceFinanceObject.name,
    insuranceFinanceObject.email,
    insuranceFinanceObject.phone,
    insuranceFinanceObject.plate,
    insuranceFinanceObject.chassi,
    insuranceFinanceObject.renavam,
    insuranceFinanceObject.modelAndBrand,
    insuranceFinanceObject.fipeTable
  );
}

const createNewInsuranceFinanceRecord = async (
  user,
  query,
  hasInterestInVehicularFinancingQuote,
  hasInterestInVehicularInsuranceQuote,
  hasAcceptedFormToShareOwnInfos
) => {
  const insuranceFinanceObject = InsuranceFinancingEntity.CreateInsuranceFinancingEntityByQueryAndUser(
    query,
    user
  );
  insuranceFinanceObject
    .setHasInterestInVehicularFinancingQuote(
      hasInterestInVehicularFinancingQuote
    )
    .setHasInterestInVehicularInsuranceQuote(
      hasInterestInVehicularInsuranceQuote
    )
    .setHasAcceptedFormToShareOwnInfos(hasAcceptedFormToShareOwnInfos);
  await insuranceFinancingRepository.create(insuranceFinanceObject.toObject());
  // const htmlString = _getHtmlStringToSendInternalEmail(insuranceFinanceObject);
  // await sendMailService.sendMailByMailgun(
  //   "noreply@olhonocarro.com.br",
  //   "diego@olhonocarro.com.br,yago.teixeira@checktudo.com.br",
  //   "Cliente interessado em contação de seguro ou financiemento",
  //   null,
  //   htmlString
  // );
};

const getInsuranceFinanceRecordsByLot = async (page, limit) => {
  return insuranceFinancingRepository.paginate(
    {},
    { offset: page || 0, limit: limit || 25, lean: true }
  );
};

const find = async (query, opts) =>
  insuranceFinancingRepository.find(query, opts);

function getReportName(month, year) {
  return `financ_seguro_rel-${month}-${year}.xlsx`;
}

const transformDataToGenerateReport = (records) => {
  return records.map((record) => {
    const insuranceFinancingObj = new InsuranceFinancingEntity();
    insuranceFinancingObj
      .setPlate(record.vehicle.plate)
      .setChassi(record.vehicle.chassi)
      .setRenavam(record.vehicle.renavam)
      .setFipeTable(record.vehicle.fipeTable)
      .setModelAndBrand(record.vehicle.modelAndBrand)
      .setUserName(record.user.name)
      .setUserInterested(record.user.userInterested.toString())
      .setEmail(record.user.email)
      .setPhone(record.user.phone)
      .setQuery(record.query.toString())
      .setCreateAt(getBrazilianDateFormat(record.createAt))
      .setHasAcceptedFormToShareOwnInfos(
        record.hasAcceptedFormToShareOwnInfos ? "SIM" : "NAO"
      )
      .setHasInterestInVehicularFinancingQuote(
        record.hasInterestInVehicularFinancingQuote ? "SIM" : "NAO"
      )
      .setHasInterestInVehicularInsuranceQuote(
        record.hasInterestInVehicularInsuranceQuote ? "SIM" : "NAO"
      )
      .convertEntityToInternalReportFormatDto();
    return insuranceFinancingObj;
  });
};

const getReportDataOnStorage = async (reportName) => {
  return InsuranceFinancingStorageHandler.getReportDataOnStorage(reportName);
};

const hasCreatedReportToThisMonthAndYear = async (reportName) => {
  return InsuranceFinancingStorageHandler.hasCreatedReportToThisMonthAndYear(
    reportName
  );
};

const uploadReportToStorage = async (reportName, buffer) => {
  return InsuranceFinancingStorageHandler.uploadReportToStorage(
    reportName,
    buffer
  );
};

module.exports = {
  createNewInsuranceFinanceRecord,
  getInsuranceFinanceRecordsByLot,
  find,
  transformDataToGenerateReport,
  getReportName,
  getReportDataOnStorage,
  hasCreatedReportToThisMonthAndYear,
  uploadReportToStorage,
};
