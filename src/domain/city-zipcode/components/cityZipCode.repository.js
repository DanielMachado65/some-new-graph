"use strict";

const mongoose = require("mongoose");
const { MCityZipCode } = mongoose.models;
const {
  BaseRepository,
} = require("../../../infrastructure/repository/BaseRepository");

class CityZipCodeRepository extends BaseRepository {
  constructor() {
    super(MCityZipCode);
  }

  async findZipCodeByCityName(city) {
    city = city.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase()
    return await MCityZipCode.findOne({ city }).lean().exec()
  }
}

module.exports = new CityZipCodeRepository();
