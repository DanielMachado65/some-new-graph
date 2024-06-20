const indicateAndEarnService = require("../../infrastructure/services/indicate-and-earn/indicate-and-earn.service");
const priceUtils = require("../../infrastructure/utils/price.util");
const {
  UserRepository,
} = require("../../domain/user/user/components/user.repository");
const {
  registerIndicateAndWin,
} = require("../../domain/mail/marketing/marketingSender.service");
const { getPositionName } = require("../../infrastructure/utils/utils");

const userRepository = new UserRepository();

const parseCpfKey = (pixKey) => pixKey.replace(/\D/g, '');
const parseCnpjKey = (pixKey) => pixKey.replace(/\D/g, '');
const parsePhoneKey = (pixKey) => pixKey.replace(/\D/g, '');
const parseEmailKey = (pixKey) => pixKey.trim();
const parseRandomKey = (pixKey) => pixKey;

const PIX_KEY_PARSER = new Map()
  .set('CPF', { type: 'CPF', parser: parseCpfKey })
  .set('CNPJ', { type: 'CNPJ', parser: parseCnpjKey })
  .set('PHONE', { type: 'TELEFONE', parser: parsePhoneKey })
  .set('EMAIL', { type: 'EMAIL', parser: parseEmailKey })
  .set('RANDOMKEY', { type: 'CHAVE_ALEATORIA', parser: parseRandomKey });

const indicateAndEarnGetHashlink = async (userId) => {
  const user = await userRepository.findOne({ _id: userId });
  const hashLink = await indicateAndEarnService.getHashlink({
    cpf: user.cpf,
    email: user.email,
    originId: user._id,
    name: user.name,
  });

  if (hashLink.data && hashLink.data.hashlink && user) {
    registerIndicateAndWin({
      email: user.email,
      firstName: getPositionName(user.name, "FIRST"),
      lastName: getPositionName(user.name, "LAST"),
      url: hashLink.data && hashLink.data.hashlink,
    }).finally();
  }

  return hashLink;
};

const indicateAndEarnGetTransactionsCredit = async (userId) => {
  const credits = await indicateAndEarnService.getTransactionsCredit(userId);
  return credits.map((credit) => {
    return {
      createdAt: credit.createdAt,
      indicatedName: credit.indicatedName,
      originValue: credit.originValue,
      value: credit.value,
    };
  });
};

const indicateAndEarnGetTransactionsDebit = async (userId) => {
  const debits = await indicateAndEarnService.getTransactionsDebit(userId);
  return debits.map((credit) => {
    return {
      createdAt: credit.createdAt,
      status: credit.status,
      type: credit.type,
      value: credit.value,
    };
  });
};

const indicateAndEarnGetTransactionsTotals = async (userId) => {
  return indicateAndEarnService.getTransactionsTotals(userId);
};

const indicateAndEarnGetTransactionsBalance = async (userId) => {
  return indicateAndEarnService.getTransactionsBalance(userId);
};

const indicateAndEarnSetIndicated = async ({ email, hashlinkId }) => {
  const indicated = await indicateAndEarnService.setIndicated({
    email: email,
    participantId: hashlinkId,
  });

  return { ...indicated, cupon: "INDICADO" };
};

const indicateAndEarnSetTransactionCredit = async (payment) => {
  const user = await userRepository.findOne({ billing: payment.billing });
  return indicateAndEarnService.setTransactionCredit({
    indicatedCpf: user.cpf,
    indicatedEmail: user.email,
    indicatedName: user.name,
    indicatedId: user._id && user._id.toString(),
    originValue: priceUtils.toCents(payment.totalPaid),
  });
};

const parsePix = (pixType, pixKey) => {
  const pixOptions = PIX_KEY_PARSER.get(pixType.toUpperCase());
  if (typeof pixOptions !== 'object') return { pixKeyType: null, pixKeyValue: null };
  const { type, parser } = pixOptions;
  return { pixKeyType: type, pixKeyValue: parser(pixKey) };
};

const indicateAndEarnSetTransactionDebitWithdrawal = async (userId, keys) => {
  const user = await userRepository.findOne({ _id: userId });
  const { pixType, pixKey, value } = keys;
  const { pixKeyType, pixKeyValue } = parsePix(pixType, pixKey);

  try {
    return await indicateAndEarnService.setTransactionDebitWithdrawal({
      cpf: user.cpf,
      email: user.email,
      name: user.name,
      originId: userId,
      pixKeyType: pixKeyType,
      pixKey: pixKeyValue,
      value: value,
    });
  } catch(error) {
    const errorMsg = error
      && error.response
      && error.response.data
      && error.response.data.error
      && error.response.data.error.message
      || 'Houve um problema ao tentar realizar a transferência, entre em contato com o suporte!';
    throw new Error(errorMsg);
  }
};

const indicateAndEarnSetTransactionDebitWithOncWallet = async ({
  idOrigin,
  value,
}) => {
  return indicateAndEarnService.setTransactionDebitWithOncWallet({
    originId: idOrigin,
    value: value,
  });
};

module.exports = {
  indicateAndEarnGetHashlink,

  indicateAndEarnGetTransactionsCredit,
  indicateAndEarnGetTransactionsDebit,
  indicateAndEarnGetTransactionsTotals,
  indicateAndEarnGetTransactionsBalance,

  indicateAndEarnSetIndicated,
  indicateAndEarnSetTransactionCredit,
  indicateAndEarnSetTransactionDebitWithdrawal,
  indicateAndEarnSetTransactionDebitWithOncWallet,
};
