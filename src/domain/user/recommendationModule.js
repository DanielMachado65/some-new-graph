"use strict";

const USER_ERRORS = require("../../infrastructure/constants/message/user/user.error.message");
const mailSender = require("../mail/mailSender.service");
const userModule = require("./user/userModule");
const { MRecommendation } = require("mongoose").models;

const systemNotificationModule = require("../notification/systemNotificationModule");
const operatorMail = "alberto.kusano@checktudo.com.br";

const addNewRecommendation = async (params) => {
  try {
    params.nominative.email = params.nominative.email.toLowerCase();
    let obj = await userModule.getByEmail(params.nominative.email);

    if (obj)
      return {
        err: USER_ERRORS.EMAIL_ALREADY_EXISTS,
      };
    let recommendation = await MRecommendation.create(params);

    let notification = {
      type: 100,
      description: `Recebemos uma indicação de cliente -> ${params.nominative.name} / ${params.nominative.email} / ${params.nominative.phoneNumber}   `,
    };
    await systemNotificationModule.createNew(notification, operatorMail);
    return recommendation;
  } catch (error) {
    console.log("Error to create notification => ");
    console.log(error);
  }
};

const getAll = async () => {
  return MRecommendation.find({}).lean();
};

module.exports = {
  addNewRecommendation,
  getAll,
};
