"use strict";

const axios = require("axios").default;
const { RestContract } = require("../contracts/rest.contract");
const { ResponseStructure } = require("../responseStructure.dto");
module.exports.AxiosHandler = class AxiosHandler extends RestContract {
  __createResponseObject(rawResponse) {
    const response = new ResponseStructure();
    response.setResponse(rawResponse.data);
    response.setStatus(rawResponse.status);
    return response;
  }

  post = async (url, data, headers) => {
    const rawResponse = await axios({ method: "post", url, data, headers });
    return this.__createResponseObject(rawResponse);
  };
  get = async (url, opts) => {
    const rawResponse = await axios.get(url, opts);
    return this.__createResponseObject(rawResponse);
  };
  delete = async (url, opts) => {
    const rawResponse = await axios.delete(url, opts);
    return this.__createResponseObject(rawResponse);
  };
  put = async (url, body, opts) => {
    const rawResponse = await axios.put(url, body, opts);
    return this.__createResponseObject(rawResponse);
  };
  patch = async (url, body, opts) => {
    const rawResponse = await axios.patch(url, body, opts);
    return this.__createResponseObject(rawResponse);
  };
};
