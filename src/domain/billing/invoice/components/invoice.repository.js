"use strict";

const mongoose = require("mongoose");
const { MInvoice } = mongoose.models;
const {
  BaseRepository,
} = require("../../../../infrastructure/repository/BaseRepository");

class InvoiceRepository extends BaseRepository {
  constructor() {
    super(MInvoice);
  }
}

module.exports = new InvoiceRepository();
