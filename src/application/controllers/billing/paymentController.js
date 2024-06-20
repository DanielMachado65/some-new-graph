"use strict";

const USER_ERRORS = require("../../../infrastructure/constants/message/user/user.error.message");
const BILLING_ERRORS = require("../../../infrastructure/constants/message/billing/billing.errors.message");
const SYSTEM_ERRORS = require("../../../infrastructure/constants/message/system.error.message");
const ResponseStatusEnum = require("../../../infrastructure/dictionaries/ResponseStatusEnum");

const userModule = require("../../../domain/user/user/userModule");
const billingModule = require("../../../domain/billing/billing/billing.module");
const balanceModule = require("../../../domain/billing/balanceModule");
const packageModule = require("../../../domain/billing/package/package.module");
const paymentErrorLogModule = require("../../../domain/log/paymentErrorLogModule");
const paymentModule = require("../../../domain/billing/payment/payment.module");
const couponModule = require("../../../domain/coupon/couponModule");
const queryComposerModule = require("../../../domain/query/queryComposer/queryComposerModule");
const GNService = require("../../../infrastructure/services/gerencia_net/gerenciaNetService");
const systemNotificationModule = require("../../../domain/notification/systemNotificationModule");
const _ = require("lodash");
const kondutoModule = require("../../../domain/konduto/kondutoModule");
//const gRecaptchaV3Module = require('../../modules/security/gRecaptchaV3Module');
const planModule = require("../../../domain/billing/planModule");
const subscriptionModule = require("../../../domain/billing/subscriptionModule");
const paymentIuguModule = require("../../../domain/iugu/payment/payment.module");
const vehicularMonitoringModule = require("../../../domain/products/vehicularMonitoringModule");
const mailSender = require("../../../domain/mail/mailSender.service");
const priceTableModule = require("../../../domain/billing/priceTableModule");
const notificationEnum = require("../../../infrastructure/enumerators/notification.enum");
const clientIuguModule = require("../../../domain/iugu/client/client.module");
const plansTypeEnum = require("../../../infrastructure/constants/plan/types.constant");
const PaymentMethodEnum = require("../../../infrastructure/enumerators/paymentMethod.enum");
const paymentEmitter = require("../../../domain/billing/payment/payment.emitter");
const paymentManagementModule = require("../../../domain/payment_management/paymentManagement.module");
const userAgentHelper = require("../../../infrastructure/helpers/userAgent.helper");

const URL_CALLBACK =
  "https://api.olhonocarro.com.br/api/notification/callback/payment";

const httpCodes = require("../../../infrastructure/enumerators/httpCode.enum");

const {
  trackErrorInstance,
} = require("../../../infrastructure/handlers/errorTracker.handler");

const {
  responseObject,
  sendDownloadableResponse,
} = require("../../../infrastructure/helpers/routerHelper");
const { isDevEnv } = require("../../../infrastructure/config/config");

const createOrUpdatePaymentManagementRules = async (params) => {
  return paymentManagementModule.createOrUpdatePaymentManagementRules(params);
};

const getCurrentPaymentManagementRules = async () => {
  return paymentManagementModule.getCurrentPaymentManagementRules();
};

const getGerenciaNetAccount = async (user) => {
  if (user && user.hierarchy.partner) {
    let partner = await userModule.getById(user.hierarchy.partner);
    if (partner) {
      if (
        partner.partner.rules.billing.gateways.gerenciaNet &&
        partner.partner.rules.billing.gateways.gerenciaNet.clientSecret &&
        partner.partner.rules.billing.gateways.gerenciaNet.clientId
      ) {
        return {
          clientSecret:
            partner.partner.rules.billing.gateways.gerenciaNet.clientSecret,
          clientId: partner.partner.rules.billing.gateways.gerenciaNet.clientId,
        };
      }
    }
  }
  return null;
};

const validateTransaction = (user, paymentType) => {
  let check = true;
  if (!paymentType) return false;
  else if (paymentType === "banking_billet") {
    if (
      !user.name ||
      !user.cpf ||
      !user.generalData.phoneNumber1 ||
      !user.email
    )
      check = false;
  }
  return check;
};

const getCpfCleaned = (cpf) => {
  return (cpf && cpf.replace(/\D+/g, "")) || null;
};

