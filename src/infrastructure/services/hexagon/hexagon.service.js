"use strict";

const axios = require('axios')
const request = require("request-promise");
const URL_BASE = "https://hexagonenv.com.br/";
// const URL_BASE = "https://g1askrcgv7.execute-api.sa-east-1.amazonaws.com/prod/";
// const URL_BASE = "http://localhost:8081/"

const q = require("q");

const HEXAGON_ID = "5be58fd8cce1db1aa08e2eb6";

function factoryRequestData(code, keys) {
  return {
    code: code,
    keys: keys,
  };
}

const executeService = async (keys, code) => {
  let deferred = q.defer();
  let options = {
    method: "POST",
    uri: URL_BASE + "api/query/" + HEXAGON_ID,
    body: factoryRequestData(code, keys),
    json: true,
    headers: {
      "content-type": "application/json",
    },
  };
  request(options)
    .then((resp) => {
      deferred.resolve(resp);
    })
    .catch((err) => {
      deferred.reject(err);
    });
  return deferred.promise;
};

const deleteAnnouncement = async (data) => {
  let deferred = q.defer();
  const options = {
    method: "PATCH",
    uri: `${URL_BASE}api/vehicle/delete-announcement/`,
    json: true,
    headers: {
      "content-type": "application/json",
    },
    body: data,
  };
  request(options)
    .then((resp) => {
      deferred.resolve(resp);
    })
    .catch((err) => {
      deferred.reject(err);
    });
  return deferred.promise;
};

const deleteAnnouncementsFromHistory = async (plate, announcementsToRemove) => {
  const deferred = q.defer();
  const options = {
    method: "PATCH",
    uri: `${URL_BASE}api/vehicle/delete-announcements-from-history/${plate}`,
    json: true,
    headers: {
      "content-type": "application/json",
    },
    body: announcementsToRemove,
  };

  request(options)
    .then((resp) => {
      deferred.resolve(resp);
    })
    .catch((error) => {
      deferred.reject(error);
    });

  return deferred.promise;
};

const getVehicle = async (placa, chassi, renavam, motor) => {
  let deferred = q.defer();
  let options = {
    method: "POST",
    uri: URL_BASE + "api/vehicle",
    body: {
      placa: placa,
      chassi: chassi,
      renavam: renavam,
      motor: motor,
    },
    json: true,
    headers: {
      "content-type": "application/json",
    },
  };
  request(options)
    .then((resp) => {
      deferred.resolve(resp);
    })
    .catch((err) => {
      deferred.reject(err);
    });
  return deferred.promise;
};

const getPerson = async (doc) => {
  let deferred = q.defer();
  let options = {
    method: "GET",
    uri: URL_BASE + `api/person/${doc}`,
    json: true,
    headers: {
      "content-type": "application/json",
    },
  };
  request(options)
    .then((resp) => {
      deferred.resolve(resp);
    })
    .catch((err) => {
      deferred.reject(err);
    });
  return deferred.promise;
};

const getPersonGroup = async (doc) => {
  let deferred = q.defer();
  let options = {
    method: "GET",
    uri: URL_BASE + `api/localize/${doc}`,
    json: true,
    headers: {
      "content-type": "application/json",
    },
  };
  request(options)
    .then((resp) => {
      deferred.resolve(resp);
    })
    .catch((err) => {
      deferred.reject(err);
    });
  return deferred.promise;
};

const getVehicleBrands = async () =>
  request({
    method: "GET",
    uri: URL_BASE + "api/vehicle/get-brands",
    json: true,
  });

const getVehicleModelsByBrand = async (brand) => {
  const uri = URL_BASE + "api/vehicle/get-models-by-brand?brand=" + brand;
  return request({
    method: "GET",
    uri,
    json: true,
  });
};

async function sanitizeVehicle (placa,chassi,motor) {
  try {
    await axios.post(URL_BASE + 'api/vehicle/sanitize', {
      placa,
      chassi,
      motor
    },{
      timeout: 2000
    })
  } catch (e){
    console.log("wasnt possible sanitize vehicle "+[placa,chassi,motor].filter(item => !!item));
    console.error(e.error);
  }
}

module.exports = {
  sanitizeVehicle,
  executeService,
  getVehicle,
  getPerson,
  getPersonGroup,
  deleteAnnouncement,
  deleteAnnouncementsFromHistory,
  getVehicleModelsByBrand,
  getVehicleBrands,
};
