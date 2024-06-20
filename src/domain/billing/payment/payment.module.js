"use strict";

const d3 = require("d3-collection");
const _ = require("lodash");
const mongoose = require("mongoose");
const currency = require("currency.js");

const userModule = require("../../user/user/userModule");
const billingModule = require("../billing/billing.module");
const couponModule = require("../../coupon/couponModule");
const GNService = require("../../../infrastructure/services/gerencia_net/gerenciaNetService");
const IuguServices = require("../../../infrastructure/services/iugu/iugu.service");
const mercadoPagoService = require("../../../infrastructure/services/mercado-pago/mercado-pago.service");

const {
  HttpClientService,
} = require("../../../infrastructure/services/http_client");
const userTypeEnum = require("../../../infrastructure/enumerators/userType.enum");
const PaymentStatusDictionary = require("../../../infrastructure/dictionaries/PaymentStatus.dictionary");
const dateUtils = require("../../../infrastructure/utils/date.util");

const { AsaasService } = require("../../../infrastructure/services/asaas");
const { MGateway, MPayment, MInvoice } = mongoose.models;
const { shallowCopy } = require("../../../infrastructure/utils/utils");
const URL_CALLBACK =
  "https://api.olhonocarro.com.br/api/notification/callback/payment";

const priceTableFacade = require("../price_table/priceTable.facade");
const paymentFacade = require("./payment.facade");
const couponFacade = require("../../coupon/coupon.facade");
const userFacade = require("../../user/user/user.facade");
const paymentLogFacade = require("../../log/paymnet_log/paymentLog.facade");
const billingFacade = require("../../billing/billing/billing.facade");
const creditsLogFacade = require("../../log/credits_log/creditsLog.facade");
const packageFacade = require("../../billing/package/package.facade");
const invoiceFacade = require("../../billing/invoice/invoice.facade");
const mailSenderService = require("../../mail/mailSender.service");
const consumptionFacade = require("../../billing/consumption/consumption.facade");
const backpressureService = require("../../../infrastructure/services/backpressure/backpressure.service");
const previewControlFacade = require("../../control/previewControl.facede");
const debtsFacade = require("../../debts/debts.facade");
const PaymentMethodEnum = require("../../../infrastructure/enumerators/paymentMethod.enum");
const paymentEmitter = require("./payment.emitter");
const queryComposerFacade = require("../../query/queryComposer/queryComposer.facade");
const { PaymentRepository } = require('./components/reporitory/payment.repository');
const paymentRepository = new PaymentRepository();

const UserEvents = require("../../user/user/user.emitter");
const {
  generateBufferFromDataJson,
} = require("../../../infrastructure/utils/excel.util");

const {
  weakValidation,
} = require("../../../infrastructure/utils/weakValidator.util");

const getById = async (id, projection = {}) => {
  return MPayment.findOne(
    {
      _id: id,
    },
    projection
  );
};

const createNew = async (obj) => {
  const payment = new MPayment();
  if (obj) {
    payment.type = obj.type;
    payment.billing = obj.billing;
    payment.items = obj.items;
    payment.totalPrice = obj.totalPrice;
    payment.realPrice = obj.realPrice;
    payment.coupon = obj.coupon;
    payment.creationOrigin = obj.creationOrigin;
  }
  return MPayment.create(payment);
};

const updatePaymentById = async (_id, payment) => {
  return paymentRepository.updateOne({ _id }, payment);
};

const getUserTransactions = async (billingId, dt) => {
  return paymentFacade.getUserTransactions(billingId, dt);
};

const getTransactionsCount = (userId) =>
  paymentFacade.getTransactionsCount(userId);

function validateCostumer(user) {
  if (
    !user.generalData.phoneNumber1 ||
    !user.company.socialName ||
    !user.company.cnpj ||
    !user.email
  )
    return false;
  return true;
}

