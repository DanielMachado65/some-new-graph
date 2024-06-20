const { MServiceLog } = require("mongoose").models;
const {
  BaseRepository,
} = require("../../../../infrastructure/repository/BaseRepository");

class ServiceLogRepository extends BaseRepository {
  constructor() {
    super(MServiceLog);
  }
}

module.exports = new ServiceLogRepository();
