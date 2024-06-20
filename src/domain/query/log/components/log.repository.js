const { MLog } = require("mongoose").models;
const {
  BaseRepository,
} = require("../../../../infrastructure/repository/BaseRepository");

class LogRepository extends BaseRepository {
  constructor() {
    super(MLog);
  }
}

module.exports = new LogRepository();
