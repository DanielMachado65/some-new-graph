const { isAValidPlate } = require("../../../infrastructure/utils/utils");
const {
  responseObject,
} = require("../../../infrastructure/helpers/routerHelper");
const HttpStatus = require("../../../infrastructure/enumerators/httpCode.enum");

module.exports.validateInputGetVehicleVersionsByPlate = async (ctx, next) => {
  const { plate } = ctx.params;
  if (isAValidPlate(plate)) {
    return next();
  }
  return responseObject(ctx, HttpStatus.INVALID_PARAMETERS, "Placa inválida");
};
