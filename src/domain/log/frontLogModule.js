"use strict";

const { MFrontLog } = require("mongoose").models;
const userModule = require("../../domain/user/user/userModule");

const getById = async (id) => MFrontLog.findById(id);

const getByIp = async ({ ip }) => {
  return MFrontLog.findOne({ ip: ip })
    .populate("user")
    .populate("creditsLog")
    .populate("gatewayLog")
    .populate("kondutoLog")
    .populate("paymentLog")
    .populate("paymentErrorLog")
    .lean()
    .exec();
};

const getByUser = async (user) =>
  MFrontLog.find({ user: user }).sort({ createAt: -1 });

const getLogs = async ({
  userId,
  ip,
  email,
  document,
  initDate,
  endDate,
  pageSize = 100,
  page = 1,
}) => {
  const limit = pageSize;
  const skip = pageSize * page - limit;
  const filter = { $and: [] };

  if (userId) filter.$and.push({ user: userId });

  if (ip) filter.$and.push({ ip });

  if (email) {
    const user = await userModule.getByEmail(email, { _id: 1 });
    filter.$and.push({ user: user._id });
  } else if (document) {
    const user = await userModule.getByCpf(document, { _id: 1 });
    filter.$and.push({ user: user._id });
  }

  if (initDate) filter.$and.push({ updateAt: { $gte: initDate } });

  if (endDate) filter.$and.push({ updateAt: { $lte: endDate } });

  return MFrontLog.aggregate([
    {
      $match: filter,
    },
    {
      $sort: {
        updateAt: -1,
      },
    },
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },
    {
      $lookup: {
        from: "musers",
        let: { userId: "$user" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$_id", "$$userId"],
              },
            },
          },
          {
            $project: {
              _id: 1,
              cpf: 1,
              email: 1,
              name: 1,
            },
          },
        ],
        as: "user",
      },
    },
    {
      $unwind: {
        path: "$user",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        _id: 1,
        ip: 1,
        user: 1,
        createAt: 1,
        updateAt: 1,
      },
    },
  ]).exec();
};

const createLog = async (log = {}) => {
  try {
    if (typeof log === 'object') {
      const ip = typeof log.ip === 'string' ? log.ip : 'none';
      const step = typeof log.step === 'object' ? log.step : {};
      const generalData = typeof log.generalData === 'object' ? log.generalData : {}
      const user = typeof generalData.user === 'string' ? generalData.user : null;
      const navigator = typeof generalData.navigator === 'object' ? generalData.navigator : null;
      const frontLog = { ...step, ip, user, navigator };
      return await insertLog(frontLog);
    }
  } catch(error) {
    console.log(error);
  }
};

const addTrace = async (info = {}) => {
  try {
    if (typeof info === 'object') {
      const ip = typeof info.ip === 'string' ? info.ip : 'none';
      const user = typeof info.user === 'string' ? info.user : null;
      const navigator = typeof info.navigator === 'object' ? info.navigator : null;
      const frontLog = { ...info, ip, user, navigator };
      return await insertLog(frontLog);
    }
  } catch(error) {
    console.log(error);
  }
};

const insertLog = async (frontLog) => MFrontLog.create(frontLog);

module.exports = {
  addTrace,
  createLog,
  getById,
  getByIp,
  getByUser,
  getLogs,
};
