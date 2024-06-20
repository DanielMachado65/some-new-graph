const {
  validateTestDriveToken,
} = require("../../../../infrastructure/services/google/recaptcha/googleRecaptcha.service");

const validateIfQueryIsInUserPriceTable = function (queryCode, billing) {
  const priceTable = billing.priceTable.template;
  const currentQuery = priceTable.find(
    (query) => query.querycode === queryCode
  );
  if (!currentQuery) {
    throw new Error("Você não tem permissão para realizar essa consulta.");
  }
};

const validateIfUserHasCredits = function (queryCode, billing) {
  const priceTable = billing.priceTable.template;
  const currentQuery = priceTable.find(
    (query) => query.querycode === queryCode
  );
  if (currentQuery.totalPrice > billing.accountFunds) {
    throw new Error("Créditos insuficientes para realizar a consulta.");
  }
};

const validateIfQueryComposerCanBeTestDrive = function (queryComposer) {
  if (!queryComposer.canBeTestDrive) {
    throw new Error("Essa consulta não pode ser realizada.");
  }
};

const validateCaptchaToken = async function (navigationToken) {
  const { invalidToken } = await validateTestDriveToken(navigationToken);
  if (invalidToken) {
    throw new Error(
      "Seu token de navegação para execução do test drive expirou. Por favor, recarregue a página e tente novamente."
    );
  }
};

const validateQueryKeys = function (queryKeys) {
  const keys = Object.keys(queryKeys);
  let hasAtLeastOneKey = false;
  keys.forEach((key) => {
    if (queryKeys[key]) hasAtLeastOneKey = true;
  });
  if (!hasAtLeastOneKey) {
    throw new Error("Nenhuma chave de consulta foi fornecida.");
  }
};

const validateQueryKeysInBlackList = function (keys) {
  if (keys.placa === "AYB0731" || keys.chassi === "93Y4SRD64EJ830469") {
    throw new Error("Não foi possivel realizar essa consulta.");
  }
};

const validateIfQueryComposerIsAvailable = function (queryComposer) {
  if (!queryComposer.status || !queryComposer.services.length) {
    throw new Error("Esta consulta não está disponível.");
  }
};

module.exports = {
  validateIfQueryIsInUserPriceTable,
  validateIfUserHasCredits,
  validateIfQueryComposerCanBeTestDrive,
  validateCaptchaToken,
  validateQueryKeys,
  validateQueryKeysInBlackList,
  validateIfQueryComposerIsAvailable,
};
