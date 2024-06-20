"use strict";

const hexagonModule = require("../../../domain/hexagon/hexagon.module");
const vehicularModule = require("../../../domain/vehicular/vehicle.module");
const {
  responseObject,
} = require("../../../infrastructure/helpers/routerHelper");
const HttpStatus = require("../../../infrastructure/enumerators/httpCode.enum");
const getVehicleFixedBase = async (keys) => {
  return await hexagonModule.getVehicle(
    keys.placa,
    keys.chassi,
    keys.renavam,
    keys.motor
  );
};

const getVehicleLocalBase = async (key, userid) => {
  return await vehicularModule.getVehicle(key, userid);
};

const getVehicleBrands = async () => hexagonModule.getVehicleBrands();

const getVehicleModelsByBrand = async (brand) =>
  hexagonModule.getVehicleModelsByBrand(brand);

const getVehicleAggregate = async (keys) => {
  return vehicularModule.vehicleAggregate(keys);
};

const getVehicleVersionsByPlate = async (ctx) => {
  try {
    const { plate } = ctx.params;
    const response = await vehicularModule.getVehicleVersionsByPlate(plate);
    return responseObject(ctx, HttpStatus.SUCCESS, response);
  } catch (e) {
    return responseObject(ctx, e.statusCode, e.message);
  }
};

module.exports = {
  getVehicleFixedBase,
  getVehicleLocalBase,
  getVehicleBrands,
  getVehicleModelsByBrand,
  getVehicleAggregate,
  getVehicleVersionsByPlate,
};
