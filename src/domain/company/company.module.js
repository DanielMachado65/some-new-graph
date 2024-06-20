"use strict";

const companyFacade = require("./company.facade");

const getAvailableInfos = () => companyFacade.getAvailableInfos();

const getAvailableInfosComparison = () =>
  companyFacade.getAvailableInfosComparison();

const getTestimonials = () => companyFacade.getTestimonials();

const getFrequentlyAskedQuestions = () =>
  companyFacade.getFrequentlyAskedQuestions();

const getCompanyMedias = () => companyFacade.getCompanyMedias();

const updateFrequentlyAskedQuestions = (faq) =>
  companyFacade.updateFrequentlyAskedQuestions(faq);

const updateCompanyMedias = (medias) =>
  companyFacade.updateCompanyMedias(medias);

module.exports = {
  getAvailableInfos,
  getAvailableInfosComparison,
  getCompanyMedias,
  getFrequentlyAskedQuestions,
  getTestimonials,
  updateFrequentlyAskedQuestions,
  updateCompanyMedias,
};
