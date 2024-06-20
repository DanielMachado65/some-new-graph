
"use strict";

const mongoose = require("mongoose");
const { MAnalytics } = mongoose.models;
const {
  BaseRepository,
} = require("../../../infrastructure/repository/BaseRepository");

class AnalyticsRepository extends BaseRepository {
  constructor() {
    super(MAnalytics);
    this.defaultProjection = {
      email: 1,
      link: 1,
      placa: 1,
      queryId: 1,
      createdAt: 1,
    };
  }

  reportAllByDate(startDate, endDate) {
    const pipeline = [
      {
        $match: {
          createdAt: { $gte: startDate, $lt: endDate },
          deletedAt: { $eq: null },
        },
      },
      {
        $project: {
          _id: 0,
          ID: {
            $toString: "$_id",
          },
          Email: { $ifNull: ["$email", "Não informado"] },
          Link: "$link",
          Placa: "$placa",
          "ID da consulta": {
            $toString: "$queryId",
          },
          "Criado em": "$createdAt",
        },
      },
    ];
    return this.model.aggregate(pipeline).exec();
  }

  createAnalytics(email, link, placa, queryId) {
    const analytics = { email, link, placa, queryId };
    return this.createWithProjection(analytics, this.defaultProjection);
  }
}

module.exports = new AnalyticsRepository();
