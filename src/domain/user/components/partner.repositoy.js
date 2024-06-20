"use strict";

const {
  BaseRepository,
} = require("../../../infrastructure/repository/BaseRepository");
const { MPartner } = require("mongoose").models;

class PartnerRepository extends BaseRepository {
  constructor() {
    super(MPartner);
  }
};

module.exports = new PartnerRepository()