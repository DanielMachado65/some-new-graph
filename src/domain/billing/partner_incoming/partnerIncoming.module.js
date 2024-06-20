const partnerIncomingFacade = require("./partnerIncoming.facade");

const getAllPartnersIncomingsByDate = (maybeMonth, maybeYear) => {
  return partnerIncomingFacade.getAllPartnersIncomingsByDate(
    maybeMonth,
    maybeYear
  );
};

const getSinglePartnerIncomingsByDate = (
  partnerUserId,
  maybeMonth,
  maybeYear
) => {
  return partnerIncomingFacade.getSinglePartnerIncomingsByDate(
    partnerUserId,
    maybeMonth,
    maybeYear
  );
};

module.exports = {
  getAllPartnersIncomingsByDate,
  getSinglePartnerIncomingsByDate,
};