//@Deprected
const execute = async (userid, data) => {
  let response = {
    data: null,
    error: null,
    code: 200,
  };
  let payment = null;
  let products = data.products;
  const couponId = data.coupon;
  let installments = data.installments ? data.installments : 1;

  let paymentObject = {
    type: data.type,
    billing: null,
    items: null,
    totalPrice: null,
    realPrice: 0,
  };
  let user = await userModule.getById(userid);
  if (!user) {
    response.error = USER_ERRORS.INVALID_USER;
    response.code = 410;
    return response;
  }
  let billing = await billingModule.getByUser(userid);
  try {
    if (billing && billing.billingType === 1) {
      let priceTable = billing.priceTable;
      let packages = products.packages;
      let queries = products.queries;

      let items = [];

      if (packages) {
        for (let pack of packages) {
          let _package = await packageModule.getById(pack.id);
          if (_package && billing.billingType === 1) {
            let obj = {
              name: _package.name,
              value: _package.purchasePrice,
              attributedValue: _package.attributedValue,
              amount: pack.amount,
              packageid: _package._id,
            };
            items.push(obj);
          }
        }
      }

      if (queries) {
        for (let query of queries) {
          let _query = _.find(priceTable.template, {
            querycode: query.code,
          });
          if (_query) {
            let obj = {
              name: await queryComposerModule.getNameQueryByCode(
                _query.querycode
              ),
              value: _query.totalPrice,
              amount: query.amount,
            };
            items.push(obj);
          }
        }
      }

      const REAL_PRICE = items.reduce((previousValue, currentValue) => {
        const VALUE_CALCULATED = currentValue.attributedValue
          ? currentValue.attributedValue * currentValue.amount
          : currentValue.value * currentValue.amount;
        return previousValue + VALUE_CALCULATED;
      }, 0);

      const TOTAL_PRICE = await couponModule.apply(couponId, REAL_PRICE);
      const DISCOUNT_VALUE = parseFloat((REAL_PRICE - TOTAL_PRICE).toFixed(2));

      paymentObject.coupon = REAL_PRICE > TOTAL_PRICE ? couponId : null;
      paymentObject.realPrice = REAL_PRICE.toFixed(2);
      paymentObject.items = items;
      paymentObject.totalPrice = TOTAL_PRICE;
      paymentObject.billing = billing._id;

      payment = await paymentModule.createNew(paymentObject);

      items.forEach((item) => {
        item.value = Math.round(item.value * 100);
        delete item.packageid;
        delete item.attributedValue;
      });

      let transactionObject = {
        items: items, // name, value and amount
        metadata: {
          custom_id: payment._id,
          notification_url: user.hierarchy.partner
            ? URL_CALLBACK + "?id=" + user.hierarchy.partner
            : URL_CALLBACK,
        },
      };

      if (!validateTransaction(user, payment.type)) {
        response.error = BILLING_ERRORS.UNFILL_REGISTER_DATA;
        response.code = 410;
        return response;
      }

      //criando a transação
      let account = await getGerenciaNetAccount(user);
      let result = await GNService.createTransaction(
        transactionObject,
        account
      );

      payment.status = result && result.data ? result.data.status : null;
      payment.chargeId = result && result.data ? result.data.charge_id : null;
      await payment.save();

      //cria o costumer object
      let costumer = null;
      if (user) {
        costumer = {
          name: user.name,
          cpf: getCpfCleaned(user.cpf),
          phone_number: user.generalData.phoneNumber1
            ? user.generalData.phoneNumber1.toString()
            : user.generalData.phoneNumber2
            ? user.generalData.phoneNumber2.toString()
            : null,
          email: user.email,
        };
        if (user.company && user.company.cnpj) {
          costumer.juridical_person = {
            corporate_name: user.company.socialName,
            cnpj: user.company.cnpj,
          };
        }
      }

      //define o tipo de pagamento
      let body = {
        payment: null,
      };
      if (payment.type === "banking_billet") {
        let dtExpireBillet = new Date();
        dtExpireBillet = new Date(
          dtExpireBillet.setDate(dtExpireBillet.getDate() + 2)
        );
        body.payment = {
          banking_billet: {
            expire_at: dtExpireBillet.toISOString().split("T")[0],
            customer: costumer,
            message:
              "Olho no Carro - Consulte o histórico de veículos em segundos.",
          },
        };
      } else if (payment.type === "credit_card") {
        body.payment = {
          credit_card: {
            installments: installments,
            payment_token: data.paymentToken,
            billing_address: {
              street: user.generalData.address.street,
              number: user.generalData.address.number,
              neighborhood: user.generalData.address.neighborhood,
              zipcode: user.generalData.address.zipcode,
              city: user.generalData.address.city,
              state: user.generalData.address.state,
            },
            customer: costumer,
          },
        };
      }
      if (payment.chargeId) {
        // chama serviço para definição do tipo de pagamento
        let responseRequest = await GNService.definePaymentType(
          payment.chargeId,
          body,
          account,
          DISCOUNT_VALUE
        );
        if (responseRequest && responseRequest.code == 200) {
          let dataRequest = responseRequest.data;
          payment.status = dataRequest.status;
          if (dataRequest.payment === "banking_billet") {
            payment.bankingBillet.barcode = dataRequest.barcode;
            payment.bankingBillet.link = dataRequest.link;
            payment.bankingBillet.expire_at = dataRequest.expire_at;
          } else if (dataRequest.payment === "credit_card") {
            payment.creditCard.installments = installments;
            payment.creditCard.installmentValue = dataRequest.installment_value;
            payment.creditCard.token = data.paymentToken;
          }
        }
        await payment.save();
      }

      if (payment.status === "paid") {
        await billingModule.addCreditsByUser(
          user._id,
          payment.totalPrice,
          null,
          billing
        );
        if (packages) {
          for (let pack of packages) {
            let _package = await packageModule.getById(pack.id);
            if (_package) {
              let obj = {
                purchasePrice: _package.purchasePrice,
                attributedValue: _package.attributedValue,
                name: _package.name,
                amount: pack.amount,
                discountPercent: _package.discountPercent,
              };
              billing.packages.push(obj);
            }
          }
          await billing.save();
        }
      }
      const couponsId = couponId ? [couponId] : [];
      await couponModule.decreaseUsageFromCouponsIds(couponsId);
      response.data = payment;
    } else {
      response.error = USER_ERRORS.INVALID_USER;
      response.code = 410;
    }
  } catch (err) {
    console.log("ERROR Bank_Billet Payment");
    console.log(err);
    response.code = 500;
    response.error = err;
    let objError = {
      billing: billing ? billing._id : null,
      error: JSON.stringify(err),
    };
    await paymentErrorLogModule.createNewLog(objError);
    payment && payment.remove ? await payment.deleteOne() : false;
  }
  return response;
};

const validateKonduto = async (userId, kondutoOrder) => {
  const validateOrderResponse = await kondutoModule.validateOrder(kondutoOrder);
  const kondutoLog = await kondutoModule.createNewLog({
    userId,
    order: kondutoOrder,
    responseOrder: validateOrderResponse,
  });
  if (
    validateOrderResponse.error &&
    validateOrderResponse.error === "ANALYSIS_FRAUD_ERROR"
  )
    return { ...validateOrderResponse, log: kondutoLog };
  else if (
    validateOrderResponse.error &&
    validateOrderResponse.error === "PAYMENT_FRAUD_ERROR"
  )
    return { ...validateOrderResponse, log: kondutoLog };
  else if (validateOrderResponse.error)
    return {
      ...validateOrderResponse,
      error: "UNKNOWN_SECURITY_ERROR",
      log: kondutoLog,
    };

  return { result: true, log: kondutoLog };
};

const paymentItemToCartItem = (itemIdKey) => (item) => ({
  id: item[itemIdKey],
  title: item.name,
  price: item.realValue || 0,
  amount: item.amount,
});

const makeCreditCardData = (dataCardEncrypted) => {
  const { cardNumber, cardMonth, cardYear } = JSON.parse(
    Buffer.from(dataCardEncrypted, "base64").toString("utf8")
  );

  return {
    bin: cardNumber.substr(0, 6),
    last4: cardNumber.substr(-4),
    expiration_date: cardMonth + cardYear,
    installments: 1,
  };
};

const verifySecurity = async (
  userId,
  billingId,
  totalCart,
  creditCard,
  cart,
  _navigationToken
) => {
  // Google Recaptcha
  // const siteVerifyResponse = await gRecaptchaV3Module.siteVerify(navigationToken);
  // if (siteVerifyResponse.error && siteVerifyResponse.error === 'ROBOT_SECURITY_ERROR') return siteVerifyResponse;
  // else if (siteVerifyResponse.error) return {error: 'UNKNOWN_SECURITY_ERROR'};

  const kondutoOrder = {
    user: userId,
    total_amount: totalCart,
    card: creditCard,
    cart: cart,
  };

  const mostRecentSuccessfulLogInLast10Minutes = await kondutoModule.getMostRecentSuccessfulLogInLast10Minutes(
    userId
  );
  if (mostRecentSuccessfulLogInLast10Minutes === null)
    return validateKonduto(userId, kondutoOrder);

  const hasSuccessfulPaymentAfterCheck = await paymentModule.hasSuccessfulPaymentAfterCheck(
    billingId,
    mostRecentSuccessfulLogInLast10Minutes.createAt
  );
  if (hasSuccessfulPaymentAfterCheck !== false)
    return validateKonduto(userId, kondutoOrder);

  return { result: true, log: mostRecentSuccessfulLogInLast10Minutes };
};

