"use strict";

const { MMailLog } = require("mongoose").models;

const getById = async (id) => {
  return MMailLog.findOne({ _id: id });
};

const getTotalByUser = async (user) => {
  return await MMailLog.find({ user: user }).sort({ createAt: -1 });
};

const createNewLog = async (log) => {
  return MMailLog.create(log);
};

const getByUserId = async ({ userId }) => {
  return await MMailLog.findOne({ user: userId }).lean().exec();
};

const getByEmail = async ({ email }) => {
  return await MMailLog.findOne({ mailTo: email }).lean().exec();
};

const getByType = async ({ type }) => {
  return await MMailLog.findOne({ type: type }).lean().exec();
};

const getByUserIdAndType = async ({ userId, type }) => {
  return await MMailLog.findOne({ user: userId, type: type }).lean().exec();
};

const getByEmailAndType = async ({ email, type }) => {
  return await MMailLog.findOne({ mailTo: email, type: type }).lean().exec();
};

module.exports = {
  getTotalByUser,
  getById,
  createNewLog,
  getByUserId,
  getByEmail,
  getByType,
  getByUserIdAndType,
  getByEmailAndType,
};
