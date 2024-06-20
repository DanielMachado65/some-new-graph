const HttpRequest = require("axios");
const BASE_URL = "https://viacep.com.br";

const getLocationByPostalCode = function (cep) {
  return HttpRequest.get(`${BASE_URL}/ws/${cep}/json/`);
};

module.exports = {
  getLocationByPostalCode,
};