const getCartItems = async (cart, priceTableId) => {
  const couponId = cart.coupon;
  const packagesIds = cart.products.packages.map((pack) => pack.id);
  const queriesIds = cart.products.queries.map((query) => query.code);
  const [
    priceTableResponse,
    packagesResponse,
    queriesResponse,
    couponResponse,
  ] = await Promise.all([
    priceTableModule.getPriceTableById(priceTableId),
    packageModule.getBatchByIds(packagesIds),
    queryComposerModule.getBatchByCodes(queriesIds),
    couponModule.getById(couponId),
  ]);
  if (
    priceTableResponse.error &&
    priceTableResponse.error === "INVALID_PRICE_TABLE_ERROR"
  )
    return priceTableResponse;
  else if (
    packagesResponse.error &&
    packagesResponse.error === "INVALID_PACKAGE_ERROR"
  )
    return packagesResponse;
  else if (
    queriesResponse.error &&
    queriesResponse.error === "INVALID_QUERY_ERROR"
  )
    return queriesResponse;
  else if (
    !couponResponse.error &&
    couponResponse.error === "INVALID_COUPON_ERROR"
  )
    return couponResponse;
  const hasError =
    priceTableResponse.error ||
    packagesResponse.error ||
    queriesResponse.error ||
    couponResponse.error;

  if (hasError) return { error: "UNKNOWN_CART_ITEMS_ERROR" };

  return {
    result: {
      priceTableResponse,
      packagesResponse,
      queriesResponse,
      couponResponse,
    },
  };
};

const rollbackPayment = async (
  billingId,
  payment,
  response,
  ip,
  userId,
  info
) => {
  try {
    console.log("---------------------------------------");
    console.log("---------------------------------------");
    console.log("PAYMENT ERROR CODE:", response.error);
    console.log("PAYMENT ERROR MSG:", response.data);

    const paymentWithErrorDto = payment
      ? JSON.parse(JSON.stringify(payment))
      : null;
    const errorMessage = JSON.stringify(response.data);
    const log = {
      billing: billingId,
      payment: paymentWithErrorDto,
      error: errorMessage,
    };
    const paymentErrorLog = await paymentErrorLogModule.createNewLog(log);
    if (info) {
      const updatedInfo = {
        ...info,
        paymentErrorLog: paymentErrorLog._id,
      };
      const errorPayload = {
        ip,
        userId,
        info: updatedInfo,
        payment,
        error: response.error,
        data: response.data,
      };
      await paymentModule.addTraceToFrontLog(errorPayload);
      trackErrorInstance.trackError(
        new Error("Payment Rollback"),
        errorPayload
      );
    }
    if (payment) await paymentModule.removeById(payment._id);
  } catch (error) {
    throw new Error(error);
  }

  return response;
};

const getCartSignatures = async (cart) => {
  const signaturesIds = cart.products.signatures.map(
    (signature) => signature.id
  );
  const [signaturesResponse] = await Promise.all([
    planModule.getBatchByIds(signaturesIds),
  ]);
  if (
    signaturesResponse.error &&
    signaturesResponse.error === "INVALID_SIGNATURE_ERROR"
  )
    return signaturesResponse;

  const hasError = signaturesResponse.error;

  if (hasError) return { error: "UNKNOWN_CART_SIGNATURES_ERROR" };

  // @todo create on planModule a function that return plans based on amount

  return {
    result: {
      signaturesResponse,
    },
  };
};

const decreaseCouponUsage = async (coupon) => {
  const couponsIds = coupon ? [coupon._id] : [];
  await couponModule.decreaseUsageFromCouponsIds(couponsIds);
};

function getCreditCardDataFromBase64String(encryptedContent) {
  if (encryptedContent) {
    const creditCardData = new Buffer.from(encryptedContent, "base64").toString(
      "utf8"
    );
    return JSON.parse(creditCardData);
  }
  return null;
}

function aggregateSecondaryPaymentGatewayErrorToResponse(
  primaryGateway,
  secondaryGateway
) {
  return {
    error: "NOT_PAID_PAYMENT_ERROR",
    data: {
      primaryGateway: primaryGateway.data,
      secondaryGateway: secondaryGateway.data,
    },
  };
}

function getNotificationOnSuccess(user, updatedPayment) {
  return {
    type: notificationEnum.NEW_ORDER_CLOSED,
    description: `O cliente ${user.email} comprou R$ ${updatedPayment.totalPrice} de crédito.`,
  };
}

const frontLogUserStep = () => {
  return {
    name: "Informações de usuário",
    code: "13C30D70B97642C935B900B5212D3677",
    description: "Obtendo as informações do usuário",
    fn: "userModule.getUserById",
    details:
      "Tenta obter as informações do usuário, caso elas existam em nossa base de dados",
  };
};

const frontLogBillingStep = () => {
  return {
    name: "Informações de billing",
    code: "4A7F476739BA114BB8BDBB7921C6F6C0",
    description: "Obtendo as informações de billing do usuário",
    fn: "billingModule.getPrePaidBillingById",
    details:
      "Tenta obter as informações de billing do usuário, caso elas existam em nossa base de dados",
  };
};

const frontLogSecurityStep = () => {
  return {
    name: "Verificação de segurança",
    code: "ABAF860C09671D84C53B861FEC823837",
    description: "Verificações de segurança antes da compra",
    fn: "verifySecurity",
    details:
      "Verificando se o usuário é ou não suspeito e está habilitado a realizar a compra",
  };
};

const frontLogCartStep = () => {
  return {
    name: "Itens do carrinho",
    code: "1DA5DE4BBDEC5C47F52C68A5A8840BE5",
    description: "Obtendo os itens do carrinho",
    fn: "getCartItems",
    details:
      "Extraindo os itens enviados do site através do carrinho (incluindo cupons) e suas respectivas tabelas de preço",
  };
};

const frontLogBuyoutStep = (type, fn) => {
  return {
    name: `Processando ${type} do carrinho`,
    code: "493EA7C957F012F15CE398851C55C98B",
    description: `Processando itens do carrinho (${type})`,
    fn: fn,
    details: `Verificando existência dos itens, calculando valores e descontos (${type})`,
  };
};

const frontLogNewPaymentStep = () => {
  return {
    name: "Nova ordem de pagamento",
    code: "17B16E3F93FCDF6BFCE769462F7F6C0A",
    description: "Criação do objeto de pagamento",
    fn: "paymentModule.orderNewPayment",
    details:
      "Criando o objeto de pagamento com os detalhes da compra do usuário",
  };
};

const frontLogIuguStep = () => {
  return {
    name: "Gateway da Iugu",
    code: "C809EAAD473F45C174C8568C5BA8AEF4",
    description: "Processando pagamento com Iugu",
    fn: "paymentModule.createPaymentWithCreditCardOnIugu",
    details: "Enviando informações de pagamento para gateway Iugu",
  };
};

