"use strict";

const { MService } = require("mongoose").models;
const ServicesEnum = require("../../../infrastructure/dictionaries/ServicesEnum");
const VendorsEnum = require("../../../infrastructure/dictionaries/VendorsEnum");
const {
  CorvetteService,
} = require("../../../infrastructure/services/corvette/corvette.service");
const queryRepository = require("../../../domain/query/query/components/query.repository");
const {
  HttpClientService,
} = require("../../../infrastructure/services/http_client");

const httpClient = new HttpClientService(
  HttpClientService.strategyBuilder().useAxios()
);

const corvetteService = new CorvetteService(httpClient);

const createNewService = async (serviceCode, minimumPrice) => {
  let serviceObj = ServicesEnum(serviceCode);
  if (!serviceObj)
    return "O serviço não existe ou não foi previamente parametrizado na API.";
  let service = await MService.findOne({ code: serviceCode });
  if (service) return "O serviço solicitado já existe no banco de dados.";
  let supplierName = VendorsEnum(serviceObj.supplierCode);
  let obj = {
    code: serviceCode,
    name: serviceObj.name,
    minimumPrice: minimumPrice,
    supplier: {
      name: supplierName,
      supplierCode: serviceObj.supplierCode,
    },
  };
  return MService.create(obj);
};

const getAll = async () => {
  return MService.find({ status: true });
};

const getById = async (id) => {
  return MService.findOne({ _id: id });
};

const getByCode = async (code) => {
  return MService.findOne({ code: { $eq: code } });
};

const updateMinimumPrice = async (id, value) => {
  let service = await MService.findOne({ _id: id });
  if (service && value >= 0) {
    service.minimumPrice = value;
    await service.save();
  }
  return service;
};

const updateAutoSwitching = async (id, switchParams) => {
  let service = await MService.findOne({ _id: id });
  if (service) {
    service.switching = [];
    for (let s of switchParams) {
      let __serviceRef = await MService.findOne({ code: s.code });
      if (__serviceRef) {
        let __priotiry = parseInt(s.priority);
        let objectSwitch = {
          supplier: __serviceRef.supplier.supplierCode,
          name: __serviceRef.name,
          service: __serviceRef._id,
          priority: Number.isInteger(__priotiry) ? __priotiry : 1,
        };
        service.switching.push(objectSwitch);
      }
    }
    service.hasAutoSwitching = service.switching.length > 0;
    await service.save();
  }
  return service;
};

const getLeanById = async (_id) => MService.findById(_id).lean();

const cancelAutoReprocess = async (queryId) => {
  Promise.allSettled([
    queryRepository.updateQueryStatusById(queryId, "success"),
    corvetteService.cancelAutoReprocess(queryId),
  ]);
};

module.exports = {
  createNewService,
  getAll,
  getById,
  getByCode,
  updateAutoSwitching,
  updateMinimumPrice,
  getLeanById,
  cancelAutoReprocess,
};
