"use strict";

const KondutoService = require("../../infrastructure/services/konduto/kondutoService");
const userModule = require("../user/user/userModule");
const KondutoRepository = require("./components/repository");
const moment = require("moment");

const createNewLog = async (log) => {
  try {
    return await KondutoRepository.create(log);
  } catch (error) {
    return null;
  }
};

const parseCustomer = (user) => {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    tax_id: user.cpf,
    phone1: user.generalData.phoneNumber1,
    phone2: user.generalData.phoneNumber2,
    created_at: user.createAt.toISOString().split("T")[0],
    dob: user.generalData.birthDate
      ? user.generalData.birthDate.toISOString().split("T")[0]
      : null,
  };
};

const shoppingCartParser = (cart) => {
  return cart.queries.map((element) => {
    return {
      // "category": element.code,
      name: element.title,
      //@todo check if this is really element.title again
      description: element.title,
      unit_cost: element.price,
      quantity: element.amount,
    };
  });
};

const orderFactory = async (user, totalAmount, card, cart) => {
  let _user = await userModule.getById(user);
  const timeStamp = new Date().getTime();
  return {
    id: `${_user._id.toString()}_${timeStamp}`,
    total_amount: totalAmount,
    customer: parseCustomer(_user),
    shipping_amount: 0,
    tax_amount: 0,
    currency: "BRL",
    installments: card.installments,
    payment: [
      {
        type: "credit",
        status: "pending",
        bin: card.bin,
        last4: card.last4,
        expiration_date: card.expiration_date,
      },
    ],
    billing: {
      // name: _user.name,
      address1: `${_user.generalData.address.street} - ${_user.generalData.address.neighborhood}`,
      address2: _user.generalData.address.complement,
      city: _user.generalData.address.city,
      state: _user.generalData.address.state,
      zip: _user.generalData.address.zipcode,
      country: "BR",
    },
    shopping_cart: cart ? shoppingCartParser(cart) : null,
  };
};

const createOrder = async (params) => {
  const user = params.user;
  const totalAmount = params.total_amount;
  const card = params.card;
  const cart = params.cart ? params.cart.products : null;
  const order = await orderFactory(user, totalAmount, card, cart);
  return await KondutoService.createOrder(order);
};

const isPaymentFraudError = (orderResponse) => {
  return (
    orderResponse &&
    orderResponse.error &&
    orderResponse.error.status === "error"
  );
};

const isAnalysisFraudError = (orderResponse) => {
  return (
    orderResponse &&
    orderResponse.order &&
    (orderResponse.order.recommendation === "DECLINE" ||
      orderResponse.order.recommendation === "REVIEW")
  );
};

const getMostRecentSuccessfulLogInLast10Minutes = async (userId) => {
  try {
    const last10Minutes = moment().subtract(10, "minute").toDate();
    const filter = {
      userId: userId,
      createAt: { $gte: last10Minutes },
    };
    const projection = {
      responseOrder: 1,
      createAt: 1,
    };
    const sortBy = { createAt: -1 };
    const kondutoLog = await KondutoRepository.findOneWithSort(
      filter,
      projection,
      sortBy
    );
    const isSuccessful =
      kondutoLog && kondutoLog.responseOrder && kondutoLog.responseOrder.result;

    return isSuccessful ? kondutoLog : null;
  } catch (error) {
    return null;
  }
};

const validateOrder = async (order) => {
  try {
    const orderResponse = await createOrder(order);
    const hasPaymentFraudError = isPaymentFraudError(orderResponse);
    const hasAnalysisFraudError = isAnalysisFraudError(orderResponse);

    return hasPaymentFraudError
      ? {
          error: "PAYMENT_FRAUD_ERROR",
          data: {
            isValidKondutoOrder: !hasPaymentFraudError,
            orderResponse: orderResponse && orderResponse.message,
          },
        }
      : hasAnalysisFraudError
      ? {
          error: "ANALYSIS_FRAUD_ERROR",
          data: {
            isValidKondutoOrder: !hasAnalysisFraudError,
            orderResponse: orderResponse && orderResponse.message,
          },
        }
      : { result: order };
  } catch (error) {
    const data =
      error instanceof Error
        ? { stack: error.stack, message: error.message }
        : error;
    return { error: "UNKNOWN_FRAUD_ERROR", data: data };
  }
};

module.exports = {
  createOrder,
  validateOrder,
  createNewLog,
  getMostRecentSuccessfulLogInLast10Minutes,
};
