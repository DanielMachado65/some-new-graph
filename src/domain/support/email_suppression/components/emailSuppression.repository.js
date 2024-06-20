"use strict";
const {
  BaseRepository,
} = require("../../../../infrastructure/repository/BaseRepository");
const { MEmailSuppression } = require("mongoose").models;

module.exports.EmailSuppressionRepository = class EmailSuppressionRepository extends BaseRepository {
  constructor() {
    super(MEmailSuppression);
  }

  removeUserFromSuppressionList = async (user) => {
    await this.updateOne({ user }, { $set: { status: false } });
  };

  removeEmailFromSuppressionList = async (email) => {
    await this.updateOne({ email }, { $set: { status: false } });
  };
};
