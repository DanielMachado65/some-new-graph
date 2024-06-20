"use strict";

const USER_ERRORS = require("../../infrastructure/constants/message/user/user.error.message");
const { MUserConverted } = require("mongoose").models;

const {
  startOfTheDay,
  endOfTheDay,
} = require("../../infrastructure/utils/utils");

const findUserConvertedByEmail = async (email) => {
  return MUserConverted.findOne({
    email,
  });
};
const insertNewUserConverted = async (email, ip, cpf, isOwnerVehicle, key) => {
  const response = {
    status: true,
    msg: null,
  };
  const usersInserted = await MUserConverted.findOne({
    email,
  })
    .lean()
    .exec();
  if (usersInserted) {
    response.msg = USER_ERRORS.USER_EMAIL_ALREADY_USED;
    response.status = false;
  } else {
    await MUserConverted.create({
      email,
      ip,
      cpf,
      isOwnerVehicle,
      key,
    });
  }
  return response;
};

const getAllUsersConverteds = async (initDate, endDate) => {
  const fullFilter = {
    createAt: {
      $gte: startOfTheDay(initDate),
      $lte: endOfTheDay(endDate),
    },
  };
  const filter = initDate && endDate ? fullFilter : {};
  return await MUserConverted.find(filter).lean().exec();
};
module.exports = {
  findUserConvertedByEmail,
  insertNewUserConverted,
  getAllUsersConverteds,
};
