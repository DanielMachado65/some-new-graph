"use strict";

const {
  BaseRepository,
} = require("../../../infrastructure/repository/BaseRepository");
const { MTerm } = require("mongoose").models;

class TermRepository extends BaseRepository {
  constructor() {
    super(MTerm);
  }
};

module.exports = new TermRepository()