"use strict";

const { MQuizAnswer } = require("mongoose").models;
const priceTableModule = require("../billing/priceTableModule");
const mailSender = require("../mail/mailSender.service");
const {
  BadRequestException,
} = require("../../infrastructure/helpers/Error.helper");
const {
  startOfTheDay,
  endOfTheDay,
} = require("../../infrastructure/utils/utils");

const schedulerService = require("../../infrastructure/services/scheduler/scheduler.service");

const createQuizAnswer = async (
  quizId,
  { email, totalQuestions, hitsNumber, answers, couponName, isEmailChecked }
) => {
  let quizAnswer = null;
  try {
    await MQuizAnswer.createCollection();
    quizAnswer = await MQuizAnswer.create([
      {
        quiz: quizId,
        email,
        totalQuestions,
        hitsNumber,
        answers,
        couponName,
        isEmailChecked,
      },
    ]);
  } catch (error) {
    return { error: "CREATE_MODEL_QUIZ_ANSWER_ERROR", data: error };
  }
  return { result: quizAnswer };
};

const updateQuizAnswer = async (
  quizAnswerId,
  { email, totalQuestions, hitsNumber, answers }
) => {
  let quizAnswer = null;
  try {
    await MQuizAnswer.createCollection();
    quizAnswer = await MQuizAnswer.findOneAndUpdate(
      {
        _id: quizAnswerId,
      },
      {
        $set: {
          email,
          totalQuestions,
          hitsNumber,
          answers,
          updatedAt: Date.now,
        },
      },
      {
        upsert: true,
      }
    );
  } catch (error) {
    return { error: "UPDATE_MODEL_QUIZ_ANSWER_ERROR", data: error };
  }
  return { result: quizAnswer };
};

const updateDataFacebook = async (quizAnswerId, facebookObject) => {
  let response = null;
  try {
    const updatedAt = new Date();
    response = await MQuizAnswer.findOneAndUpdate(
      {
        _id: quizAnswerId,
      },
      {
        $set: {
          facebook: facebookObject,
          updatedAt,
        },
      }
    );
  } catch (error) {
    return {
      error: "UPDATE_FACEBOOK_DATA_ON_MODEL_QUIZ_ANSWER_ERROR",
      data: error,
    };
  }
  return { result: response };
};

const getQuizAnswerByEmail = async ({ email }) => {
  try {
    const response = await MQuizAnswer.find({ email })
      .populate("quiz", "title")
      .exec();
    return { result: response };
  } catch (error) {
    return { error: "GET_QUIZ_ANSWER_BY_EMAIL_ERROR", data: error };
  }
};

const getQuizAnswerByQuizId = async (quizId) => {
  try {
    const response = await MQuizAnswer.find({ quiz: quizId })
      .populate("quiz", "title")
      .exec();
    return { result: response };
  } catch (error) {
    return { error: "GET_QUIZ_ANSWER_BY_QUIZ_ID_ERROR", data: error };
  }
};

//@TODO REFAZER!!!!!!
const getAllQuizAnswer = async ({ initDate, endDate, email, quizId }) => {
  const LIMIT_MAX = 150;

  const filterAnd = {
    $and: [],
  };

  if (initDate && endDate) {
    filterAnd.$and.push({
      createdAt: {
        $gte: startOfTheDay(initDate),
        $lte: endOfTheDay(endDate),
      },
    });
  }

  if (email) {
    filterAnd.$and.push({
      email: { $eq: email },
    });
  }

  if (quizId) {
    filterAnd.$and.push({
      quiz: quizId,
    });
  }

  try {
    const filterOptions = [];
    filterOptions.push({ $sort: { createdAt: -1 } });
    filterAnd.$and.length
      ? filterOptions.push({ $match: filterAnd })
      : filterOptions.push({ $limit: LIMIT_MAX });
    filterOptions.push(
      {
        $lookup: {
          from: "mcoupons",
          localField: "couponName",
          foreignField: "code",
          as: "coupon",
        },
      },
      {
        $unwind: "$coupon",
      },
      {
        $lookup: {
          from: "mquizzes",
          localField: "quiz",
          foreignField: "_id",
          as: "quiz",
        },
      },
      {
        $unwind: "$quiz",
      },
      {
        $project: {
          _id: 1,
          facebook: 1,
          "quiz._id": 1,
          "quiz.title": 1,
          couponName: 1,
          email: 1,
          totalQuestions: 1,
          hitsNumber: 1,
          isEmailChecked: 1,
          answers: 1,
          "coupon._id": 1,
          "coupon.code": 1,
          updatedAt: 1,
          createdAt: 1,
        },
      }
    );

    const response = await MQuizAnswer.aggregate(filterOptions);
    return { result: response };
  } catch (error) {
    return { error: "GET_ALL_QUIZ_ANSWER_ERROR", data: error };
  }
};

const sendEmail = async (email, coupon, quizAnswer = null, timesSend = 0) => {
  try {
    const pricesQuery = await enrichTheDataForEmail();
    if (!timesSend && quizAnswer) {
      await mailSender.sendFirstEmailQuiz(
        email,
        coupon,
        quizAnswer,
        pricesQuery
      );
      const timeToLoose = 48 * 60 * 60 * 1000;
      schedulerService.emit({
        endpoint: "/api/quiz-answer/send-email",
        payload: {
          email,
          coupon,
          timesSend: timesSend + 1,
          timeToLoose,
        },
        timeToLoose,
      });
    }
    if (timesSend === 1)
      await mailSender.sendSecondEmailQuiz(email, coupon, pricesQuery);
  } catch (e) {
    console.log("CATCH ESCHEDULER QUIZ FLOW => " + e);
  }
};

const enrichTheDataForEmail = async () => {
  const priceTables = await priceTableModule.getDefaultQueries("default");
  if (!priceTables)
    throw BadRequestException("unable to get defaultPriceTable");
  return enrichVeicular(priceTables);
};

const enrichVeicular = (priceTable) => {
  let result = {};
  let object = priceTable.find((o) => o.querycode === 100);
  result.priceVeiculoCompleto = object ? object.price : "Preco nao definido";
  object = priceTable.find((o) => o.querycode === 99);
  result.priceVeiculoBasico = object ? object.price : "Preco nao definido";
  object = priceTable.find((o) => o.querycode === 18);
  result.priceLeilao = object ? object.price : "Preco nao definido";
  return result;
};

module.exports = {
  createQuizAnswer,
  updateQuizAnswer,
  getQuizAnswerByEmail,
  getQuizAnswerByQuizId,
  getAllQuizAnswer,
  sendEmail,
  updateDataFacebook,
};