const frontLogAsaasStep = () => {
  return {
    name: "Gateway do Asaas",
    code: "9C3AE8A42E258113BA12EBD2B6E348DD",
    description: "Processando pagamento com Asaas",
    fn: "paymentModule.createPaymentWithCreditCardOnAsaas",
    details: "Enviando informações de pagamento para gateway Asaas",
  };
};

const frontLogGatewayErrorStep = () => {
  return {
    name: "Erro nos Gateway",
    code: "46D8C8F71B6D6580052E12D44C35AB18",
    description: "Erro nas etapas de pagamento",
    fn: "-",
    details:
      "Após tentativa de pagamento com todos os gateways de pagamento, não foi possível concluir a compra",
  };
};

const frontLogBalanceStep = () => {
  return {
    name: "Atualizando balanço",
    code: "8A27C4C996CCC39AF40EAEAA7546C913",
    description: "Criando novo balanço para usuário",
    fn: "balanceModule.createNewBalance",
    details:
      "Novo balanco com informações do usuário que efetuou alteração, valor antigo e atualizado",
  };
};

const frontLogCreditsStep = () => {
  return {
    name: "Adicionando créditos",
    code: "D65E4C2C08BE2FED35A51DB93831DC67",
    description: "Adicionando créditos",
    fn: "billingModule.addAccountFunds",
    details:
      "Adicionando créditos ao usuário. O crédito se refere ao valor real do produto (e não com desconto)",
  };
};

const frontLogPackagesToBillingStep = () => {
  return {
    name: "Adicionando pacotes ao billing",
    code: "75D92980B9B7BF11523A1D08BFEB5560",
    description: "Adicionando pacotes ao billing do usuário",
    fn: "billingModule.addPackagesToBilling",
    details:
      "Caso pacotes tenham sido comprados, nesta etapa eles serão adicionados ao billing do usuário",
  };
};

const frontLogPixBackpressureStep = () => {
  return {
    name: "Chamada da Iugu para pagamento via PIX",
    code: "AAD860905BC9333B44D530BB33246D4E",
    description:
      "Chamada da Iugu para adicionar o pagamento do PIX a fila de supressão",
    fn: "paymentBackpressureWebHook",
    details:
      "Caso o pagamento tenha sido aprovado, a Iugu fará uma chamada em nossa API para nos informar o status do pagamento (essa chamada será colocada em uma fila).",
  };
};

const frontLogPixBackpressureEndStep = () => {
  return {
    name: "Fim da chamada da Iugu para pagamento via PIX",
    code: "B8BFBFD55E0AFFF28DE3E59E8BACCDA1",
    description:
      "Fim da chamada da Iugu para adicionar o pagamento do PIX a fila",
    fn: "paymentBackpressureWebHook",
    details: "Fim da chamada para adição do pagamento na fila",
  };
};

const frontLogPixPaymentStep = () => {
  return {
    name: "Chamada do serviço de supressão",
    code: "371EFC09222E8A7C4BB0DCDA53E0BE83",
    description:
      "Chamada do serviço de supressão para realização do pagamento via PIX",
    fn: "paymentWebHook",
    details:
      "Não existindo nenhum pagamento com o mesmo ID sendo processado, o endpoint da API é chamado para processar o pagamento informado.",
  };
};

const frontLogPixPaymentEndStep = () => {
  return {
    name: "Fim da chamada do serviço de supressão",
    code: "EA06A8782F79CABE2EEEEBB1B6BE230B",
    description:
      "Fim da chamada do serviço de supressão para realização do pagamento via PIX",
    fn: "paymentWebHook",
    details: "Fim da chamada para resolução do pagamento via PIX",
  };
};

const executionPaymentStepUser = async (userId, ip) => {
  const infoUserStep = frontLogUserStep();
  const userResponse = await userModule.getUserById(userId);

  if (!userResponse.result) {
    throw await rollbackPayment(
      null,
      null,
      userResponse,
      ip,
      userId,
      infoUserStep
    );
  }
  console.time("test");
  await paymentModule.addTraceToFrontLog({
    ip,
    userId,
    info: infoUserStep,
    data: { userId },
  });

  return userResponse.result;
};

const executionPaymentStepBilling = async (user, ip) => {
  const userId = user._id;
  const infoBillingStep = frontLogBillingStep();
  const billingResponse = await billingModule.getPrePaidBillingById(
    user.billing
  );
  const billing = billingResponse.result;

  if (!billing) {
    throw await rollbackPayment(
      null,
      null,
      billingResponse,
      ip,
      userId,
      infoBillingStep
    );
  }

  await paymentModule.addTraceToFrontLog({
    ip,
    userId,
    info: infoBillingStep,
    data: { billingId: billing._id },
  });

  return billing;
};

const executionPaymentStepSecurity = async (
  userId,
  billingId,
  payment,
  dataCardEncrypted,
  navigationToken,
  ip
) => {
  const infoSecurityStep = frontLogSecurityStep();
  const totalCart = payment.totalPrice;
  const creditCard = makeCreditCardData(dataCardEncrypted);
  const items = payment.items || [];
  const cart = {
    products: {
      packages: items
        .filter((item) => item.packageid !== null)
        .map(paymentItemToCartItem("packageid")),
      queries: items
        .filter((item) => item.queryId !== null)
        .map(paymentItemToCartItem("queryId")),
      signatures: items
        .filter((item) => item.signatureId !== null)
        .map(paymentItemToCartItem("signatureId")),
      debts: [],
    },
    coupon: payment.coupon,
    type: payment.type,
    installment: null,
  };

  const verifySecurityResponse = await verifySecurity(
    userId,
    billingId,
    totalCart,
    creditCard,
    cart,
    navigationToken
  );
  const security = verifySecurityResponse.result;

  if (!security) {
    throw await rollbackPayment(
      null,
      payment,
      verifySecurityResponse,
      ip,
      userId,
      infoSecurityStep
    );
  }

  const kondutoLog = verifySecurityResponse.log;
  await paymentModule.addTraceToFrontLog({
    ip,
    userId,
    payment,
    info: { ...infoSecurityStep, kondutoLog },
    data: verifySecurityResponse.result,
  });

  return security;
};

const executionPaymentStepCart = async (userId, billing, cart, ip) => {
  const infoCartStep = frontLogCartStep();
  const cartItemsResponse = await getCartItems(cart, billing.priceTable);
  const cartResult = cartItemsResponse.result;

  if (!cartResult) {
    throw await rollbackPayment(
      billing._id,
      null,
      cartItemsResponse,
      ip,
      userId,
      infoCartStep
    );
  }

  await paymentModule.addTraceToFrontLog({
    ip,
    userId,
    info: infoCartStep,
    data: cartResult,
  });

  return {
    priceTable: cartResult.priceTableResponse.result,
    packages: cartResult.packagesResponse.result,
    queries: cartResult.queriesResponse.result,
    coupon: cartResult.couponResponse.result,
  };
};

