"use strict";

const { MUser, MPartner } = require("mongoose").models;
const partnerRepository = require('./components/partner.repositoy');

const PartnerTypesEnum = require("../../infrastructure/dictionaries/PartnerTypesEnum");
const {
  PARTNER_CLIENT_TYPE,
} = require("../../infrastructure/enumerators/userType.enum");

const updateRules = async (userid, partner) => {
  return partnerRepository.updateOne(
    {
      user: userid,
    },
    {
      partnerType: PartnerTypesEnum(partner.partnerType),
      percentage: partner.percentage ? parseFloat(partner.percentage) : 0,
      rules: {
        queries: partner.rules.queries ? partner.rules.queries : [],
        billing: {
          financialLockLimit:
            partner.rules.billing && partner.rules.billing.financialLockLimit
              ? parseFloat(partner.rules.billing.financialLockLimit)
              : 0,
          accountFundsLimit:
            partner.rules.billing && partner.rules.billing.accountFundsLimit
              ? parseFloat(partner.rules.billing.accountFundsLimit)
              : 0,
          registerRate:
            partner.rules.billing && partner.rules.billing.registerRate
              ? parseFloat(partner.rules.billing.registerRate)
              : 0,
          gateways:
            partner.rules.billing && partner.rules.billing.gateways
              ? partner.rules.billing.gateways
              : {
                gerenciaNet: {
                  clientSecret: null,
                  clientId: null,
                },
              },
        },
        user: {
          hasDisableUsers: partner.rules.user
            ? partner.rules.user.hasDisableUsers
            : false,
        },
        coupons: {
          discountPercentage: partner.rules.coupons
            ? partner.rules.coupons.discountPercentage
            : 0,
          discountValue: partner.rules.coupons
            ? partner.rules.coupons.discountValue
            : 0,
          minValueToApply: partner.rules.coupons
            ? partner.rules.coupons.minValueToApply
            : 0,
          limitUsage: partner.rules.coupons
            ? partner.rules.coupons.limitUsage
            : 0,
        },
      },
    }
  );
};

const getByUser = async (userid) => {
  return MPartner.findOne({
    user: userid,
  }).populate("rules.queries.queryComposition");
};

const checkIfIsPartnerIfIsReturnHisId = async (PartnerId) => {
  const hasPartners = await MUser.countDocuments({
    _id: PartnerId,
    type: PARTNER_CLIENT_TYPE,
  });
  if (!hasPartners) throw new Error("Este usuario nao é parceiro!");
  return PartnerId;
};

module.exports = {
  updateRules,
  getByUser,
  checkIfIsPartnerIfIsReturnHisId,
};
