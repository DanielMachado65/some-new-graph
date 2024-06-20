"use strict";

const FaqRepository = require("./components/faq.repository");

const getAllQuestions = async () => {
  const questions = await FaqRepository.getAllQuestions();
  return { questions };
};

const createQuestion = FaqRepository.createQuestion.bind(FaqRepository);

const updateQuestion = FaqRepository.updateQuestion.bind(FaqRepository);

const removeQuestion = FaqRepository.removeQuestion.bind(FaqRepository);

module.exports = {
  getAllQuestions,
  createQuestion,
  updateQuestion,
  removeQuestion,
};
