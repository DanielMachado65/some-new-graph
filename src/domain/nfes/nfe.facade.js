"use strict";

const { NfeRepository } = require("./components/nfe.repositoy");
const DateUtil = require("../../infrastructure/utils/date.util");

const nfeRepository = new NfeRepository();

function nfeDataFactory(
  userId,
  paymentId,
  xmlLink,
  pdfLink,
  value,
  description,
  status,
  externalNfeId
) {
  return {
    user: userId,
    payment: paymentId,
    xmlLink,
    pdfLink,
    value,
    description,
    status,
    externalNfeId,
  };
}

const createNfe = async (userId, paymentId, nfe) => {
  const { status, xmlLink, pdfLink, value, description, externalNfeId } = nfe;
  return nfeRepository.create(
    nfeDataFactory(
      userId,
      paymentId,
      xmlLink,
      pdfLink,
      value,
      description,
      status,
      externalNfeId
    )
  );
};

const updateNFe = async (nfeId, data) => {
  await nfeRepository.updateOne(nfeId, data);
};

const getNfeById = async (nfeId) => {
  return await nfeRepository.getById(nfeId);
};

const getNFeByPayment = async (paymentId) => {
  return await nfeRepository.getNFeByPayment(paymentId);
};

const reportManuallyGeneratedByDate = (maybeMonth, maybeYear, isManuallyGenerated) => {
  const { startDate, endDate } = DateUtil.getMonthStartEndDateOrDefault(
      maybeMonth,
      maybeYear
  );
  return nfeRepository.reportManuallyGeneratedByDate(startDate, endDate, isManuallyGenerated);
}

module.exports = {
  createNfe,
  updateNFe,
  getNfeById,
  getNFeByPayment,
  reportManuallyGeneratedByDate,
};
