"use strict";

const testimonialFacade = require("./faq.facade");

const getAllQuestions = testimonialFacade.getAllQuestions;

const createQuestion = testimonialFacade.createQuestion;

const updateQuestion = testimonialFacade.updateQuestion;

const removeQuestion = testimonialFacade.removeQuestion;

module.exports = {
  getAllQuestions,
  createQuestion,
  updateQuestion,
  removeQuestion,
};