const executionPaymentStepPacks = async (
  userId,
  billingId,
  cart,
  packages,
  ip
) => {
  const infoPackStep = frontLogBuyoutStep(
    "pacotes",
    "paymentModule.getBuyoutPackages"
  );
  const paymentPackResponse = paymentModule.getBuyoutPackages(
    cart.products.packages,
    packages
  );
  const paymentPacks = paymentPackResponse.result;

  if (!paymentPacks) {
    throw await rollbackPayment(
      billingId,
      null,
      paymentPackResponse,
      ip,
      userId,
      infoPackStep
    );
  }

  await paymentModule.addTraceToFrontLog({
    ip,
    userId,
    info: infoPackStep,
    data: paymentPacks,
  });

  return paymentPacks;
};

const executionPaymentStepQueries = async (
  userId,
  billingId,
  cart,
  queries,
  priceTable,
  ip
) => {
  const infoQueryStep = frontLogBuyoutStep(
    "consultas",
    "paymentModule.getBuyoutQueries"
  );
  const paymentQueryResponse = paymentModule.getBuyoutQueries(
    cart.products.queries,
    queries,
    priceTable
  );
  const paymentQueries = paymentQueryResponse.result;

  if (!paymentQueries) {
    throw await rollbackPayment(
      billingId,
      null,
      paymentQueryResponse,
      ip,
      userId,
      infoQueryStep
    );
  }

  await paymentModule.addTraceToFrontLog({
    ip,
    userId,
    info: infoQueryStep,
    data: paymentQueries,
  });

  return paymentQueries;
};

const executionPaymentStepNewPaymentOrder = async (
  userId,
  billingId,
  cart,
  items,
  coupon,
  ip,
  { paymentCreationOrigin }
) => {
  const infoNewPaymentStep = frontLogNewPaymentStep();
  const paymentOrderResponse = await paymentModule.orderNewPayment(
    billingId,
    cart.type,
    items,
    coupon,
    { paymentCreationOrigin }
  );
  const payment = paymentOrderResponse.result;

  if (!payment) {
    throw await rollbackPayment(
      billingId,
      null,
      paymentOrderResponse,
      ip,
      userId,
      infoNewPaymentStep
    );
  }

  await paymentModule.addTraceToFrontLog({
    ip,
    userId,
    info: infoNewPaymentStep,
    payment,
    data: payment,
  });

  return payment;
};

const executionPaymentStepBalance = async (
  userId,
  billing,
  payment,
  credits,
  ip
) => {
  const infoBalanceStep = frontLogBalanceStep();
  const createBalanceResponse = await balanceModule.createNewBalance(
    userId,
    null,
    billing.accountFunds,
    credits
  );
  const balance = createBalanceResponse.result;

  if (!balance) {
    throw await rollbackPayment(
      billing._id,
      payment,
      createBalanceResponse,
      ip,
      userId,
      infoBalanceStep
    );
  }

  await paymentModule.addTraceToFrontLog({
    ip,
    userId,
    info: infoBalanceStep,
    payment: payment,
    data: balance,
  });

  return balance;
};

const executionPaymentStepCredits = async (
  userId,
  billing,
  payment,
  credits,
  ip
) => {
  const infoCreditsStep = frontLogCreditsStep();
  const addAccountFundsResponse = await billingModule.addAccountFunds(
    billing._id,
    billing,
    credits
  );
  const updatedBilling = addAccountFundsResponse.result;

  if (!updatedBilling) {
    throw await rollbackPayment(
      billing._id,
      payment,
      addAccountFundsResponse,
      ip,
      userId,
      infoCreditsStep
    );
  }

  await paymentModule.addTraceToFrontLog({
    ip,
    userId,
    info: infoCreditsStep,
    payment: payment,
    data: updatedBilling,
  });

  return updatedBilling;
};

const executionPaymentStepAddPackagesToBilling = async (
  userId,
  billing,
  payment,
  cart,
  packages,
  ip
) => {
  const infoPackagesToBillingStep = frontLogPackagesToBillingStep();
  const addPackagesResponse = await billingModule.addPackagesToBilling(
    billing._id,
    billing,
    cart.products.packages,
    packages
  );
  const updatedBilling = addPackagesResponse.result;

  if (!updatedBilling) {
    throw await rollbackPayment(
      billing._id,
      payment,
      addPackagesResponse,
      ip,
      userId,
      infoPackagesToBillingStep
    );
  }

  await paymentModule.addTraceToFrontLog({
    ip,
    userId,
    info: infoPackagesToBillingStep,
    payment: payment,
    data: updatedBilling,
  });

  return updatedBilling;
};

const executionPaymentStepNotification = async (user, payment, credits) => {
  const notificationMsg = getNotificationOnSuccess(user, payment);
  await systemNotificationModule.createNewNotification(
    notificationMsg.type,
    notificationMsg.description
  );
  await mailSender.sendCredistReceivedMail(user.email, user.name, credits);
};

function isCreditCard(type) {
  return type === PaymentMethodEnum.CREDIT_CARD;
}

async function addCreditsAndNotify(
  updatedPayment,
  userId,
  billing,
  ip,
  cart,
  packages,
  user,
  type
) {
  if (isCreditCard(type)) {
    const credits = billingModule.getCreditsToAdd(updatedPayment.realPrice, 0);
    await executionPaymentStepBalance(
      userId,
      billing,
      updatedPayment,
      credits,
      ip
    );
    const updatedBilling = await executionPaymentStepCredits(
      userId,
      billing,
      updatedPayment,
      credits,
      ip
    );
    await executionPaymentStepAddPackagesToBilling(
      userId,
      updatedBilling,
      updatedPayment,
      cart,
      packages,
      ip
    );
    await executionPaymentStepNotification(user, updatedPayment, credits);
  }
}

const executePayment = async (
  userId,
  data,
  hasToVerifySecurity,
  ip,
  { paymentCreationOrigin },
  paymentExecutor
) => {
  try {
    const { cart, dataCardEncrypted, navigationToken } = data;
    const user = await executionPaymentStepUser(userId, ip);
    const type = cart.type;
    const billing = await executionPaymentStepBilling(user, ip);
    const billingId = billing._id;
    const {
      priceTable,
      packages,
      queries,
      coupon,
    } = await executionPaymentStepCart(userId, billing, cart, ip);
    const paymentPacks = await executionPaymentStepPacks(
      userId,
      billingId,
      cart,
      packages,
      ip
    );
    const paymentQueries = await executionPaymentStepQueries(
      userId,
      billingId,
      cart,
      queries,
      priceTable,
      ip
    );
    const items = paymentPacks.concat(paymentQueries);
    const payment = await executionPaymentStepNewPaymentOrder(
      userId,
      billingId,
      cart,
      items,
      coupon,
      ip,
      { paymentCreationOrigin }
    );
    if (!isDevEnv && hasToVerifySecurity)
      await executionPaymentStepSecurity(
        userId,
        billingId,
        payment,
        dataCardEncrypted,
        navigationToken,
        ip
      );
    const updatedPayment = await paymentExecutor({
      user,
      billing,
      payment,
      coupon,
      cart,
      items,
    });
    await addCreditsAndNotify(
      updatedPayment,
      userId,
      billing,
      ip,
      cart,
      packages,
      user,
      type
    );
    await decreaseCouponUsage(coupon);
    await paymentEmitter.paymentSucceeded(updatedPayment._id);
    return { result: updatedPayment };
  } catch (error) {
    trackErrorInstance.trackError(error);
    return error;
  }
};

