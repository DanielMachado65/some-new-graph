"use strict";

const mongoose = require("mongoose");
const { MQueryInfo } = mongoose.models;
const {
  BaseRepository,
} = require("../../../../infrastructure/repository/BaseRepository");

class QueryInfoRepository extends BaseRepository {
  constructor() {
    super(MQueryInfo);
    this.defaultProjection = {
      image: 1,
      name: 1,
      description: 1,
      isAvailable: 1,
      isAvailableToOthers: 1,
    };
  }

  async getAllQueryInfosComparison() {
    const projection = {
      _id: 0,
      name: 1,
      isAvailable: 1,
      isAvailableToOthers: 1,
    };
    return this.getAllExceptLogicallyRemoved({}, [], projection);
  }

  async getAllQueryInfos() {
    return this.getAllExceptLogicallyRemoved({}, [], this.defaultProjection);
  }

  createQueryInfo(queryInfo) {
    return this.createWithProjection(queryInfo, this.defaultProjection);
  }

  updateQueryInfo(queryInfoId, queryInfo) {
    return this.updateByIdAndReturnNew(
      queryInfoId,
      queryInfo,
      this.defaultProjection
    );
  }

  removeQueryInfo(queryInfoId) {
    return this.removeByIdLogicallyAndReturnNew(
      queryInfoId,
      this.defaultProjection
    );
  }
}

module.exports = new QueryInfoRepository();
