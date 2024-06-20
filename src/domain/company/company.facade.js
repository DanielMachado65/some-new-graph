"use strict";

const CompanyRepository = require("./components/company.repository");
const QueryInfoRepository = require("../query/queryInfo/components/queryInfo.repository");
const TestimonialRepository = require("../testimonial/components/testimonial.repository");

const getAvailableInfos = async () => {
  const availableInfos = await QueryInfoRepository.getAllQueryInfos();
  return { availableInfos };
};

const getAvailableInfosComparison = async () => {
  const availableInfosComparison = await QueryInfoRepository.getAllQueryInfosComparison();
  return { availableInfosComparison };
};

const getTestimonials = async () => {
  const testimonials = await TestimonialRepository.getAllTestimonials();
  return { testimonials };
};

const getFrequentlyAskedQuestions = async () => {
  const response = await CompanyRepository.getFaq();
  const frequentlyAskedQuestions = response || [];
  return { frequentlyAskedQuestions };
};

const getCompanyMedias = async () => {
  const response = await CompanyRepository.find({}, { _id: 0, medias: 1 });
  const companyMedias = (response && response[0] && response[0].medias) || [];
  return { companyMedias };
};

const updateFrequentlyAskedQuestions = async (faq) => {
  const company = await CompanyRepository.updateFaq(faq);
  return { company };
};

const updateCompanyMedias = async (medias) => {
  const company = await CompanyRepository.updateMedias(medias);
  return { company };
};

module.exports = {
  getAvailableInfos,
  getAvailableInfosComparison,
  getCompanyMedias,
  getFrequentlyAskedQuestions,
  getTestimonials,
  updateFrequentlyAskedQuestions,
  updateCompanyMedias,
};