const executePaymentWithPix = async (
  userId,
  data,
  ip,
  { paymentCreationOrigin }
) => {
  return executePayment(
    userId,
    data,
    false,
    ip,
    { paymentCreationOrigin },
    async ({ payment, coupon, items }) => {
      const paymentObject = await paymentModule.doPaymentWithPix(
        userId,
        items,
        payment.totalPrice,
        payment.realPrice,
        coupon,
        payment._id
      );
      return paymentObject;
    }
  );
};

/** @TODO must be extended to be use without deprected fields in the coupon model */
const executePaymentWithCreditCard = async (
  userId,
  data,
  ip,
  { paymentCreationOrigin }
) => {
  return executePayment(
    userId,
    data,
    true,
    ip,
    { paymentCreationOrigin },
    async ({ user, billing, payment, cart, items }) => {
      // iugu
      const infoIuguStep = frontLogIuguStep();
      const iuguCreditCardPaymentResponse = await paymentModule.createPaymentWithCreditCardOnIugu(
        user,
        paymentModule.getItemsToSend(items),
        payment,
        cart.paymentToken,
        payment.discountValue
      );
      let {
        iuguError,
        iuguErrorData,
        iuguGatewayLog,
        iuguResponse,
        updatedPayment,
      } = iuguCreditCardPaymentResponse.error
        ? {
            iuguError: iuguCreditCardPaymentResponse.error,
            iuguErrorData: iuguCreditCardPaymentResponse.data,
            iuguGatewayLog: iuguCreditCardPaymentResponse.log,
            iuguResponse: null,
            updatedPayment: payment,
          }
        : {
            iuguError: null,
            iuguErrorData: null,
            iuguGatewayLog: iuguCreditCardPaymentResponse.log,
            iuguResponse: iuguCreditCardPaymentResponse.result.gateway,
            updatedPayment: iuguCreditCardPaymentResponse.result.payment,
          };
      await paymentModule.addTraceToFrontLog({
        ip,
        userId,
        info: { ...infoIuguStep, gatewayLog: iuguGatewayLog },
        payment: updatedPayment,
        data: iuguErrorData || iuguResponse,
        error: iuguError,
      });

      // asaas
      if (iuguCreditCardPaymentResponse.error || !updatedPayment.paid) {
        const infoAsaasStep = frontLogAsaasStep();
        const creditCardFullInfos = getCreditCardDataFromBase64String(
          data.dataCardEncrypted
        );
        const asaasCreditCardPaymentResponse = await paymentModule.createPaymentWithCreditCardOnAsaas(
          user,
          payment,
          creditCardFullInfos,
          ip
        );
        let {
          asaasError,
          asaasErrorData,
          asaasGatewayLog,
          asaasResponse,
          paymentRetried,
        } = asaasCreditCardPaymentResponse.error
          ? {
              asaasError: asaasCreditCardPaymentResponse.error,
              asaasErrorData: asaasCreditCardPaymentResponse.data,
              asaasGatewayLog: asaasCreditCardPaymentResponse.log,
              asaasResponse: null,
              paymentRetried: updatedPayment,
            }
          : {
              asaasError: null,
              asaasErrorData: null,
              asaasGatewayLog: asaasCreditCardPaymentResponse.log,
              asaasResponse: asaasCreditCardPaymentResponse.result.response,
              paymentRetried:
                asaasCreditCardPaymentResponse.result.paymentRetried,
            };
        await paymentModule.addTraceToFrontLog({
          ip,
          userId,
          info: { ...infoAsaasStep, gatewayLog: asaasGatewayLog },
          payment: paymentRetried,
          data: asaasErrorData || asaasResponse,
          error: asaasError,
        });

        if (!paymentRetried.paid || asaasError) {
          const aggregatedResponse = aggregateSecondaryPaymentGatewayErrorToResponse(
            iuguCreditCardPaymentResponse,
            asaasCreditCardPaymentResponse
          );
          throw await rollbackPayment(
            billing._id,
            updatedPayment,
            aggregatedResponse,
            ip,
            userId,
            frontLogGatewayErrorStep()
          );
        }

        await paymentModule.updatePaymentById(
          updatedPayment._id,
          paymentRetried
        );
        return paymentRetried;
      }
      return updatedPayment;
    }
  );
};

const insertPaymentIntoSubscriptions = async function (paymentId, subs) {
  const response = { result: [], error: false };
  try {
    for (const sub of subs) {
      response.result.push(
        await subscriptionModule.insertPaymentIntoSubscription(
          paymentId,
          sub._id.toString()
        )
      );
    }
  } catch (error) {
    throw new Error(error);
  }
  return response;
};

async function getUserWithIuguExternalControls(user) {
  if (
    user.externalControls &&
    user.externalControls.iugu &&
    user.externalControls.iugu.id
  )
    return { result: user };

  const response = await clientIuguModule.createClient(user);
  if (!response)
    return { error: "Error in: createClient() -> iugu/clientModule.js" };
  return await userModule.getUserById(user._id);
}