//DEPRECTED
const createPosPaidExecutionPayment = async (invoiceid) => {
  let response = {
    data: null,
    error: null,
  };
  let payment = null;
  let paymentObject = {
    type: "banking_billet",
    billing: null,
    items: null,
    totalPrice: null,
    realPrice: 0,
  };
  let opts = {
    path: "consumptionStatementLote",
    match: {
      status: false,
    },
  };
  try {
    let invoice = await MInvoice.findOne({
      _id: invoiceid,
    }).populate(opts);
    if (invoice) {
      let itens = [];
      let consumptionStatementLote = invoice.consumptionStatementLote;
      var entries = d3
        .nest()
        .key(function (d) {
          return d.tag;
        })
        .entries(consumptionStatementLote);
      for (let entry of entries) {
        let value = entry.values[0].value;
        let amount = entry.values.length;
        let valueToBilling = parseFloat(
          _.sumBy(entry.values, (o) => {
            return o.value;
          }).toFixed(2)
        );
        paymentObject.realPrice += paymentObject.totalPrice += valueToBilling;
        let obj = {
          name: "Itens: " + entry.key,
          value: value,
          amount: amount,
        };
        itens.push(obj);
      }

      if (itens.length > 0) {
        let billing = await billingModule.getByIdInternal(invoice.billing);
        let user = billing ? await userModule.getById(billing.user) : null;
        if (user && validateCostumer(user)) {
          paymentObject.billing = invoice.billing;
          paymentObject.items = itens;
          payment = await createNew(paymentObject);
          let itensMapped = _.map(itens, (item) => {
            item.value *= 100;
            item.value = parseInt(item.value);
            return {
              name: item.name,
              value: item.value,
              amount: item.amount,
            };
          });
          let transactionObject = null;
          if (billing.fatmin && billing.fatmin > payment.realPrice) {
            let _fatMinArr = [
              {
                name: "Consultas Olho no Carro",
                value: parseInt(billing.fatmin * 100),
                amount: 1,
              },
            ];
            transactionObject = {
              items: _fatMinArr,
              shippings: [
                {
                  name: "frete",
                  value: 0,
                },
              ],
              metadata: {
                custom_id: payment._id,
                notification_url: URL_CALLBACK,
              },
            };
          } else {
            transactionObject = {
              items: itensMapped,
              shippings: [
                {
                  name: "frete",
                  value: 0,
                },
              ],
              metadata: {
                custom_id: payment._id,
                notification_url: URL_CALLBACK,
              },
            };
          }
          let result = await GNService.createTransaction(transactionObject);
          payment.status = result && result.data ? result.data.status : null;
          payment.chargeId =
            result && result.data ? result.data.charge_id : null;
          await payment.save();
          let costumer = null;

          let _birthDate = new Date(user.generalData.birthDate);
          costumer = {
            // name : user.name,
            // cpf : user.cpf.toString(),
            // birth : (user.generalData.birthDate) ? _birthDate.toISOString().split('T')[0] : null,
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
          let body = {
            payment: null,
          };
          let dtExpireBillet = new Date();
          // dtExpireBillet.setDate(10);
          dtExpireBillet.setDate(30);
          body.payment = {
            banking_billet: {
              expire_at: dtExpireBillet.toISOString().split("T")[0],
              customer: costumer,
              message:
                "Olho no Carro - Consulte o histórico de veículos em segundos.",
            },
          };

          if (payment.chargeId) {
            // chama serviço para definição do tipo de pagamento
            let responseRequest = await GNService.definePaymentType(
              payment.chargeId,
              body
            );
            if (responseRequest && responseRequest.code === 200) {
              let dataRequest = responseRequest.data;
              payment.status = dataRequest.status;
              if (dataRequest.payment === "banking_billet") {
                payment.bankingBillet.barcode = dataRequest.barcode;
                payment.bankingBillet.link = dataRequest.link;
                payment.bankingBillet.expire_at = dataRequest.expire_at;
              }
            }
            await payment.save();
            response.data = payment;
          }
        } else console.log("invalid user data");
      }
    }
  } catch (err) {
    console.log("Err payment => ");
    console.log(err);
    response.error = err;
  }
  return response;
};

const getByDay = async () => {
  let dtDay = new Date();
  dtDay.setHours(0);
  dtDay.setMinutes(0);
  dtDay.setMinutes(0);
  dtDay.setMilliseconds(0);
  return MPayment.find({
    $and: [
      {
        createAt: {
          $gte: dtDay,
        },
      },
      {
        paid: true,
      },
    ],
  })
    .select({
      type: 1,
      totalPaid: 1,
      "items.name": 1,
      "items.amount": 1,
      "items.value": 1,
      createAt: 1,
    })
    .lean();
};

const getAll = async (billingId, partnerId, couponCode) => {
  if (partnerId) {
    let user = await userModule.getById(partnerId);
    if (user.type === 3) {
      let childrens = await userModule.getChildrensPartnerFrom(partnerId);
      if (childrens && childrens.length > 0) {
        let arrIds = childrens.map((c) => {
          return c.billing;
        });
        let filter = {};
        if (billingId && arrIds && arrIds.length > 0) {
          arrIds.push(billingId);
          filter = {
            billing: {
              $in: arrIds,
            },
          };
        } else if (billingId) {
          filter = {
            billing: billingId,
          };
        } else if (arrIds && arrIds.length > 0) {
          filter = {
            billing: {
              $in: arrIds,
            },
          };
        }

        let coupon = couponCode
          ? await couponModule.getByCode(couponCode)
          : null;
        if (coupon) {
          filter = {
            ...filter,
            coupon: coupon._id.toString(),
          };
        } else if (couponCode) return [];

        let fields = {
          type: 1,
          totalPaid: 1,
          status: 1,
          chargeId: 1,
          items: 1,
          creditCard: 1,
          bankingBillet: 1,
          createAt: 1,
          coupon: 1,
        };
        let payments = filter.coupon
          ? await MPayment.find(filter, fields)
            .populate("coupon", "code")
            .lean()
            .exec()
          : await MPayment.find(filter, fields)
            .populate("billing", "billingType")
            .populate("coupon", "code")
            .sort({
              createAt: -1,
            })
            .limit(1000)
            .lean()
            .exec();
        if (!filter.coupon)
          _.remove(
            payments,
            (payment) => payment.billing && payment.billing.billingType === 2
          );
        return payments;
      }
    } else if (user.type === 10) {
      let filter = billingId
        ? {
          billing: billingId,
        }
        : {};

      let opts = {
        path: "billing",
        select: {
          billingType: 1,
          user: 1,
        },
        populate: {
          path: "user",
          select: {
            name: 1,
          },
        },
      };
      let fieldsPayment = {
        type: 1,
        totalPaid: 1,
        status: 1,
        chargeId: 1,
        items: 1,
        creditCard: 1,
        bankingBillet: 1,
        createAt: 1,
        billing: 1,
        coupon: 1,
        gateway: 1,
        "gatewayDetails.arc.gatewayHistory": 1,
      };
      let coupon = couponCode ? await couponModule.getByCode(couponCode) : null;
      if (coupon) {
        filter = {
          ...filter,
          coupon: coupon._id.toString(),
        };
      } else if (couponCode) return [];

      let payments = filter.coupon
        ? await MPayment.find(filter, fieldsPayment)
          .populate("coupon", "code")
          .lean()
          .exec()
        : await MPayment.find(filter, fieldsPayment)
          .populate(opts)
          .populate("coupon", "code")
          .sort({
            createAt: -1,
          })
          .limit(1000)
          .lean()
          .exec();
      if (!filter.coupon)
        _.remove(
          payments,
          (payment) => payment.billing && payment.billing.billingType == 2
        );
      return payments;
    }
  } else {
    let filter = billingId
      ? {
        billing: billingId,
      }
      : {};
    let payments = await MPayment.find(filter, {
      type: 1,
      totalPaid: 1,
      status: 1,
      chargeId: 1,
      items: 1,
      creditCard: 1,
      bankingBillet: 1,
      createAt: 1,
      billing: 1,
      coupon: 1,
    })
      .populate("billing", "billingType")
      .populate("coupon", "code")
      .sort({
        createAt: -1,
      })
      .limit(1000)
      .lean();
    _.remove(payments, (payment) => {
      if (payment.billing && payment.billing.billingType === 2) return true;
    });
    return payments;
  }
};

const getSummaryBilling = async (billingid) => {
  let responseObject = {
    total: 0,
    bankBillet: 0,
    creditCard: 0,
  };

  let payments = await MPayment.find(
    {
      $and: [
        {
          billing: billingid,
        },
        {
          paid: true,
        },
      ],
    },
    {
      type: 1,
    }
  )
    .lean()
    .exec();

  if (payments) {
    responseObject.total = payments.length;
    responseObject.bankBillet = _.filter(payments, (p) => {
      return p.type === "banking_billet";
    }).length;
    responseObject.creditCard =
      responseObject.total - responseObject.bankBillet;
  }
  return responseObject;
};

const getChargesByCoupon = async (userId, month, year, code) => {
  const paidFilter = { paid: true };
  const coupons = code
    ? [await paymentFacade.getCouponByCode(code)]
    : await paymentFacade.getCouponsByUser(userId);
  const couponIds = coupons.map(
    (coupon) => new mongoose.Types.ObjectId(coupon._id.toString())
  );
  const couponsFilter =
    couponIds.length === 1
      ? { coupon: couponIds[0] }
      : { coupon: { $in: couponIds } };

  const filter = {
    $and: [paidFilter, couponsFilter],
  };

  const projection = {
    createAt: 1,
    user: "$user.email",
    value: "$totalPrice",
    coupon: "$coupon.code",
  };

  const sortBy = { createAt: -1 };

  if (month && year) {
    const startDate = dateUtils.getStartOfMonth({ month, year });
    const endDate = dateUtils.getEndOfMonth({ month, year });

    filter.$and.push({
      createAt: {
        $gte: startDate,
      },
    });
    filter.$and.push({
      createAt: {
        $lte: endDate,
      },
    });
  }

  return paymentFacade.getAllPaymentsWithCouponAndUserSortedBy(
    filter,
    projection,
    sortBy
  );
};

const getBuyoutPackages = (cartPacks, packsModel) => {
  try {
    const packages = cartPacks.map((cartPack) => {
      const packModel = packsModel.find(
        (pack) => pack._id.toString() === cartPack.id
      );
      if (!packModel) return null;

      return {
        name: packModel.name,
        realValue: packModel.purchasePrice,
        attributedValue: packModel.attributedValue,
        amount: cartPack.amount,
        packageid: packModel._id,
      };
    });
    const hasAllPackages = packages.every((pack) => pack !== null);

    if (hasAllPackages) {
      return { result: packages };
    } else {
      return {
        error: "PACKAGE_BUILD_PAYMENT_ERROR",
        data: { hasAllPackages },
      };
    }
  } catch (error) {
    const data =
      error instanceof Error
        ? { stack: error.stack, message: error.message }
        : error;
    return { error: "UNKNOWN_PAYMENT_ERROR", data: data };
  }
};

const getBuyoutQueries = (cartQueries, queriesModel, priceTable) => {
  try {
    const queries = cartQueries.map((cartQuery) => {
      const queryModel = queriesModel.find(
        (model) => model.queryCode === cartQuery.code
      );
      const queryPrice = priceTable.template.find(
        (price) => price.querycode === cartQuery.code
      );
      if (!queryModel || !queryPrice) return null;

      return {
        name: queryModel.name,
        realValue: queryPrice.totalPrice,
        amount: cartQuery.amount,
        queryId: queryModel._id,
      };
    });
    const hasAllQueries = queries.every((query) => query !== null);

    if (hasAllQueries) {
      return { result: queries };
    } else {
      return {
        error: "QUERY_BUILD_PAYMENT_ERROR",
        data: { hasAllQueries },
      };
    }
  } catch (error) {
    const data =
      error instanceof Error
        ? { stack: error.stack, message: error.message }
        : error;
    return { error: "UNKNOWN_PAYMENT_ERROR", data: data };
  }
};

const getBuyoutSignatures = (
  cartSignatures,
  signaturesModel,
  subscriptionsModel
) => {
  try {
    const signatures = cartSignatures.map((cartSignature) => {
      const signatureModel = signaturesModel.find(
        (signature) => signature._id.toString() === cartSignature.id
      );
      const subscriptionModel = subscriptionsModel.find(
        (subscription) =>
          subscription.plan.toString() === signatureModel._id.toString()
      );
      if (!signatureModel || !subscriptionModel) return null;
      return {
        name: signatureModel.name,
        realValue: getValueFormatted(signatureModel.valueCents),
        amount: cartSignature.amount,
        signatureId: signatureModel._id,
        subscriptionid: subscriptionModel._id,
      };
    });

    const hasAllSignatures = signatures.every(
      (signature) => signature !== null
    );

    if (hasAllSignatures) {
      return { result: signatures };
    } else {
      return { error: "SIGNATURE_SIGNATURE_ERROR", data: { signatures } };
    }
  } catch (error) {
    return { error: "UNKNOWN_SIGNATURE_ERROR", data: error };
  }
};

const getDiscountValue = (couponData, value) => {
  if (!couponData) return 0;

  try {
    if (couponData.rules.discountPercentage) {
      const formattedDiscount = currency(value)
        .multiply(couponData.rules.discountPercentage)
        .divide(100);
      return formattedDiscount.value;
    } else if (
      couponData.rules.discountValue &&
      value - couponData.rules.discountValue > 0
    ) {
      const formattedDiscount = currency(couponData.rules.discountValue);
      return formattedDiscount.value;
    }

    return 0;
  } catch (error) {
    return 0;
  }
};

const getTotalPrice = (totalValue, discountValue) => {
  return currency(totalValue).subtract(discountValue).value;
};

const orderNewPayment = async (billingId, type, items, couponData, { paymentCreationOrigin }) => {
  const defaultPaymentObject = {
    billing: billingId,
    type: type,
    items: items,
    coupon: (couponData && couponData._id) || null,
    realPrice: 0,
    totalPrice: 0,
    creationOrigin: paymentCreationOrigin
  };

  const paymentObject = items.reduce((result, item) => {
    const { realPrice, totalPrice } = result;
    const itemRealPrice = item.attributedValue
      ? currency(item.attributedValue).multiply(item.amount).value
      : currency(item.realValue).multiply(item.amount).value;
    const itemTotalPrice = currency(item.realValue).multiply(item.amount).value;
    return {
      ...result,
      realPrice: currency(realPrice).add(itemRealPrice).value,
      totalPrice: currency(totalPrice).add(itemTotalPrice).value,
    };
  }, defaultPaymentObject);

  const TOTAL_PRICE = paymentObject.totalPrice;
  const DISCOUNT_VALUE = getDiscountValue(couponData, TOTAL_PRICE);
  paymentObject.totalPrice = getTotalPrice(TOTAL_PRICE, DISCOUNT_VALUE);

  try {
    const paymentDoc = await createNew(paymentObject);
    const payment = paymentDoc.toObject();
    payment.discountValue = DISCOUNT_VALUE;
    if (payment) {
      return { result: payment };
    } else {
      return { error: "INVALID_PAYMENT_ERROR", data: { payment } };
    }
  } catch (error) {
    const data =
      error instanceof Error
        ? { stack: error.stack, message: error.message }
        : error;
    return { error: "UNKNOWN_PAYMENT_ERROR", data: data };
  }
};

const getItemsToSend = (items) => {
  return items.map((item) => {
    return {
      description: item.name,
      quantity: item.amount,
      price_cents: currency(item.realValue).intValue,
    };
  });
};

const logGatewayResponse = async (
  userId,
  paymentId,
  gatewayName,
  gatewayResponse
) => {
  try {
    const gateway = new MGateway();
    gateway.user = userId;
    gateway.payment = paymentId;
    gateway.gatewayName = gatewayName;
    gateway.gatewayResponse = gatewayResponse;

    return MGateway.create(gateway);
  } catch (logError) {
    console.log("GATEWAY ERROR:", logError);
    return null;
  }
};

const createPaymentWithCreditCardOnIugu = async (
  user,
  itemsToSend,
  payment,
  paymentToken,
  discountValue
) => {
  let gatewayLog = null;

  try {
    const userId = user._id;
    const paymentId = payment._id;
    const document = user.company.cnpj ? user.company.cnpj : user.cpf;
    const phonePrefix = user.generalData.phoneNumber1
      ? user.generalData.phoneNumber1.substring(0, 2)
      : null;
    const phone = user.generalData.phoneNumber1
      ? user.generalData.phoneNumber1.substring(
        2,
        user.generalData.phoneNumber1.length
      )
      : null;
    const creditCardData = {
      months: 1,
      token: paymentToken,
      items: itemsToSend,
      payment: paymentId,
      costumer: {
        document: document,
        email: user.email,
        name: user.name,
        phonePrefix: phonePrefix,
        phone: phone,
        address: {
          street: user.generalData.address.street,
          number: user.generalData.address.number,
          neighborhood: user.generalData.address.neighborhood,
          zipcode: user.generalData.address.zipcode,
          city: user.generalData.address.city,
          state: user.generalData.address.state,
          complement: user.generalData.address.complement,
        },
      },
    };

    if (discountValue)
      creditCardData.discount_cents = currency(discountValue).intValue;

    const iuguResponse = await IuguServices.directCharge(creditCardData);
    gatewayLog = await logGatewayResponse(
      userId,
      paymentId,
      "iugu",
      iuguResponse
    );

    const invoiceId =
      iuguResponse && iuguResponse.invoice_id ? iuguResponse.invoice_id : null;
    const updatedPayment =
      iuguResponse && iuguResponse.success
        ? {
          ...payment,
          status: "paid",
          paid: true,
          totalPaid: payment.totalPrice,
          chargeId: invoiceId,
        }
        : {
          ...payment,
          status: "unpaid",
          paid: false,
          chargeId: invoiceId,
        };
    const updatePaymentResponse = await updatePaymentById(
      paymentId,
      updatedPayment
    );

    if (updatePaymentResponse.ok) {
      const response = {
        gateway: iuguResponse,
        payment: updatedPayment,
      };

      return { result: response, log: gatewayLog };
    } else {
      return {
        error: "UPDATE_PAYMENT_ERROR",
        data: { updatePaymentResponse },
        log: gatewayLog,
      };
    }
  } catch (error) {
    const data =
      error instanceof Error
        ? { stack: error.stack, message: error.message }
        : error;
    return { error: "UNKNOWN_PAYMENT_ERROR", data: data, log: gatewayLog };
  }
};

const removeById = async (paymentId) => {
  try {
    const filter = { _id: paymentId };
    const response = await MPayment.deleteOne(filter);

    if (response.ok) {
      return { result: response };
    } else {
      return { error: "REMOVE_PAYMENT_ERROR", data: { response } };
    }
  } catch (error) {
    return { error: "UNKNOWN_PAYMENT_ERROR", data: error };
  }
};

const getValueFormatted = (value) => {
  return parseFloat(parseFloat(value / 100).toFixed(2));
};

const getBatchByCouponsIds = async (couponsIds) => {
  try {
    const setCouponsIds = new Set(couponsIds);
    const couponsIdsArray = [...setCouponsIds];
    const payments = await MPayment.find({
      coupon: { $in: couponsIdsArray },
    })
      .populate("coupon", "_id code")
      .lean()
      .exec();
    return { result: payments };
  } catch (error) {
    return { error: "UNKNOWN_PAYMENT_ERROR", data: error };
  }
};

const updateStatusToPaid = async function (paymentId) {
  const response = { result: null, error: false };
  const payment = await MPayment.findOne({ _id: paymentId });
  if (!payment) {
    response.error = true;
  } else {
    payment.status = "paid";
    payment.paid = true;
    await payment.save();
    response.result = JSON.parse(JSON.stringify(payment));
  }
  return response;
};

const getAllPaymentsByPeriod = async ({
  billingId,
  initDate,
  endDate,
  status,
  paidInDateRange,
}) => {
  return paymentFacade.getAllPaymentsByPeriod({
    billingId,
    initDate,
    endDate,
    status,
    paidInDateRange,
  });
};

function getDescriptionByPaymentItems(items) {
  if (items.length === 1) {
    return items[0].name;
  }
  return "Consulta Veicular - Olho no Carro";
}

function getDueDate() {
  const date = new Date();
  date.setDate(date.getDate() + 3);
  return date;
}

async function getCustomerID(asaasServiceInstance, user) {
  if (
    user.externalControls &&
    user.externalControls.asaas &&
    user.externalControls.asaas.id
  )
    return user.externalControls.asaas.id;
  const data = await asaasServiceInstance.createNewCustomer(user);
  const customer = data.response;
  await userFacade.updateOne(
    { _id: user._id },
    { "externalControls.asaas.id": customer.id }
  );
  return customer.id;
}

function translateStatusFromAsaasStatus(status) {
  if (status === "CONFIRMED" || status === "RECEIVED")
    return PaymentStatusDictionary.PAID;
  else if (status === "PENDING") return PaymentStatusDictionary.PENDING;
  else return PaymentStatusDictionary.UNPAID;
}

function getPaymentRetriedOnResponseAnalysis(payment, response) {
  const status = translateStatusFromAsaasStatus(response.status);
  if (status === PaymentStatusDictionary.PAID)
    return {
      ...payment,
      status: PaymentStatusDictionary.PAID,
      totalPaid: response.value,
      paid: true,
      chargeId: response.id,
    };
  return payment;
}

function findPackageAndRetrieveAmount(packages, packageId) {
  const { amount } = packages.find((p) => p.id === packageId);
  return amount;
}

const calculateValueToPackages = async (packages) => {
  let value = 0;
  const packagesIds = packages.map((pack) => pack.id);
  const packagesData = await packageFacade.getByIds(packagesIds);
  packagesData.forEach((pack) => {
    const amount = findPackageAndRetrieveAmount(packages, pack._id.toString());
    value += pack.purchasePrice * amount;
  });
  return value;
};

const calculateValueToQueries = async (queries, priceTableId) => {
  let value = 0;
  const queryCodes = queries.map((query) => query.code);
  const priceTable = await priceTableFacade.getById(priceTableId);
  priceTableFacade.validators.validateIfPriceTableExists(priceTable);
  const queriesItemOnPriceTable = priceTable.template.filter((item) =>
    queryCodes.includes(item.querycode)
  );
  queriesItemOnPriceTable.forEach((query) => {
    const queryItemToBuy = queries.find((q) => q.code === query.querycode);
    value += queryItemToBuy.amount * query.totalPrice;
  });
  return value;
};

async function getTotalPriceFromProducts({ products }, priceTable) {
  const { packages, queries } = products;
  const priceForPackages = await calculateValueToPackages(packages);
  const priceForQueries = await calculateValueToQueries(queries, priceTable);
  return priceForPackages + priceForQueries;
}

async function getRealPriceFromProductsAndCoupon(couponId, realPrice, userId) {
  //@todo refactor this to use facade, template method or other structural pattern to avoid circular injection
  if (couponId) {
    const coupon = await couponModule.getById(couponId);
    couponModule.validators.validateIfCouponExists(coupon.result);
    const response = await couponModule.userCanUseThisCoupon(userId, couponId);
    if (response.canUseCoupon) {
      return couponModule.apply(couponId, realPrice);
    }
    throw new Error(response.message);
  }
  return realPrice;
}

function getQueryProducts(queries, queriesModel, priceTable) {
  return queries
    .map((query) => {
      const model = queriesModel.find(
        (queryModel) => queryModel.queryCode === query.code
      );
      const price = priceTable.template.find(
        (price) => price.querycode === query.code
      );
      if (!model || !price) return null;

      return {
        name: query.title,
        realValue: price.totalPrice * query.amount,
        value: price.totalPrice,
        amount: query.amount,
        queryId: model._id,
      };
    })
    .filter((query) => !!query);
}

function getPackProducts(packages, packsModel) {
  return packages
    .map((pack) => {
      const model = packsModel.find(
        (packModel) => packModel._id.toString() === packages.id
      );
      if (!model) return null;

      return {
        name: pack.title,
        realValue: model.purchasePrice * pack.amount,
        value: model.purchasePrice,
        amount: pack.amount,
        packageid: model._id,
      };
    })
    .filter((pack) => !!pack);
}

async function getItems(priceTableId, { products: { packages, queries } }) {
  const queriesIds = queries.map((query) => query.code);
  const packagesIds = packages.map((pack) => pack.id);
  const [
    priceTable,
    { result: queriesModel = [] },
    { result: packsModel = [] },
  ] = await Promise.all([
    priceTableFacade.getById(priceTableId),
    queryComposerFacade.getBatchByCodes(queriesIds),
    packageFacade.getBatchByIds(packagesIds),
  ]);
  const queryProducts = getQueryProducts(queries, queriesModel, priceTable);
  const packageProducts = getPackProducts(packages, packsModel);
  return [...queryProducts, ...packageProducts];
}

async function updatePaymentWithGatewayResponse(payment, response) {
  if (response.bankSlipUrl && response.id) {
    payment.bankingBillet.link = response.bankSlipUrl;
    payment.chargeId = response.id;
    payment.status = "new";
    await payment.save();
    return payment;
  } else {
    throw new Error(
      typeof response.error === "string" ? response.error : "Erro desconhecido"
    );
  }
}

const createPaymentWithBankBilletOnAsaas = async (paymentObject, userId, { paymentCreationOrigin }) => {
  const user = await userFacade.getById(userId);
  userFacade.validators.validateUserExists(user);
  const billing = await billingFacade.findById(user.billing);
  billingFacade.validators.validateIfBillingExists(billing);
  const realPrice = await getTotalPriceFromProducts(
    paymentObject,
    billing.priceTable
  );
  const { coupon } = paymentObject;
  const totalPrice = await getRealPriceFromProductsAndCoupon(
    coupon,
    realPrice,
    userId
  );
  const items = await getItems(billing.priceTable, paymentObject);
  const dueDate = getDueDate();
  const payment = await createNew({
    type: PaymentMethodEnum.BANKING_BILLET,
    billing: billing._id,
    totalPrice,
    realPrice,
    coupon,
    bankingBillet: {
      expireAt: dueDate,
    },
    items,
    creationOrigin: paymentCreationOrigin
  });
  const paymentIdForNFeGenerate = payment._id;
  const httpClient = new HttpClientService(
    HttpClientService.strategyBuilder().useAxios()
  );
  const asaasService = new AsaasService(httpClient, userTypeEnum);
  const customerID = await getCustomerID(asaasService, user);
  const externalReference = payment._id.toString();
  const description = getDescriptionByPaymentItems(payment);
  const response = await asaasService.createPaymentWithBankingBillet(
    customerID,
    externalReference,
    totalPrice,
    description,
    dueDate
  );
  const updatedPayment = await updatePaymentWithGatewayResponse(
    payment,
    response
  );
  await logGatewayResponse(user._id, payment._id, "asaas", response);
  return shallowCopy({
    _id: updatedPayment._id,
    paid: updatedPayment.paid,
    bankingBillet: updatedPayment.bankingBillet,
    items,
    totalPrice,
  });
};

const createPaymentWithCreditCardOnAsaas = async (
  user,
  payment,
  creditCardData,
  ip
) => {
  let gatewayLog = null;

  try {
    const httpClient = new HttpClientService(
      HttpClientService.strategyBuilder().useAxios()
    );
    const asaasService = new AsaasService(httpClient, userTypeEnum);
    const value = payment.totalPrice;
    const customerID = await getCustomerID(asaasService, user);
    const externalReference = payment._id.toString();
    const holderName = creditCardData.cardHolderName;
    const number = creditCardData.cardNumber;
    const expiryMonth = creditCardData.cardMonth;
    const expiryYear = creditCardData.cardYear;
    const ccv = creditCardData.cardCcv;
    const remoteIp = ip;
    const description = getDescriptionByPaymentItems(payment);
    const dueDate = getDueDate();
    const response = await asaasService.createPaymentWithCreditCard(
      customerID,
      externalReference,
      value,
      description,
      dueDate,
      user,
      holderName,
      number,
      expiryMonth,
      expiryYear,
      ccv,
      remoteIp
    );
    const paymentRetried = getPaymentRetriedOnResponseAnalysis(
      payment,
      response
    );
    gatewayLog = await logGatewayResponse(
      user._id,
      paymentRetried._id,
      "asaas",
      response
    );
    return { result: { paymentRetried, response }, log: gatewayLog };
  } catch (error) {
    const data =
      error instanceof Error
        ? { stack: error.stack, message: error.message }
        : error;
    return { error: "UNKNOWN_PAYMENT_ERROR", data: data, log: gatewayLog };
  }
};

const hasSuccessfulPaymentAfterCheck = async (billingId, after) => {
  try {
    const filter = {
      billing: billingId,
      type: "credit_card",
      createAt: { $gte: after },
    };
    const projection = { paid: 1 };
    const sortBy = { createAt: 1 };
    const payment = await paymentFacade.findOneWithSort(
      filter,
      projection,
      sortBy
    );
    return payment && payment.paid;
  } catch (error) {
    return null;
  }
};

const getWebHookSelectionHandler = (gateway) => {
  const Handler = paymentFacade.selectWebhookHandlerByGatewayName(gateway);
  return new Handler(
    paymentEmitter,
    paymentLogFacade,
    billingFacade,
    paymentFacade,
    userFacade,
    creditsLogFacade,
    packageFacade,
    invoiceFacade,
    mailSenderService,
    consumptionFacade,
    backpressureService,
    mercadoPagoService
  );
};

const doPaymentBackpressureWithWebHookSelectionHandler = async (
  paymentObject,
  gateway
) => {
  const backpressureArgs = {
    gateway,
    paymentData: paymentObject,
  };
  const handlerInstance = getWebHookSelectionHandler(gateway);

  try {
    await handlerInstance.handleBackpressure(backpressureArgs);
    return "ok";
  } catch (error) {
    return (error && error.message) || "falha desconhecida";
  }
};

const doPaymentWithWebHookSelectionHandler = async (paymentObject, gateway) => {
  const handlerInstance = getWebHookSelectionHandler(gateway);
  return await handlerInstance.doPayment(paymentObject);
};

const addTraceToFrontLog = async ({
  ip,
  userId,
  info,
  payment,
  data,
  error,
}) => {
  try {
    const newPayment = payment ? JSON.parse(JSON.stringify(payment)) : null;
    const updatedInfo = error
      ? {
        ...info,
        ip,
        runningApplication: "API da OlhoNoCarro",
        user: userId,
        payment: newPayment,
        status: { result: false, value: error },
        data: data,
      }
      : {
        ...info,
        ip,
        runningApplication: "API da OlhoNoCarro",
        user: userId,
        payment: newPayment,
        status: { result: true, value: null },
        data: data,
      };
    await paymentFacade.addTraceToFrontLog(updatedInfo);
  } catch (error) {
    console.log("Error when updating frontlog:", { info, data, error });
  }
};

const doPaymentWithPix = async (
  userId,
  items,
  totalPrice,
  realPrice,
  couponData,
  paymentId
) => {
  const user = await userFacade.getById(userId);
  const itemsWithDiscountApplied = items.map((item) => ({
    ...item,
    realValue: couponFacade.applySync(couponData, item.realValue),
  }));
  const paymentResponse = await paymentFacade.doPaymentWithPix(
    user,
    itemsWithDiscountApplied,
    paymentId
  );
  await paymentFacade.setPixDataToPayment(paymentId, paymentResponse);
  return paymentFacade.findOne({ _id: paymentId });
};

const checkPixStatusPaymentAndSendEmailIfNeeded = async (paymentId) => {
  const paymentHasBeenDone = await paymentFacade.checkIfPaymentHasBeenDone(
    paymentId
  );
  if (paymentHasBeenDone) return;
  const payment = await paymentFacade.getPaymentById(paymentId);
  weakValidation(payment, "Invalid payment id");
  const user = await userFacade.getByBilling(payment.billing);
  weakValidation(user, "Invalid user id");
  await mailSenderService.sendBillingEmailByPix(
    user.email,
    user.name,
    payment.pix.qrcode,
    payment.pix.qrcodeText
  );
};

const getPaymentByChargeId = async (chargeId) => {
  try {
    return await paymentFacade.findOne({ chargeId });
  } catch (error) {
    return null;
  }
};

const showPoupUpMensalPlans = async (userId) => {
  let showPoupUp = false;
  const billing = await billingFacade.findUserWithoutContractedPlans(userId);
  if (billing) {
    var date = new Date();
    var lastDayRef = new Date(date.getFullYear(), date.getMonth(), 1);
    const qtdSales = await paymentFacade.getQtdInvoicesDuringTheCurrentMonth(
      billing.id,
      lastDayRef.getMonth(),
      lastDayRef.getFullYear()
    );
    if (qtdSales > 4) {
      const displayed = await previewControlFacade.getNumberViewsPerUserInMonth(
        userId
      );
      if (displayed < 2) {
        showPoupUp = true;
        await previewControlFacade.createPreviewControl(userId);
      }
    }
  }

  return { showPoupUp: showPoupUp };
};

const generateReportOrdersWithFirstCouponUsedIfHave = async (
  fromDate,
  toDate,
  userId
) => {
  const reportName = "pagamentos";
  const user = await userFacade.getById(userId, { email: 1 });
  const payments = await paymentFacade.getOrdersWithFirstCouponUsedIfHave(
    fromDate,
    toDate
  );
  const buffer = generateBufferFromDataJson(payments, reportName);
  const url = await paymentFacade.storePaymentsReportOnStorage(buffer);
  mailSenderService
    .sendSimpleEmail(
      user.email,
      "relatorio de pagamentos - olho no carro",
      `seu relatorio esta pronto, baixe ele através do link => ${url}`
    )
    .finally();
};

const getPaymentDebtInfos = (cart) => {
  const numberOfInstallments = paymentFacade.getNumberOfInstallmentsFromCart(
    cart
  );
  const protocol = paymentFacade.getProtocolFromCart(cart);
  const debtIds = paymentFacade.getDebtIdsFromCart(cart);
  return { numberOfInstallments, protocol, debtIds };
};

const createNewPaymentOrderForDebts = async (
  billingId,
  paymentType,
  protocol,
  debtIds,
  numberOfInstallments,
  { paymentCreationOrigin }
) => {
  const { debts } = await debtsFacade.retrieveDebtsByProtocolAndExternalIds(
    protocol,
    debtIds
  );
  const { installmentsPlan } = await debtsFacade.retrieveInstallments(
    protocol,
    debtIds
  );
  return paymentFacade.createNewPaymentOrderForDebts(
    billingId,
    paymentType,
    numberOfInstallments,
    protocol,
    debts,
    installmentsPlan,
    { paymentCreationOrigin }
  );
};

const notifyDebtPaymentIsUnderProcess = async (
  userId,
  protocol,
  debtIds,
  numberOfInstallments
) => {
  return null;
};

const notifyDebtPaymentIsUnderProcessByEmail = async (user, totalPrice) => {
  const userName = user.name ? user.name.split(" ")[0].trim() || "" : "";
  const userEmail = user.email;
  const price = "R$ " + totalPrice.toFixed(2).replace(".", ",");
  mailSenderService
    .sendEmailPendingOrderOfDebts(userEmail, userName, price)
    .finally();
};

function getCustomer(user) {
  try {
    return {
      email: user.email,
      phone: user.generalData.phoneNumber1 || user.generalData.phoneNumber2,
    };
  } catch (e) {
    return null;
  }
}
/**
 * 1) Obter as informações de billing do usuário
 * 2) Obter as informações de endereço do usuário
 * 3) Recuperar as informações do carrinho de compras
 * 4) Recuperar do microserviço os debitos que o usuario deseja pagar
 * 5) Recuperar do microserviço o valor das parcelas para os debitos que o usuario deseja pagar
 * 6) Criar nova ordem de pagamento
 * 7) Processar pagamento junto ao microserviço de débitos
 * 8) Atualizar objeto de pagamento para status pendente
 * 9) Notificar usuario do processamento do pagamento
 *
 * Para o objeto de pagamento os status podem ser:
 * - new
 * - pending
 * - unpaid
 * - paid
 * @returns {Promise<null>}
 */
const doPaymentDebtWithCreditCard = async (userId, cart, debtsCreditCard, { paymentCreationOrigin }) => {
  const user = await userFacade.getById(userId);
  const billingAddress = userFacade.getBillingAddress(user);
  const customer = getCustomer(user);
  const { numberOfInstallments, protocol, debtIds } = getPaymentDebtInfos(cart);
  const payment = await createNewPaymentOrderForDebts(
    user.billing,
    "credit_card",
    protocol,
    debtIds,
    numberOfInstallments,
    { paymentCreationOrigin }
  );
  await debtsFacade.executeCheckout(
    userId,
    user.cpf,
    protocol,
    debtIds,
    numberOfInstallments,
    debtsCreditCard,
    billingAddress,
    customer
  );
  await notifyDebtPaymentIsUnderProcess(
    userId,
    protocol,
    debtIds,
    numberOfInstallments
  );
  notifyDebtPaymentIsUnderProcessByEmail(user, payment.totalPrice).finally();
  return paymentFacade.updatePaymentToPendingStatus(payment._id);
};

module.exports = {
  getById,
  getPaymentByChargeId,
  createNew,
  getUserTransactions,
  getTransactionsCount,
  createPosPaidExecutionPayment,
  getByDay,
  getAll,
  getSummaryBilling,
  getChargesByCoupon,
  getBuyoutPackages,
  getBuyoutQueries,
  getBuyoutSignatures,
  orderNewPayment,
  getItemsToSend,
  createPaymentWithCreditCardOnIugu,
  removeById,
  getBatchByCouponsIds,
  updateStatusToPaid,
  getAllPaymentsByPeriod,
  createPaymentWithCreditCardOnAsaas,
  createPaymentWithBankBilletOnAsaas,
  hasSuccessfulPaymentAfterCheck,
  updatePaymentById,
  doPaymentBackpressureWithWebHookSelectionHandler,
  doPaymentDebtWithCreditCard,
  doPaymentWithWebHookSelectionHandler,
  addTraceToFrontLog,
  doPaymentWithPix,
  checkPixStatusPaymentAndSendEmailIfNeeded,
  showPoupUpMensalPlans,
  generateReportOrdersWithFirstCouponUsedIfHave,
};
