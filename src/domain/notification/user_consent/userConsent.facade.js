"use strict";

const dateUtils = require("../../../infrastructure/utils/date.util");
const {
  ConsentService,
} = require("../../../infrastructure/services/consent/consent.service");
const {
  HttpClientService,
} = require("../../../infrastructure/services/http_client");

const applicationId = process.env.APPLICATION_ID;
const baseUrl = process.env.UCC_URL;

const httpClient = new HttpClientService(
  HttpClientService.strategyBuilder().useAxios()
);
const consentService = new ConsentService(httpClient, baseUrl);

function parseConsent(consent) {
  const hasPast3Months = dateUtils.isSameOrAfter(
    dateUtils.getDateFrom3MonthsBefore(),
    new Date(consent.updatedAt)
  );
  return {
    id: consent.id,
    consentType: consent.consentType,
    channelType: consent.channelType,
    hasGivenConsent: consent.hasGivenConsent,
    createdAt: consent.createdAt,
    updatedAt: consent.updatedAt,
    display: !consent.hasGivenConsent && hasPast3Months,
  };
}

async function getUserConsents(userId) {
  const consents = await consentService.getUserConsents(userId, applicationId);
  return consents.map(parseConsent);
}

async function updateUserConsent(consentId, hasGivenConsent) {
  const consent = await consentService.updateUserConsent(
    consentId,
    hasGivenConsent
  );
  return consent ? parseConsent(consent) : null;
}

module.exports = {
  getUserConsents,
  updateUserConsent,
};
