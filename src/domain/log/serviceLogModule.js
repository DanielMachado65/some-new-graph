"use strict";

const { MServiceLog } = require("mongoose").models;
const ServicesEnum = require("../../infrastructure/dictionaries/ServicesEnum");
const VendorsEnum = require("../../infrastructure/dictionaries/VendorsEnum");
const {
  TetrisService,
} = require("../../infrastructure/services/tetris/tetris.service");
const d3 = require("d3-collection");
const _ = require("lodash");

//@TODO meu deus, refazer - getByIdWithLogPopulated
const getById = async (id) => {
  return MServiceLog.findOne({
    _id: id,
  }).populate("log");
};

const createNewLog = async (log) => {
  return MServiceLog.create(log);
};

//@TODO meu deus, refazer
const getLot = async (dateRef, amount = 100) => {
  let filter = dateRef
    ? {
        date: {
          $gt: dateRef,
        },
      }
    : {};

  amount = amount && amount != "0" ? parseInt(amount) : 1;
  amount = amount > 100 ? 100 : amount;

  let services = await MServiceLog.find(filter)
    .sort({
      date: -1,
    })
    .limit(amount)
    .lean()
    .exec();

  let servicesMapped = _.map(services, (s) => {
    return {
      code: s.serviceCode,
      name: ServicesEnum(s.serviceCode).name,
      vendor: VendorsEnum(ServicesEnum(s.serviceCode).supplierCode),
      createAt: s.date,
      status: s.status,
      error: s.error,
    };
  });
  return servicesMapped;
};

//@TODO meu deus, refazer
const getLotDesc = async (dateRef, amount = 30) => {
  let filter = dateRef
    ? {
        date: {
          $lt: dateRef,
        },
      }
    : {};

  amount = amount && amount != "0" ? parseInt(amount) : 1;
  amount = amount > 30 ? 30 : amount;

  let services = await MServiceLog.find(filter)
    .sort({
      date: -1,
    })
    .limit(amount)
    .lean();

  return services.map((s) => {
    return {
      code: s.serviceCode,
      name: ServicesEnum(s.serviceCode).name,
      vendor: VendorsEnum(ServicesEnum(s.serviceCode).supplierCode),
      createAt: s.date,
      status: s.status,
      error: s.error,
    };
  });
};

//@TODO meu deus, refazer
const getSummaryLastWeek = async () => {
  let lastDay = new Date();
  lastDay = lastDay.setDate(lastDay.getDate() - 7);
  let services = await MServiceLog.find(
    {
      date: {
        $gte: lastDay,
      },
    },
    {
      status: 1,
      date: 1,
    }
  )
    .sort({
      date: -1,
    })
    .limit(1000);

  services = _.map(services, (s) => {
    return {
      status: s.status,
      date: s.date.toISOString().split("T")[0],
    };
  });

  let entries = d3
    .nest()
    .key(function (s) {
      return s.date;
    })
    .entries(services);

  services = _.map(entries, (e) => {
    return {
      key: e.key,
      success:
        e.values.length > 1
          ? _.sumBy(e.values, (o) => {
              return o.status == true;
            })
          : e.values[0].status
          ? 1
          : 0,
      error:
        e.values.length > 1
          ? _.sumBy(e.values, (o) => {
              return o.status == false;
            })
          : !e.values[0].status
          ? 1
          : 0,
    };
  });
  return services;
};

const getServiceName = async (id) => {
  let response = {
    name: null,
    supplier: null,
  };
  let serviceLog = await MServiceLog.findById(id);
  if (serviceLog) {
    let service = ServicesEnum(serviceLog.serviceCode);
    response.name = service.name;
    response.supplier = VendorsEnum(service.supplierCode);
  }
  return response;
};

const getLotByRangeDate = async (initDate, endDate) => {
  const services = await MServiceLog.find({
    $and: [
      {
        date: {
          $gt: initDate,
        },
      },
      {
        date: {
          $lt: endDate,
        },
      },
    ],
  })
    .sort({
      date: -1,
    })
    .limit(100)
    .lean();

  return services.map((s) => ({
    code: s.serviceCode,
    name: ServicesEnum(s.serviceCode).name,
    vendor: VendorsEnum(ServicesEnum(s.serviceCode).supplierCode),
    createAt: s.date,
    status: s.status,
    error: s.error,
  }));
};

const getLasts = async (limit) => {
  limit = parseInt(limit);
  limit = limit <= 1000 ? limit : 1000;

  let services = await MServiceLog.find({})
    .sort({ createAt: -1 })
    .limit(limit)
    .lean()
    .exec();

  return services;
};

const getByMonthAndYear = async (referenceMonth, referenceYear) => {
  let response = null;
  try {
    const initialDate = new Date(referenceYear, referenceMonth, 1);
    const finalDate = new Date(referenceYear, referenceMonth + 1, 1);
    response = await MServiceLog.aggregate([
      { $match: { date: { $gte: initialDate, $lt: finalDate } } },
      {
        $group: {
          _id: "$serviceCode",
          totalError: {
            $sum: {
              $switch: {
                branches: [{ case: { $eq: ["$status", false] }, then: 1 }],
                default: 0,
              },
            },
          },
          totalSuccess: {
            $sum: {
              $switch: {
                branches: [{ case: { $eq: ["$status", true] }, then: 1 }],
                default: 0,
              },
            },
          },
          total: { $sum: 1 },
        },
      },
      { $sort: { _id: -1 } },
      {
        $lookup: {
          from: "mservices",
          localField: "_id",
          foreignField: "code",
          as: "service",
        },
      },
      { $unwind: "$service" },
      {
        $project: {
          _id: 0,
          code: "$_id",
          serviceName: "$service.name",
          supplierName: "$service.supplier.name",
          totalError: 1,
          totalSuccess: 1,
          total: 1,
        },
      },
    ]).exec();
    return { result: response };
  } catch (error) {
    return {
      error: "GET_SERVICES_LOG_BY_MONTH_AND_YEAR_ON_DB_ERROR",
      data: error,
    };
  }
};

const getTotalUsedServices = async (month, year) => {
  return TetrisService.getTotalUsedServicesReport(month, year);
};

module.exports = {
  getById,
  createNewLog,
  getLot,
  getLotDesc,
  getSummaryLastWeek,
  getServiceName,
  getLotByRangeDate,
  getLasts,
  getByMonthAndYear,
  getTotalUsedServices,
};
