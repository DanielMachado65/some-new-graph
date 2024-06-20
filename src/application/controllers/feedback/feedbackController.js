'use strict';

const FeedbackModule = require('../../../domain/feedback/feedbackModule');
const FeedbackHelper = require('../../../infrastructure/helpers/feedback/feedbackHelper');
const {
    responseObject,
} = require('../../../infrastructure/helpers/routerHelper');
const createFeedback = async (data) => {
    try {
        const feedbackValidationResponse = await FeedbackHelper.validateAllData(
            data,
        );
        if (feedbackValidationResponse.error)
            return FeedbackHelper.feedbackErrorHandler(
                feedbackValidationResponse,
            );

        const feedbackResponse = await FeedbackModule.createFeedback(data);
        if (feedbackResponse.error)
            return FeedbackHelper.feedbackErrorHandler(feedbackResponse);

        return { result: 'ok' };
    } catch (error) {
        return { error: 'CREATE_FEEDBACK_ERROR', data: error };
    }
};

const getAllFeedbacks = async () => {
    const response = await FeedbackModule.getAllFeedbacks();
    if (response.error) return FeedbackHelper.feedbackErrorHandler(response);
    return response;
};

const getFeedbackById = async (feedbackId) => {
    const response = await FeedbackModule.getFeedbackById(feedbackId);
    if (response.error) return FeedbackHelper.feedbackErrorHandler(response);
    return response;
};

const getFeedbackByUserId = async (userId) => {
    const response = await FeedbackModule.getFeedbackByUserId(userId);
    if (response.error) return FeedbackHelper.feedbackErrorHandler(response);
    return response;
};

const removeFeedbackById = async (feedbackId) => {
    const response = await FeedbackModule.removeFeedbackById(feedbackId);
    if (response.error) return FeedbackHelper.feedbackErrorHandler(response);
    return response;
};

const getFeedbackDataToReport = async (ctx) => {
    const { refMonth, refYear } = ctx.query;
    const response = await FeedbackModule.getFeedbackDataToReport(
        refMonth,
        refYear,
    );
    return responseObject(ctx, 200, response);
};

module.exports = {
    createFeedback,
    getAllFeedbacks,
    getFeedbackById,
    getFeedbackByUserId,
    removeFeedbackById,
    getFeedbackDataToReport,
};
