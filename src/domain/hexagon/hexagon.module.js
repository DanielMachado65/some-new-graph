"use strict";

const hexagonService = require("../../infrastructure/services/hexagon/hexagon.service");

const executeQuery = async (keys, serviceCode) => {
  let response = {
    returnedDataVendor: null,
    data: null,
    error: null,
    dataFound: true,
    support: null,
  };
  let data = null;
  try {
    data = await hexagonService.executeService(keys, serviceCode);
    response.data = data;
    data.body = data.body.data;
    response.returnedDataVendor = data && data.body ? data.body.rawData : null;
    if (data) {
      if (data.body.error) {
        response.error = data.body.error;
        response.dataFound = false;
      } else if (data.status.cod !== 200 && data.status.msg) {
        response.error = data.status.msg;
        response.dataFound = false;
      } else if (
        data.status.cod == 200 &&
        (data.body.msg || (data.body.data && data.body.data.msg))
      ) {
        response.dataFound = false;
      } else {
        let dataToSupport = data.body.data;
        if (dataToSupport) {
          response.support = {
            placa: dataToSupport.placa,
            chassi: dataToSupport.chassi,
            renavam: dataToSupport.renavam,
            motor: dataToSupport.numMotor,
            cpf: dataToSupport.cpf,
            cnpj: dataToSupport.cnpj,
            nomeMae: dataToSupport.dadosCadastrais
              ? dataToSupport.dadosCadastrais.nomeMae
              : null,
            nome: dataToSupport.dadosCadastrais
              ? dataToSupport.dadosCadastrais.nome
              : null,
          };
        }
      }
    } else {
      response.error = true;
      response.dataFound = false;
    }
  } catch (err) {
    response.error = err.message;
    response.dataFound = false;
  }
  return response;
};

const getVehicle = async (placa, chassi, renavam, motor) => {
  let vehicle = null;
  try {
    let response = await hexagonService.getVehicle(
      placa,
      chassi,
      renavam,
      motor
    );
    if (response.body) {
      vehicle = response.body;
    }
  } catch (error) {
    console.log(`ERROR TO GET VEHICLE =>${placa} : ${chassi} : ${renavam}`);
  }
  return vehicle;
};

const getPerson = async (doc) => {
  let person = null;
  try {
    let response = await hexagonService.getPerson(doc);
    if (response.body) {
      person = response.body;
    }
  } catch (error) {
    console.log(`ERROR TO GET PERSON =>${doc}`);
  }
  return person;
};

const getPersonGroup = async (searchKey) => {
  let group = null;
  try {
    let response = await hexagonService.getPersonGroup(searchKey);
    if (response.body) {
      group = response.body;
    }
  } catch (error) {
    console.log(`ERROR TO GET PERSON GROUP =>${doc}`);
  }
  return group;
};

const getVehicleBrands = async () => {
  const response = await hexagonService.getVehicleBrands();
  return (response && response.body) || [];
};

const getVehicleModelsByBrand = async (brand) => {
  const response = await hexagonService.getVehicleModelsByBrand(brand);
  return (response && response.body) || [];
};

module.exports = {
  executeQuery,
  getVehicle,
  getPerson,
  getPersonGroup,
  getVehicleBrands,
  getVehicleModelsByBrand,
};
