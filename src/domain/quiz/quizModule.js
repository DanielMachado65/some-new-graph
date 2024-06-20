"use strict";

const _ = require("lodash");
const { MQuiz } = require("mongoose").models;
const s3Service = require("../../infrastructure/services/aws/s3Service");

const createQuiz = async (
  userId,
  {
    title,
    message,
    questions,
    enable,
    questionTime,
    discountPercentage,
    couponName,
  }
) => {
  let quiz = null;
  try {
    const toUpdate =
      enable === true || enable === false
        ? {
          creator: userId,
          title,
          message,
          questions,
          enable,
          questionTime,
          discountPercentage,
          couponName,
        }
        : {
          creator: userId,
          title,
          message,
          questions,
          questionTime,
          discountPercentage,
          couponName,
        };

    await MQuiz.createCollection();
    quiz = await MQuiz.create([toUpdate]);
  } catch (error) {
    return { error: "CREATE_MODEL_QUIZ_ERROR", data: error };
  }
  return { result: quiz };
};

const updateQuiz = async (
  quizId,
  {
    title,
    message,
    questions,
    enable,
    questionTime,
    discountPercentage,
    couponName,
  }
) => {
  let quiz = null;
  try {
    const toUpdate =
      enable === true || enable === false
        ? {
          title,
          message,
          questions,
          enable,
          updatedAt: Date.now(),
          questionTime,
          discountPercentage,
          couponName,
        }
        : {
          title,
          message,
          questions,
          updatedAt: Date.now(),
          questionTime,
          discountPercentage,
          couponName,
        };

    await MQuiz.createCollection();
    quiz = await MQuiz.findOneAndUpdate(
      {
        _id: quizId,
      },
      {
        $set: toUpdate,
      },
      {
        upsert: true,
      }
    );
  } catch (error) {
    return { error: "UPDATE_MODEL_QUIZ_ERROR", data: error };
  }
  return { result: quiz };
};

const getQuizByCreator = async (userId) => {
  try {
    const response = await MQuiz.findOne({ creator: userId })
      .populate("creator", "name")
      .exec();
    return { result: response };
  } catch (error) {
    return { error: "GET_QUIZ_BY_CREATOR_ERROR", data: error };
  }
};

const getQuizById = async (quizId) => {
  try {
    const response = await MQuiz.findById(quizId)
      .populate("creator", "name")
      .exec();
    return { result: response };
  } catch (error) {
    return { error: "GET_QUIZ_BY_ID_ERROR", data: error };
  }
};

const getEnabledQuizById = async (quizId) => {
  try {
    const response = await MQuiz.findOne({
      _id: quizId,
      enable: true,
    })
      .populate("creator", "name")
      .exec();
    return { result: response };
  } catch (error) {
    return { error: "GET_QUIZ_BY_ID_ERROR", data: error };
  }
};

const getMessageAndTitleByQuizId = async (quizId) => {
  try {
    const response = await MQuiz.findOne({
      _id: quizId,
      enable: true,
    })
      .select("message title")
      .exec();
    return { result: response };
  } catch (error) {
    return { error: "GET_MESSAGE_AND_TITLE_BY_QUIZ_ID_ERROR", data: error };
  }
};

const getAllQuiz = async () => {
  try {
    const response = await MQuiz.find().populate("creator", "name").exec();
    return { result: response };
  } catch (error) {
    return { error: "GET_ALL_QUIZ_ERROR", data: error };
  }
};

const removeByQuizId = async (quizId) => {
  try {
    const response = await MQuiz.deleteOne({ _id: quizId });
    return { result: response };
  } catch (error) {
    return { error: "REMOVE_QUIZ_ERROR", data: error };
  }
};

const uploadImagesOnBucket = async (title, questions) => {
  const BUCKET_NAME = "olhonocarro.quiz";
  try {
    let messageError = null;
    for (let question of questions) {
      const picture = question.imageURL;
      if (typeof picture === "string") continue;
      if (typeof picture != "object" && typeof picture != "string") {
        messageError = "INVALID_TYPE_IMAGE_QUIZ_ERROR";
        break;
      }
      const fileName =
        _.snakeCase(_.deburr(title)) +
        "_" +
        _.snakeCase(_.deburr(question.question));
      const extension = _.last(picture.filename.split("."));
      const baseUrlBucket = "https://s3-sa-east-1.amazonaws.com/" + BUCKET_NAME;
      let objectPictureToSave = {
        contentType: picture.filetype,
        base64: picture.base64,
        key: `${fileName}.${extension}`,
      };
      await s3Service.putObject(`${BUCKET_NAME}`, objectPictureToSave);
      question.imageURL = `${baseUrlBucket}/${fileName}.${extension}`;
    }
    if (typeof messageError === "string")
      return { error: messageError, data: null };
    return { result: questions };
  } catch (error) {
    return { error: "UPLOAD_QUESTIONS_IMAGES_QUIZ_ERROR", data: error };
  }
};

module.exports = {
  createQuiz,
  updateQuiz,
  getQuizByCreator,
  getQuizById,
  getEnabledQuizById,
  getMessageAndTitleByQuizId,
  getAllQuiz,
  removeByQuizId,
  uploadImagesOnBucket,
};
