const { MIndicateTemplate } = require("mongoose").models;
const {
  BaseRepository,
} = require("../../../infrastructure/repository/BaseRepository");

class IndicateTemplateRepository extends BaseRepository {
  constructor() {
    super(MIndicateTemplate);
  }
}

module.exports = new IndicateTemplateRepository();
