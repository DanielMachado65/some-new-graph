"use strict";

const { MUserKnow } = require("mongoose").models;

const create = async ({ name, document, email, phoneNumber, address }) => {
  try {
    await MUserKnow.createCollection();
    await MUserKnow.create({
      name,
      document,
      email,
      phoneNumber,
      address,
    });
  } catch (error) {
    return { error: "CREATE_MODEL_USER_KNOW_ERROR", data: error };
  }
  return { result: "ok" };
};

const getByEmail = async (email) => {
  try {
    const response = await MUserKnow.findOne({ email }).exec();
    return { result: response };
  } catch (error) {
    return { error: "GET_USER_KNOW_BY_EMAIL_ERROR", data: error };
  }
};

const getAll = async () => {
  try {
    const response = await MUserKnow.find().exec();
    return { result: response };
  } catch (error) {
    return { error: "GET_ALL_USER_KNOW_ERROR", data: error };
  }
};

module.exports = {
  create,
  getByEmail,
  getAll,
};
