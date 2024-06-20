const { MQueryComposer } = require("mongoose").models;
const {
  BaseRepository,
} = require("../../../../infrastructure/repository/BaseRepository");

class QueryComposerRepository extends BaseRepository {
  constructor() {
    super(MQueryComposer);
  }
}

module.exports = new QueryComposerRepository();
