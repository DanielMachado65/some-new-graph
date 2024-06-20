'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MQuizSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'MUser',
    default: null
  },
  enable: { type: Boolean, default: true },
  title: { type: String, default: null },
  message: { type: String, default: null },
  questionTime: { type: Number, default: 1 },
  discountPercentage: { type: Number, default: 1 },
  couponName: { type: String, default: null },
  questions: [
    {
      question: { type: String, default: null },
      answers: [{ answer: { type: String, default: null }, _id: false }],
      rightAnswer: { type: String, default: null },
      explanation: { type: String, default: null },
      imageURL: { type: String, default: null },
      _id: false
    }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: null },
}, {
  usePushEach: true
});

module.exports.MQuizSchema = MQuizSchema;
module.exports.MQuiz = mongoose.model('MQuiz', MQuizSchema);
