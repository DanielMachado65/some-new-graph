"use strict";
const HttpRequest = require("axios");
const BASE_URL =
  "http://microservices-loadbalancer-1060678515.sa-east-1.elb.amazonaws.com:3001";

const getUserLogs = async (userId, apiId, limit, page) => {
  const result = await HttpRequest.get(
    `${BASE_URL}/${apiId}/${userId}?limit=${limit}&page=${page}`
  );
  return result.data;
};

const getAllLogs = async (userId, apiId) => {
  const result = await HttpRequest.get(
    `${BASE_URL}/download/${apiId}/${userId}`
  );
  return result.data;
};

module.exports = {
  getUserLogs,
  getAllLogs,
};
