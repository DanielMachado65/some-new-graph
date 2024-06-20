"use strict";

const { MFeedback } = require("mongoose").models;

const createFeedback = async ({ user, query, evaluation, description }) => {
  let feedback = null;
  try {
    feedback = await MFeedback.create({
      user,
      query,
      evaluation,
      description,
    });
  } catch (error) {
    return { error: "CREATE_MODEL_FEEDBACK_ERROR", data: error };
  }
  return { result: feedback };
};

const getAllFeedbacks = async () => {
  try {
    const response = await MFeedback.find({})
      .lean()
      .sort({ _id: -1 })
      .limit(300)
      .populate("user", "name email")
      .populate("query", "refClass");
    return { result: response };
  } catch (error) {
    return { error: "GET_ALL_FEEDBACK_ERROR", data: error };
  }
};

const getFeedbackById = async (feedbackId) => {
  try {
    const response = await MFeedback.findById(feedbackId)
      .populate("user", "name email")
      .populate("query", "refClass");
    return { result: response };
  } catch (error) {
    return { error: "GET_BY_ID_FEEDBACK_ERROR", data: error };
  }
};

const getFeedbackByUserId = async (userId) => {
  try {
    const response = await MFeedback.find({ user: userId })
      .populate("user", "name email")
      .populate("query", "refClass")
      .exec();
    return { result: response };
  } catch (error) {
    return { error: "GET_BY_USER_ID_FEEDBACK_ERROR", data: error };
  }
};

const removeFeedbackById = async (feedbackId) => {
  try {
    const response = await MFeedback.deleteOne({ _id: feedbackId }).exec();
    return { result: response };
  } catch (error) {
    return { error: "REMOVE_FEEDBACK_ERROR", data: error };
  }
};

const getFeedbackDataToReport = async (
  refMonth = new Date().getMonth(),
  refYear = new Date().getFullYear()
) => {
  const allFeedbacksPopulated = await MFeedback.find(
    { refMonth, refYear },
    { user: 1, query: 1, evaluation: 1, description: 1, createAt: 1 }
  )
    .lean()
    .populate("user", "email");
  return allFeedbacksPopulated.map((item) => ({
    email: item.user.email,
    queryId: item.query && item.query.toString(),
    evaluation: item.evaluation,
    description: item.description,
    createAt: item.createAt,
  }));
};

module.exports = {
  createFeedback,
  getAllFeedbacks,
  getFeedbackById,
  getFeedbackByUserId,
  removeFeedbackById,
  getFeedbackDataToReport,
};
