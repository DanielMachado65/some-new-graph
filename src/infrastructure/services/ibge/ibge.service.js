const HttpRequest = require("axios");
const BASE_URL = "https://servicodados.ibge.gov.br/api";

const getStates = function () {
  return HttpRequest.get(`${BASE_URL}/v1/localidades/estados`);
};

const getCities = function (uf) {
  return HttpRequest.get(`${BASE_URL}/v1/localidades/estados/${uf}/municipios`);
};

module.exports = {
  getStates,
  getCities,
};
