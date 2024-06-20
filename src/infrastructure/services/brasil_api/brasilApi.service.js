const { BrasilAPI } = require("brasilapi");
const brasilApi = new BrasilAPI();

const getLocationByPostalCode = async (cep) => {
  const response = await brasilApi.cep(cep);
  const maybeCep = typeof response.cep === "string" ? response.cep : "";
  const rawCep = maybeCep.replace("-", "");
  const parsedCep = rawCep.substring(0, 5) + "-" + rawCep.substring(5);
  const data = {
    cep: parsedCep,
    uf: response.state,
    localidade: response.city,
    bairro: response.neighborhood,
    logradouro: response.street,
  };
  return { data };
};

const getBanks = async () => {
  const response = await brasilApi.banks();
  const data = response;

  return { data };
};

const getBankByCode = async (code) => {
  const response = await brasilApi.banks(code);
  const data = {
      ispb: response.ispb,
      name: response.name,
      code: response.code,
      fullName: response.fullName,
  };
  return { data };
};

module.exports = {
  getLocationByPostalCode,
  getBanks,
  getBankByCode
};
