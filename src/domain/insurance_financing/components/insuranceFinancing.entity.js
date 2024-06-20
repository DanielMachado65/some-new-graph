"use strict";

function _validateUser(user) {
  if (!user || !user._id || !user.email || !user.name)
    throw new Error("Invalid user");
}

function _validateQuery(query) {
  if (!query || !query._id) throw new Error("Invalid query");
}

function _getUserPhone(user) {
  return (
    user.generalData &&
    (user.generalData.phoneNumber1 || user.generalData.phoneNumber2)
  );
}

function _getVehiclePlate(query) {
  return (query.responseJSON && query.responseJSON.placa) || null;
}

function _getVehicleChassi(query) {
  return (query.responseJSON && query.responseJSON.chassi) || null;
}

function _getVehicleRenavam(query) {
  return (query.responseJSON && query.responseJSON.renavam) || null;
}

function _getVehicleModelAndBrand(query) {
  return (query.responseJSON && query.responseJSON.marcaModelo) || null;
}

function _getVehicleFipeCode(query) {
  return (
    (query.responseJSON &&
      query.responseJSON.decodificadorPrecificador &&
      query.responseJSON.decodificadorPrecificador.codigoFipe) ||
    null
  );
}

module.exports.InsuranceFinancingEntity = class InsuranceFinancing {
  userInterested;
  query;
  createAt;
  name;
  email;
  phone;
  plate;
  chassi;
  renavam;
  modelAndBrand;
  fipeTable;
  hasInterestInVehicularInsuranceQuote;
  hasInterestInVehicularFinancingQuote;
  hasAcceptedFormToShareOwnInfos;
  status;

  setUserName(value) {
    this.name = value;
    return this;
  }

  setEmail(value) {
    this.email = value;
    return this;
  }

  setPhone(value) {
    this.phone = value;
    return this;
  }

  setUserInterested(value) {
    this.userInterested = value;
    return this;
  }

  setQuery(value) {
    this.query = value;
    return this;
  }

  setCreateAt(value) {
    this.createAt = value;
    return this;
  }

  setPlate(value) {
    this.plate = value;
    return this;
  }

  setChassi(value) {
    this.chassi = value;
    return this;
  }

  setRenavam(value) {
    this.renavam = value;
    return this;
  }

  setModelAndBrand(value) {
    this.modelAndBrand = value;
    return this;
  }

  setFipeTable(value) {
    this.fipeTable = value;
    return this;
  }

  setHasInterestInVehicularInsuranceQuote(value) {
    this.hasInterestInVehicularInsuranceQuote = value;
    return this;
  }

  setHasInterestInVehicularFinancingQuote(value) {
    this.hasInterestInVehicularFinancingQuote = value;
    return this;
  }

  setHasAcceptedFormToShareOwnInfos(value) {
    this.hasAcceptedFormToShareOwnInfos = value;
    return this;
  }

  setStatus(value) {
    this.status = value;
    return this;
  }

  toObject() {
    return {
      createAt: this.createAt,
      status: this.status,
      user: {
        userInterested: this.userInterested,
        name: this.name,
        email: this.email,
        phone: this.phone,
      },
      query: this.query,
      vehicle: {
        plate: this.plate,
        chassi: this.chassi,
        renavam: this.renavam,
        modelAndBrand: this.modelAndBrand,
        fipeTable: this.fipeTable,
      },
      hasInterestInVehicularInsuranceQuote: this
        .hasInterestInVehicularInsuranceQuote,
      hasInterestInVehicularFinancingQuote: this
        .hasInterestInVehicularFinancingQuote,
      hasAcceptedFormToShareOwnInfos: this.hasAcceptedFormToShareOwnInfos,
    };
  }

  convertEntityToInternalReportFormatDto() {
    return {
      name: this.name,
      email: this.email,
      phone: this.phone,
      userInterested: this.userInterested,
      query: this.query,
      plate: this.plate,
      chassi: this.chassi,
      renavam: this.renavam,
      modelAndBrand: this.modelAndBrand,
      fipeTable: this.fipeTable,
      status: this.status,
      createAt: this.createAt,
      hasInterestInVehicularInsuranceQuote: this
        .hasInterestInVehicularInsuranceQuote,
      hasInterestInVehicularFinancingQuote: this
        .hasInterestInVehicularFinancingQuote,
      hasAcceptedFormToShareOwnInfos: this.hasAcceptedFormToShareOwnInfos,
    };
  }

  static CreateInsuranceFinancingEntityByQueryAndUser(user, query) {
    const insuranceFinancingEntity = new InsuranceFinancing();
    _validateQuery(query);
    _validateUser(user);
    insuranceFinancingEntity.name = user.name;
    insuranceFinancingEntity.email = user.email;
    insuranceFinancingEntity.phone = _getUserPhone(user);
    insuranceFinancingEntity.userInterested = user._id;
    insuranceFinancingEntity.query = query._id;
    insuranceFinancingEntity.plate = _getVehiclePlate(query);
    insuranceFinancingEntity.chassi = _getVehicleChassi(query);
    insuranceFinancingEntity.renavam = _getVehicleRenavam(query);
    insuranceFinancingEntity.modelAndBrand = _getVehicleModelAndBrand(query);
    insuranceFinancingEntity.fipeTable = _getVehicleFipeCode(query);
    return insuranceFinancingEntity;
  }
};
