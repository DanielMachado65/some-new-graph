"use strict";
const ownerReviewFacade = require("./ownersReview.facade");

const sendOwnerReview = ownerReviewFacade.ownerReview;
const getVersion = (fipeId, page, limit) => {
  return ownerReviewFacade.versionReview(fipeId, page, limit);
};
const getScoreVersion = (fipeId) => {
  return ownerReviewFacade.scoreVersionReview(fipeId);
};
const getBrandModel = (codModelBrand, page, limit) => {
  return ownerReviewFacade.brandModelReview(codModelBrand, page, limit);
};

const searchOpinionsModel = (codModelBrand, fipeId, page, limit) => {
  return ownerReviewFacade.searchOpinions(codModelBrand, fipeId, page, limit);
};

const getScoreBrandModel = (codModelBrand) => {
  return ownerReviewFacade.scoreBrandModelReview(codModelBrand);
};

async function getReviews(dtStart, dtEnd, licensePlate, mail, fipeId) {
  return await ownerReviewFacade.filteredReviews(
    dtStart,
    dtEnd,
    licensePlate,
    mail,
    fipeId
  );
}

async function getCountReviews() {
  return await ownerReviewFacade.countReviews();
}

async function findReview(id) {
  return await ownerReviewFacade.reviewById(id);
}

async function removeReview(id) {
  return await ownerReviewFacade.deleteReview(id);
}

module.exports = {
  sendOwnerReview,
  searchOpinionsModel,
  getVersion,
  getBrandModel,
  getScoreVersion,
  getScoreBrandModel,
  getReviews,
  getCountReviews,
  findReview,
  removeReview,
};
