"use strict";

const { MInsuranceFinancingPopupControl } = require("mongoose").models;
const {
  BaseRepository,
} = require("../../../infrastructure/repository/BaseRepository");

module.exports.InsuranceFinancingPopupControlRepository = class extends BaseRepository {
  constructor() {
    super(MInsuranceFinancingPopupControl);
  }
  
  findByQueryId (queryId) {
    return this.findOne({ query: queryId });
  };

};
