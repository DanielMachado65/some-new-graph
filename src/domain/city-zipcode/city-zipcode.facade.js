"use strict";

const CityZipCodeRepository = require("./components/cityZipCode.repository");

const findZipCodeByCityName = async (city) => {
  const location = await CityZipCodeRepository.findZipCodeByCityName(city);
  return location || { city, state: null, zipcode: null };
};


module.exports = {
  findZipCodeByCityName,
};
