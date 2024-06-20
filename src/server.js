(async function () {
  "use strict";
  const applicationLoader = require("./applicationLoader");
  await applicationLoader.load();
  await applicationLoader.connectToDataBase();
  applicationLoader.runApplication();
  // const { decrypt } = require("./infrastructure/utils/cryptor");
  // console.log(decrypt("b89d26cae4cea23816"));
})();
