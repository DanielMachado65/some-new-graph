"use strict";

const userConsentFacade = require("./userConsent.facade");

function getUserConsents(userId) {
  return userConsentFacade.getUserConsents(userId);
}

function updateUserConsent(consentId, hasGivenConsent) {
  return userConsentFacade.updateUserConsent(consentId, hasGivenConsent);
}

module.exports = {
  getUserConsents,
  updateUserConsent,
};
