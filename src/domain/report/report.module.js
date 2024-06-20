"use strict";

const { sendReportToUserEmail } = require("./report.helper");

const feedBackFacade = require("./facades/feedBack.facade");
const testDriveFacade = require("./facades/testDrive.facade");
const partnerIncomingFacade = require("../billing/partner_incoming/partnerIncoming.facade");
const analyticsFacade = require("../analytics/analytics.facade");
const ownersFacede = require("../owners_review/ownersReview.facade");
const testDriveFacadeVehicle = require("../test_drive/testDrive.facade");
const nfeFacade = require("../nfes/nfe.facade");
const paymentFacade = require("../billing/payment/payment.facade");
const suvFacade = require("../suv/suv.facade");

/* --------------------
  Feedback
-------------------- */
const getTopRatingsOfFeedbacks = async ({ month, year, userId }) => {
  const data = await feedBackFacade.getTopRatingsOfFeedbacks(month, year);
  await sendReportToUserEmail({
    userId,
    reportName: "Todos feedbacks",
    sheetName: "feedbacks",
    storageFolder: "feedback",
    reportData: data,
  });
};

/* --------------------
  Test Drive
-------------------- */
const getChosenVersionsInTestDrive = async ({ month, year, userId }) => {
  const data = await testDriveFacade.getChosenVersionsInTestDrive(month, year);
  await sendReportToUserEmail({
    userId,
    reportName: "Versões selecionadas no Test-drive",
    sheetName: "versoesTestDrive",
    storageFolder: "testDrive",
    reportData: data,
  });
};

/* --------------------
  Partner Incoming
-------------------- */
const getAllPartnersIncomingsByDate = async (userId, maybeMonth, maybeYear) => {
  const data = await partnerIncomingFacade.getAllPartnersIncomingsByDate(
    maybeMonth,
    maybeYear
  );
  await sendReportToUserEmail({
    userId,
    reportName: "Faturamento de parceiro",
    sheetName: "faturamentoParceiro",
    storageFolder: "partnerIncoming",
    reportData: data,
  });
};

/* --------------------
  Analytics
-------------------- */
const getAllAnalyticsByDate = async (userId, maybeMonth, maybeYear) => {
  const data = await analyticsFacade.getAllAnalyticsByDate(
    maybeMonth,
    maybeYear
  );
  await sendReportToUserEmail({
    userId,
    reportName: "Redirecionamento para parceiros",
    sheetName: "redirecionamentoParaParceiros",
    storageFolder: "partnerRedirection",
    reportData: data,
  });
};

/* --------------------
  Owners Review
-------------------- */
const getOwnersReviewReportByDate = async ({ month, year, userId }) => {
  const data = await ownersFacede.reportByDate(month, year);
  await sendReportToUserEmail({
    userId,
    reportName: "Opnião do Dono",
    sheetName: "opniaodono",
    storageFolder: "ownersReview",
    reportData: data,
  });
};

const getGeneratedNfeReportByDate = async ({ month, year, userId }) => {
  const data = await nfeFacade.reportManuallyGeneratedByDate(month, year, true);
  await sendReportToUserEmail({
    userId,
    reportName: "Notas Fiscais Manuais",
    sheetName: "notas_ficais_manuais",
    storageFolder: "manuallyGeneratedNFe",
    reportData: data,
  });
};

/* --------------------
  report model not found
-------------------- */
const getModelNotFoundByDate = async ({ month, year }) => {
  return testDriveFacadeVehicle.getModelsNotFoundByDate({ month, year });
};

/* -------------------------------
  User with signatures
---------------------------------- */
const getActivePayments = async (month, year, userId) => {
  const data = await paymentFacade.getUsersWithSignatureActive(month, year);
  await sendReportToUserEmail({
    userId,
    reportName: "Compras de Assinaturas",
    sheetName: "comprasDeAssinaturas",
    storageFolder: "comprasDeAssinaturas",
    reportData: data,
  });
};

/* -------------------------------
  User with packages
---------------------------------- */
const getPackages = async (month, year, userId) => {
  const data = await paymentFacade.getUserWithPackages(month, year);

  await sendReportToUserEmail({
    userId,
    reportName: "Compras de Pacotes",
    sheetName: "comprasDePacotes",
    storageFolder: "compraDePacotes",
    reportData: data,
  });
};

/* -------------------------------
  Report logs in micro service SUV
---------------------------------- */
const getSuvLogs = async (month, year, userId) => {
  const data = await suvFacade.getSuvLogs(month, year);

  await sendReportToUserEmail({
    userId,
    reportName: "SUV Logs",
    sheetName: "suvLogs",
    storageFolder: "suvLogs",
    reportData: data,
  });
};

module.exports = {
  getAllPartnersIncomingsByDate,
  getChosenVersionsInTestDrive,
  getTopRatingsOfFeedbacks,
  getAllAnalyticsByDate,
  getOwnersReviewReportByDate,
  getGeneratedNfeReportByDate,
  getModelNotFoundByDate,
  getActivePayments,
  getPackages,
  getSuvLogs,
};
