"use strict";

const mongoose = require("mongoose");
const { MFaq } = mongoose.models;
const {
  BaseRepository,
} = require("../../../infrastructure/repository/BaseRepository");

class FaqRepository extends BaseRepository {
  constructor() {
    super(MFaq);
    this.defaultProjection = { title: 1, answer: 1, type: 1 };
  }

  getAllQuestions() {
    return this.getAllExceptLogicallyRemoved({}, [], this.defaultProjection);
  }

  createQuestion(question) {
    return this.createWithProjection(question, this.defaultProjection);
  }

  updateQuestion(faqId, question) {
    return this.updateByIdAndReturnNew(faqId, question, this.defaultProjection);
  }

  removeQuestion(faqId) {
    return this.removeByIdLogicallyAndReturnNew(faqId, this.defaultProjection);
  }
}

module.exports = new FaqRepository();
