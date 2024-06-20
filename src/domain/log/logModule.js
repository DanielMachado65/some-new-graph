"use strict";

const { MLog } = require("mongoose").models;
const getById = async (_id) => {
  return MLog.findOne({ _id });
};

const getTotalByUser = async (user) => {
  return MLog.find({ user }).lean().sort({ createAt: -1 });
};

let createNewLog = async (log) => {
  return MLog.create(log);
};

const getByQuery = async (query) => {
  return MLog.findOne({ query });
};

module.exports = {
  getTotalByUser,
  getById,
  createNewLog,
  getByQuery,
};
