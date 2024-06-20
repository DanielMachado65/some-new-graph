(async function () {
  "use strict";

  const hexagonModule = require("../../hexagon/hexagon.module");

  const call = async (service, keys) => {
    let response = {
      data: null,
      error: null,
      dataFound: true,
    };
    try {
      response = await hexagonModule.executeQuery(keys, service.code);
    } catch (e) {
      response.error = e.message;
    } finally {
      return response;
    }
  };

  module.exports = {
    call,
  };
})();