const executeSignaturePayment = async (
  userId,
  data,
  { paymentCreationOrigin }
) => {
  const creditCard = data.creditCardData;
  const cart = data.cart;
  const navigationToken = data.navigationToken;
  const totalCart = data.total;

  const userResponse = await userModule.getUserById(userId);
  if (userResponse.error) return rollbackPayment(null, null, userResponse);

  const userWithExternalControls = await getUserWithIuguExternalControls(
    userResponse.result
  );
  if (userWithExternalControls.error)
    return rollbackPayment(null, null, { data: userResponse.result });
  const user = userWithExternalControls.result;

  const billingResponse = await billingModule.getPrePaidBillingById(
    user.billing
  );
  if (billingResponse.error)
    return rollbackPayment(null, null, billingResponse);

  const billing = billingResponse.result;
  const billingId = billing._id;

  if (!isDevEnv) {
    const verifySecurityResponse = await verifySecurity(
      userId,
      billingId,
      totalCart,
      creditCard,
      cart,
      navigationToken
    );
    if (verifySecurityResponse.error)
      return rollbackPayment(null, null, verifySecurityResponse);
  }

  const createPaymentMethodResponse = await createPaymentMethod(
    user,
    cart.paymentToken
  );
  if (createPaymentMethodResponse.error)
    return rollbackPayment(billingId, null, createPaymentMethodResponse);

  const addPaymentMethodUserResponse = await updateUserPaymentMethod(
    user,
    createPaymentMethodResponse.result
  );
  if (addPaymentMethodUserResponse.error)
    return rollbackPayment(billingId, null, addPaymentMethodUserResponse);

  const cartSignaturesResponse = await getCartSignatures(cart);
  if (cartSignaturesResponse.error)
    return rollbackPayment(billingId, null, cartSignaturesResponse);

  const { signaturesResponse } = cartSignaturesResponse.result;

  const subscriptionsResponse = await createSubscriptions(
    userId,
    signaturesResponse.result
  );
  if (subscriptionsResponse.error)
    return rollbackPayment(billingId, null, subscriptionsResponse);

  const vehicularMonitoringsResponse = await createVehicularMonitorings(
    userId,
    signaturesResponse.result
  );
  if (vehicularMonitoringsResponse.error)
    return rollbackPayment(billingId, null, vehicularMonitoringsResponse);

  const paymentSignatureResponse = paymentModule.getBuyoutSignatures(
    cart.products.signatures,
    signaturesResponse.result,
    subscriptionsResponse.result
  );

  if (paymentSignatureResponse.error)
    return rollbackPayment(billingId, null, paymentSignatureResponse);

  const paymentOrderResponse = await paymentModule.orderNewPayment(
    billingId,
    cart.type,
    paymentSignatureResponse.result,
    null,
    { paymentCreationOrigin }
  );
  if (paymentOrderResponse.error)
    return rollbackPayment(billingId, null, paymentOrderResponse);

  const PAYMENT_ID = paymentOrderResponse.result._id.toString();
  const insertPaymentResponse = await insertPaymentIntoSubscriptions(
    PAYMENT_ID,
    subscriptionsResponse.result
  );
  if (insertPaymentResponse.error)
    return rollbackPayment(billingId, PAYMENT_ID, insertPaymentResponse);

  const notificationMsg = {
    type: notificationEnum.NEW_ORDER_CLOSED,
    description: `O cliente ${user.email} aderiu a novo(s) plano(s)!`,
  };

  await systemNotificationModule.createNewNotification(
    notificationMsg.type,
    notificationMsg.description
  );

  return { result: paymentSignatureResponse.result };
};

const createSubscriptions = async (userId, signatures) => {
  try {
    let subscriptions = [];

    for (const signature of signatures) {
      const objectSignature = {
        plan: signature._id,
        expireAt: getFormattedDateExpiration(),
        payableWith: "credit_card", //@TODO change it
        ignoreNotificationBilling: false,
        status: true,
      };

      const subscription = await subscriptionModule.createSubscription(
        userId,
        objectSignature
      );

      if (!subscription) {
        return { error: "subscription is null", data: null };
      }

      if (subscription.error) {
        return subscription;
      }

      subscriptions.push(subscription.data);
    }

    const hasAllSubscriptions = subscriptions.every(
      (subscription) => subscription !== null
    );

    if (hasAllSubscriptions) return { result: subscriptions };

    return { error: "INVALID_SUBSCRIPTION_ERROR", data: { subscriptions } };
  } catch (error) {
    throw new Error(error);
  }
};

const createPaymentMethod = async (user, token) => {
  try {
    const description = "Método de Pagamento";

    const paymentMethodObject = {
      description: description,
      token: token,
    };

    let paymentMethod = await paymentIuguModule.createPaymentMethod(
      user,
      paymentMethodObject
    );

    if (!paymentMethod)
      return {
        error: "INVALID_PAYMENT_METHOD_ERROR",
        data: { paymentMethod },
      };

    return { result: paymentMethod };
  } catch (error) {
    throw new Error(error);
  }
};

const getVehicularMonitoringSubscriptions = async (plans) => {
  const vehicularMonitoringPlansIds = plans
    .filter((plan) => plan.type === plansTypeEnum.MONITORAMENTO)
    .map((plan) => plan._id);
  return await subscriptionModule.getAllSubscriptionsPendingByPlanIds(
    vehicularMonitoringPlansIds
  );
};

const createVehicularMonitorings = async (userId, plans) => {
  try {
    const vehicularMonitorings = [];

    const vehicularMonitoringSubscriptions = await getVehicularMonitoringSubscriptions(
      plans
    );
    if (!vehicularMonitoringSubscriptions.length) return { result: "ok" };

    for (const subscription of vehicularMonitoringSubscriptions) {
      const vehicularMonitoring = await vehicularMonitoringModule.createVehicularMonitoring(
        userId,
        subscription._id
      );

      if (!vehicularMonitoring || vehicularMonitoring.error) {
        return null;
      }

      vehicularMonitorings.push(vehicularMonitoring.data);
    }

    const hasAllVehicularMonitorings = vehicularMonitoringSubscriptions.every(
      (subscription) => subscription !== null
    );

    if (hasAllVehicularMonitorings) return { result: vehicularMonitorings };

    return {
      error: "INVALID_VEHICULAR_MONITORING_ERROR",
      data: { vehicularMonitorings },
    };
  } catch (error) {
    throw new Error(error);
  }
};

const updateUserPaymentMethod = async (user, paymentMethod) => {
  try {
    const clientId = await clientIuguModule.getClientId(user);

    user.defaultPaymentMethodId = paymentMethod.id;

    const clientUpdated = await clientIuguModule.updateClient(clientId, user);

    if (clientUpdated) return { result: clientUpdated };

    return {
      error: "INVALID_UPDATE_CLIENT_PAYMENT_METHOD_ERROR",
      data: { clientUpdated },
    };
  } catch (error) {
    throw new Error(error);
  }
};

const getFormattedDateExpiration = () => {
  const referenceDate = new Date();
  const day = referenceDate.getDate();
  const month = referenceDate.getMonth() + 1;
  const year = referenceDate.getFullYear();
  return year + "-" + month + "-" + day;
};

const getUserTransactions = async (userid, dt) => {
  let response = {
    transactions: null,
    error: null,
  };
  try {
    let billing = await billingModule.getByUser(userid);
    if (billing) {
      response.transactions = await paymentModule.getUserTransactions(
        billing._id,
        dt
      );
    }
  } catch (e) {
    throw new Error(e);
  }
  return response;
};

const getTransactionsCount = async (ctx) => {
  try {
    const userId = ctx.auth_user_id;
    const response = await paymentModule.getTransactionsCount(userId);
    responseObject(ctx, httpCodes.SUCCESS, response);
  } catch (error) {
    return responseObject(
      ctx,
      httpCodes.GONE_ERROR,
      "Não foi possível identificar a quantidade de compras realizadas pelo usuário!"
    );
  }
};

