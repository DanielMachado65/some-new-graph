"use strict";
const {
  BaseRepository,
} = require("../../../../infrastructure/repository/BaseRepository");
const mongoose = require("mongoose");
const { MUser, MCarRevendor } = mongoose.models;

module.exports.UserRepository = class UserRepository extends BaseRepository {
  constructor() {
    super(MUser);
  }

  getByBilling = async (billing, projection = {}) => {
    return this.model.findOne({ billing }, projection).lean();
  };

  getPassByUserId = async (userId) => {
    const data = await this.model.findOne({ _id: userId });
    return data.pass;
  };

  deleteUser = async (userId, date) => {
    const pipeline = [
      { $match: { _id: new mongoose.Types.ObjectId(userId) } },
      {
        $lookup: {
          from: "mpayments",
          localField: "billing",
          foreignField: "billing",
          as: "payments",
        },
      },
      {
        $lookup: {
          from: "minvoices",
          localField: "billing",
          foreignField: "billing",
          as: "invoices",
        },
      },
      {
        $lookup: {
          from: "mconsumptionstatements",
          localField: "billing",
          foreignField: "_id",
          as: "consumptions",
        },
      },
      {
        $lookup: {
          from: "mcoupons",
          localField: "coupons",
          foreignField: "_id",
          as: "coupons",
        },
      },
      {
        $lookup: {
          from: "mbillings",
          localField: "billing",
          foreignField: "_id",
          as: "billing",
        },
      },
      { $unwind: "$billing" },
    ];

    const aggregateUser = await this.model.aggregate(pipeline);
    if (!aggregateUser.length) return false;

    const findUser = await this.model.findOne({ _id: userId });
    findUser.whenDeleteAt = this._getDateWhenUserDeleted(aggregateUser, date);
    findUser.status = false;
    findUser.deletedAt = date.today;
    findUser.save();
    return true;
  };

  undeleteUser = async (userId) => {
    const findUser = await this.model.find({ _id: userId });
    if (!findUser.length) return false;

    findUser[0].status = true;
    findUser[0].whenDeleteAt = null;
    findUser[0].deletedAt = null;
    await findUser[0].save();
    return true;
  };

  dataDownload = async (userId) => {
    const data = await this.model.findOne({ _id: userId });

    return {
      Nome: data.name,
      CPF: data.cpf,
      Email: data.email,
      "Telefone 1": (data.generalData && data.generalData.phoneNumber1) || "-",
      "Telefone 2": (data.generalData && data.generalData.phoneNumber2) || "-",
      CEP: (data.generalData && data.generalData.address.zipcode) || "-",
      cidade: (data.generalData && data.generalData.address.city) || "-",
      estado: (data.generalData && data.generalData.address.state) || "-",
      bairro:
        (data.generalData && data.generalData.address.neighborhood) || "-",
      rua: (data.generalData && data.generalData.address.street) || "-",
      complemento:
        (data.generalData && data.generalData.address.complement) || "-",
      numero: (data.generalData && data.generalData.address.number) || "-",
    };
  };

  whenUserDeleted = async (userId, date) => {
    const pipeline = [
      { $match: { _id: new mongoose.Types.ObjectId(userId) } },
      {
        $lookup: {
          from: "mpayments",
          localField: "billing",
          foreignField: "billing",
          as: "payments",
        },
      },
      {
        $lookup: {
          from: "minvoices",
          localField: "billing",
          foreignField: "billing",
          as: "invoices",
        },
      },
      {
        $lookup: {
          from: "mconsumptionstatements",
          localField: "billing",
          foreignField: "_id",
          as: "consumptions",
        },
      },
      {
        $lookup: {
          from: "mcoupons",
          localField: "coupons",
          foreignField: "_id",
          as: "coupons",
        },
      },
      {
        $lookup: {
          from: "mbillings",
          localField: "billing",
          foreignField: "_id",
          as: "billing",
        },
      },
      { $unwind: "$billing" },
    ];
    const aggregateUser = await this.model.aggregate(pipeline);
    return this._getDateWhenUserDeleted(aggregateUser, date);
  };

  _getDateWhenUserDeleted = (aggregateUser, date) => {
    if (
      aggregateUser[0].payments.length ||
      aggregateUser[0].invoices.length ||
      aggregateUser[0].consumptions.length ||
      aggregateUser[0].coupons.length ||
      aggregateUser[0].billing.accountFunds > 0
    ) {
      return {
        date: date.fiveYears,
        value: "5y",
      };
    } else {
      return {
        date: date.threeDays,
        value: "3d",
      };
    }
  };

  getCarResellerUsers = async ({ initDate, endDate }) => {
    const pipeline = [
      { $match: { status: true, createAt: { $gte: initDate, $lt: endDate } } },
      {
        $lookup: {
          from: "musers",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      { $replaceRoot: { newRoot: "$user" } },
      {
        $project: {
          _id: 1,
          generalData: 1,
          status: 1,
          type: 1,
          billing: 1,
          name: 1,
          cpf: 1,
          email: 1,
          createAt: 1,
        },
      },
    ];
    const aggregateUser = await MCarRevendor.aggregate(pipeline);
    return aggregateUser;
  };
};
