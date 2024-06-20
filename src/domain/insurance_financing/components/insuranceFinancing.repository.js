"use strict";

const { MInsuranceFinancing } = require("mongoose").models;
const {
  BaseRepository,
} = require("../../../infrastructure/repository/BaseRepository");

module.exports.InsuranceFinancingRepository = class extends BaseRepository {
  constructor() {
    super(MInsuranceFinancing);
  }
  paginate = async (query, opts = { offset: 0, limit: 25, lean: true }) => {
    return MInsuranceFinancing.paginate(query, opts);
  };
};
