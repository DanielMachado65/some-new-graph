"use strict";
const { hideString } = require("../stringHelper");

const isUnknown = (variable) => {
  return variable ? variable : "Desconhecido";
};
const testDrive = async (vehicle) => {
  let {
    placa,
    anoFabricacao,
    capacidadePassageiro,
    renavam,
    combustivel,
    especieVeiculo,
    marcaModelo,
    chassi,
    corVeiculo,
    potencia,
    anoModelo,
    municipio,
    anuncio,
    historicoKm,
  } = vehicle;
  const hideChassi = await hideString(chassi, 4, "Encontrado");
  const hideRenavam = await hideString(renavam, 5, "Encontrado");
  const especie = isUnknown(especieVeiculo);
  combustivel = isUnknown(combustivel);
  return {
    placa,
    chassi: hideChassi,
    renavam: hideRenavam,
    marcaModelo,
    especieVeiculo: especie,
    corVeiculo,
    anoFabricacao,
    anoModelo,
    municipio,
    potencia,
    combustivel,
    capacidadePassageiro,
    possuiHistoricoKm: Array.isArray(historicoKm) && historicoKm.length > 0,
    possuiValorDaOferta: !!(anuncio && anuncio.valor),
    possuiObservacaoDoVendedor: !!(anuncio && anuncio.observacao),
    numeroDeOpcionais:
      (anuncio &&
        Array.isArray(anuncio.opcionais) &&
        anuncio.opcionais.length > 0 &&
        anuncio.opcionais.length) ||
      null,
    numeroDeFotos:
      (anuncio &&
        Array.isArray(anuncio.fotos) &&
        anuncio.fotos.length > 0 &&
        anuncio.fotos.length) ||
      null,
  };
};
const testDriveEmail = async (data) => {
  let {
    placa,
    marca,
    anoFabricacao,
    capacidadePassageiro,
    renavam,
    combustivel,
    especieVeiculo,
    chassi,
    potencia,
    modelo,
    municipio,
    categoria,
  } = data;
  const hideRenavam = await hideString(renavam, 5);
  const hideChassi = await hideString(chassi, 4);
  const especie = isUnknown(especieVeiculo);
  combustivel = isUnknown(combustivel);
  categoria = isUnknown(categoria);
  return {
    placa,
    chassi: hideChassi,
    renavam: hideRenavam,
    marca,
    anoFabricacao,
    capacidadePassageiro,
    combustivel,
    especie,
    potencia,
    modelo,
    municipio,
    categoria,
  };
};

const getInformacaoParceiros = async (dataResult) => {
  const { anuncio, historicoKm } =
    (dataResult &&
      dataResult.data &&
      dataResult.data.body &&
      dataResult.data.body.data) ||
    {};
  return { anuncio, historicoKm };
};

module.exports = {
  testDrive,
  testDriveEmail,
  getInformacaoParceiros,
};
