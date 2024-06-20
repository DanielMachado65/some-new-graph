const { MQueryMapper } = require("mongoose").models;
const {
  BaseRepository,
} = require("../../../../infrastructure/repository/BaseRepository");

class QueryMapperRepository extends BaseRepository {
  constructor() {
    super(MQueryMapper);
  }
}

module.exports = new QueryMapperRepository();
