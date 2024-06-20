"use strict";

const {
  BaseRepository,
} = require("../../../infrastructure/repository/BaseRepository");
const { MSystemNotification } = require("mongoose").models;

class SystemNotification extends BaseRepository {
  constructor() {
    super(MSystemNotification);
  }
};

module.exports = new SystemNotification()