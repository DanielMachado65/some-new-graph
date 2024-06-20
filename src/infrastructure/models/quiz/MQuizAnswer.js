'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MQuizAnswerSchema = new Schema({
  quiz: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'MQuiz',
    default: null
  },
  couponName: { type: String, default: null },
  email: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
  totalQuestions: { type: Number, default: 0 },
  hitsNumber: { type: Number, default: 0 },
  isEmailChecked: { type: Boolean, default: false },
  facebook: {
    shared: { type: Boolean, default: false },
    time: { type: Date, default: null }
  },
  answers: [
    {
      question: { type: String, default: null },
      answers: [{ answer: { type: String, default: null }, _id: false }],
      rightAnswer: { type: String, default: null },
      explanation: { type: String, default: null },
      imageURL: { type: String, default: null },
      userAnswer: { type: String, default: null },
      _id: false
    }
  ],
  updatedAt: { type: Date, default: null },
}, {
  usePushEach: true
});

module.exports.MQuizAnswerSchema = MQuizAnswerSchema;
module.exports.MQuizAnswer = mongoose.model('MQuizAnswer', MQuizAnswerSchema);
