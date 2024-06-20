const axios = require("axios");

const backpressureUrl =
  "http://lb-api-olhonocarro-cluster-1048098859.sa-east-1.elb.amazonaws.com:3000/api/v1/backpressure";

const addToBackpressure = async (id, hook, data) => {
  const payload = { id, hook, data };
  return axios.post(backpressureUrl, payload);
};

module.exports = {
  addToBackpressure,
};
