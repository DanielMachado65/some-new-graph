"use strict";

const marketingSender = require("./marketingSender.service");
const utils = require("../../../infrastructure/utils/utils");
const dateUtils = require("../../../infrastructure/utils/date.util");

const registerClickOnButtonDebts = async ({ email, plate, user, query }) => {
  const model = query.responseJSON && query.responseJSON.modelo;
  const brand = query.responseJSON && query.responseJSON.marca;
  const brandModel = query.responseJSON && query.responseJSON.marcaModelo;
  const phoneNumber = user.generalData && user.generalData.phoneNumber1;

  return marketingSender.registerClickOnButtonDebts({
    email: email,
    plate: plate || "",
    model: model || "",
    brand: brand || "",
    brandModel: brandModel || "",
    phone: phoneNumber || "",
    birthday: dateUtils.getStringDateFormatIn_MM_DD(user.createAt) || "01/01",
    firstName: utils.getPositionName(user.name, "FIRST") || "",
    lastName: utils.getPositionName(user.name, "LAST") || "",
  });
};

module.exports = {
  registerClickOnButtonDebts,
};
