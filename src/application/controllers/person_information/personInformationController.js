(async function () {
  "use strict";

  const hexagonModule = require("../../../domain/hexagon/hexagon.module");

  const getByDoc = async (doc) => {
    return await hexagonModule.getPerson(doc);
  };

  module.exports = {
    getByDoc,
  };
})();