const getByDay = async () => {
  return paymentModule.getByDay();
};

const getAll = async (billingId, partnerId, coupon) => {
  return paymentModule.getAll(billingId, partnerId, coupon);
};

const getAllPaymentsByPeriod = async (data) => {
  return paymentModule.getAllPaymentsByPeriod(data);
};

const getById = async (id) => {
  return paymentModule.getById(id);
};

const getSummaryBilling = async (billingId) => {
  return paymentModule.getSummaryBilling(billingId);
};

const getChargesByCoupon = async (userId, month, year, code) => {
  return paymentModule.getChargesByCoupon(userId, month, year, code);
};

const getBasicFrontLogInfo = async (ctx) => {
  try {
    const ip = ctx.request.headers["x-forwarded-for"];
    const paymentObject = ctx.request.body;
    const chargeId =
      paymentObject &&
      ((paymentObject.data && paymentObject.data.id) ||
        (paymentObject.payment && paymentObject.payment.id));
    const payment = await paymentModule.getPaymentByChargeId(chargeId);
    const billing = await billingModule.getById(payment.billing);
    const user = await userModule.getById(billing.user);

    return { ip, userId: user._id.toString(), payment };
  } catch (error) {
    trackErrorInstance.trackError(error, ctx.request.body);
    return { ip: null, userId: null, payment: null };
  }
};

const paymentBackpressureWebHook = async (ctx) => {
  const paymentObject = ctx.request.body;
  const { gateway } = ctx.params;
  const { ip, userId, payment } = await getBasicFrontLogInfo(ctx);

  await paymentModule.addTraceToFrontLog({
    ip,
    userId,
    info: frontLogPixBackpressureStep(),
    payment,
    data: paymentObject,
  });

  const response = await paymentModule.doPaymentBackpressureWithWebHookSelectionHandler(
    paymentObject,
    gateway
  );

  await paymentModule.addTraceToFrontLog({
    ip,
    userId,
    info: frontLogPixBackpressureEndStep(),
    payment,
    data: response,
  });

  return responseObject(ctx, httpCodes.SUCCESS, response);
};

const paymentWebHook = async (ctx) => {
  const paymentObject = ctx.request.body;
  const { gateway } = ctx.params;
  const { ip, userId, payment } = await getBasicFrontLogInfo(ctx);

  await paymentModule.addTraceToFrontLog({
    ip,
    userId,
    info: frontLogPixPaymentStep(),
    payment,
    data: paymentObject,
  });

  const response = await paymentModule.doPaymentWithWebHookSelectionHandler(
    paymentObject,
    gateway
  );

  await paymentModule.addTraceToFrontLog({
    ip,
    userId,
    info: frontLogPixPaymentEndStep(),
    payment,
    data: response,
  });
};

const extractPaymentCreationOrigin = (ctx) => {
  const userAgent = ctx.request.headers["user-agent"];
  const isMobile = userAgent ? userAgentHelper.isMobileApp(userAgent) : false;
  const originByUserAgent = isMobile ? "mobile" : "unknown";

  switch (ctx.request.headers["x-paym-origin"]) {
    case "website":
      return "website";
    case "mobile":
      return "mobile";
    default:
      return originByUserAgent;
  }
};

const paymentWithBankBillet = async (ctx) => {
  try {
    const { cart } = ctx.request.body;
    const userId = ctx.auth_user_id;
    let paymentCreationOrigin = extractPaymentCreationOrigin(ctx);
    const response = await paymentModule.createPaymentWithBankBilletOnAsaas(
      cart,
      userId,
      { paymentCreationOrigin }
    );
    return responseObject(ctx, httpCodes.SUCCESS, response);
  } catch (e) {
    throw new Error(e);
  }
};

const checkPixStatusPaymentAndSendEmailIfNeeded = async (ctx) => {
  try {
    const { paymentId } = ctx.params;
    await paymentModule.checkPixStatusPaymentAndSendEmailIfNeeded(paymentId);
    return responseObject(ctx, httpCodes.SUCCESS);
  } catch (e) {
    throw new Error(e);
  }
};

const shouldShowPopUpMensalPlans = async (ctx) => {
  try {
    const userId = ctx.auth_user_id;
    const response = await paymentModule.showPoupUpMensalPlans(userId);
    return responseObject(ctx, httpCodes.SUCCESS, response);
  } catch (e) {
    throw new Error(e);
  }
};

const generateReportOrdersWithFirstCouponUsedIfHave = async (ctx) => {
  try {
    const userId = ctx.auth_user_id;
    const { fromDate, toDate } = ctx.request.body;

    const initialDateToReport = new Date(fromDate);
    const endDateToReport = new Date(toDate);

    paymentModule
      .generateReportOrdersWithFirstCouponUsedIfHave(
        initialDateToReport,
        endDateToReport,
        userId
      )
      .finally();
    return responseObject(
      ctx,
      httpCodes.SUCCESS,
      "report will be generated and sent by email"
    );
  } catch (e) {
    throw new Error(e);
  }
};

const paymentDebtWithCreditCard = async (ctx) => {
  const userId = ctx.auth_user_id;
  const params = ctx.request.body;
  const isValidParams =
    userId &&
    params &&
    params.debtsCreditCard &&
    params.cart &&
    params.cart.products &&
    params.cart.type &&
    Array.isArray(params.cart.products.debts);

  if (!isValidParams)
    return responseObject(
      ctx,
      ResponseStatusEnum(405),
      SYSTEM_ERRORS.INVALID_PARAMS
    );

  let paymentCreationOrigin = extractPaymentCreationOrigin(ctx);

  const response = await paymentModule.doPaymentDebtWithCreditCard(
    userId,
    params.cart,
    params.debtsCreditCard,
    { paymentCreationOrigin }
  );

  return responseObject(ctx, ResponseStatusEnum(200), response);
};

const paymentDebtWithPix = (ctx) => {
  return responseObject(
    ctx,
    ResponseStatusEnum(405),
    SYSTEM_ERRORS.INVALID_PARAMS
  );
};

module.exports = {
  execute,
  extractPaymentCreationOrigin,
  executePaymentWithCreditCard,
  executeSignaturePayment,
  getCurrentPaymentManagementRules,
  getUserTransactions,
  getTransactionsCount,
  getByDay,
  getAll,
  getById,
  getSummaryBilling,
  getChargesByCoupon,
  getAllPaymentsByPeriod,
  paymentBackpressureWebHook,
  paymentDebtWithCreditCard,
  paymentDebtWithPix,
  paymentWebHook,
  paymentWithBankBillet,
  executePaymentWithPix,
  checkPixStatusPaymentAndSendEmailIfNeeded,
  createOrUpdatePaymentManagementRules,
  shouldShowPopUpMensalPlans,
  generateReportOrdersWithFirstCouponUsedIfHave,
};
