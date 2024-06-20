const { MQueryRules } = require("mongoose").models;
const {
  BaseRepository,
} = require("../../../../infrastructure/repository/BaseRepository");

class QueryRulesRepository extends BaseRepository {
  constructor() {
    super(MQueryRules);
  }
}

module.exports = new QueryRulesRepository();
