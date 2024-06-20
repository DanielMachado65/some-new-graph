const IbgeService = require("../../infrastructure/services/ibge/ibge.service");
const BrasilApiService = require("../../infrastructure/services/brasil_api/brasilApi.service");

const getLocationStates = async function () {
  try {
    const sourceResponse = await IbgeService.getStates();
    const response = sourceResponse.data.map((stateData) => ({
      initials: stateData.sigla,
      name: stateData.nome,
      region: stateData.regiao.nome,
    }));
    return response;
  } catch (error) {
    throw new Error(
      "Não foi possível carregar os dados. Tente novamente em alguns instantes."
    );
  }
};

const getCitiesByState = async function (uf) {
  try {
    const searchUF = uf.toUpperCase();
    const sourceResponse = await IbgeService.getCities(searchUF);
    const response = sourceResponse.data.map((cityData) => ({
      name: cityData.nome,
    }));
    return response;
  } catch (error) {
    throw new Error(
      "Não foi possível carregar os dados. Verifique a UF informada e tente novamente em alguns instantes."
    );
  }
};

const getLocationByPostalCode = async function (cep) {
  try {
    const postalCode = cep.replace(/^\D+/g, "");
    const { data } = await BrasilApiService.getLocationByPostalCode(postalCode);
    const response = {
      cep: data.cep || null,
      logradouro: data.logradouro || null,
      complemento: data.complemento || null,
      bairro: data.bairro || null,
      localidade: data.localidade || null,
      uf: data.uf || null,
      ddd: data.ddd || null,
    };
    return response;
  } catch (error) {
    throw new Error(
      "Não foi possível carregar os dados. Verifique o CEP informado e tente novamente em alguns instantes."
    );
  }
};

const getBanks = async function () {
  try {
    const sourceResponse = await BrasilApiService.getBanks();
    const response = sourceResponse.data;

    return response;
  } catch (error) {
    throw new Error(
      "Não foi possível carregar os dados. Tente novamente em alguns instantes."
    );
  }
};

const getBankByCode = async function (code) {
  try {
    const { data } = await BrasilApiService.getBankByCode(code);
    const response = {
      ispb: data.ispb || null,
      name: data.name || null,
      code: data.code || null,
      fullName: data.fullName || null,
    };
    return response;
  } catch (error) {
    throw new Error(
      "Não foi possível carregar os dados. Verifique o código informado e tente novamente em alguns instantes."
    );
  }
};

module.exports = {
  getLocationStates,
  getCitiesByState,
  getLocationByPostalCode,
  getBanks,
  getBankByCode,
};
