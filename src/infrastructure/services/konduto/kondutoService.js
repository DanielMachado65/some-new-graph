(function functionName() {
  "use strict";

  const request = require("request-promise");

  const PRIVATE_KEY = "P9F31B241B307303391A6";
  const KONDUTO_URL = "https://api.konduto.com/v1";

  const authBasicEncoded = () => {
    return `Basic ${Buffer.from(`${PRIVATE_KEY}:`).toString("base64")}`;
  };

  const createOrder = async (data) => {
    try {
      const options = {
        method: "POST",
        uri: `${KONDUTO_URL}/orders`,
        body: data,
        json: true,
        headers: {
          Authorization: authBasicEncoded()
        }
      };
      return await request(options);
    } catch (error) {
      return error;
    }
  };

  const updateOrder = async (id, data) => {
    try {
      const options = {
        method: "PUT",
        uri: `${KONDUTO_URL}/orders/${id}`,
        body: data,
        json: true,
        headers: {
          Authorization: authBasicEncoded()
        }
      };
      return await request(options);
    } catch (error) {
      return error;
    }
  };

  const consultOrder = async id => {
    try {
      const options = {
        method: "GET",
        uri: `${KONDUTO_URL}/orders/${id}`,
        json: true,
        headers: {
          Authorization: authBasicEncoded()
        }
      };
      return await request(options);
    } catch (error) {
      return error;
    }
  };

  const addItemToBlackList = async email => {
    try {
      const options = {
        method: "GET",
        uri: `${KONDUTO_URL}/blacklist/email/${email}`,
        json: true,
        headers: {
          Authorization: authBasicEncoded()
        }
      };
      return await request(options);
    } catch (error) {
      return error;
    }
  };

  const getBlacklistItem = async email => {
    try {
      const options = {
        method: "GET",
        uri: `${KONDUTO_URL}/blacklist/email/${email}`,
        json: true,
        headers: {
          Authorization: authBasicEncoded()
        }
      };
      return await request(options);
    } catch (error) {
      return error;
    }
  };

  const updateBlacklistItem = async (data, email) => {
    try {
      const options = {
        method: "PUT",
        uri: `${KONDUTO_URL}/blacklist/email/${email}`,
        json: true,
        headers: {
          Authorization: authBasicEncoded()
        }
      };
      return await request(options);
    } catch (error) {
      return error;
    }
  };

  const removeBlacklistItem = async email => {
    try {
      const options = {
        method: "DELETE",
        uri: `${KONDUTO_URL}/blacklist/email/${email}`,
        json: true,
        headers: {
          Authorization: authBasicEncoded()
        }
      };
      return await request(options);
    } catch (error) {
      return error;
    }
  };

  const addItemToBlacklist = async data => {
    try {
      const options = {
        method: "POST",
        uri: `${KONDUTO_URL}/blacklist/email`,
        json: true,
        headers: {
          Authorization: authBasicEncoded()
        }
      };
      return await request(options);
    } catch (error) {
      return error;
    }
  };

  module.exports = {
    createOrder,
    consultOrder,
    updateOrder,
  };
})();
