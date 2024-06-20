"use strict";

const paymentModule = require("../../../domain/billing/payment/payment.module");
const planModule = require("../../../domain/billing/planModule");
const subscriptionModule = require("../../../domain/billing/subscriptionModule");
const paymentLogModule = require("../../../domain/log/paymnet_log/paymentLog.module");
const creditsLogModule = require("../../../domain/log/credits_log/creditsLog.module");
const billingModule = require("../../../domain/billing/billing/billing.module");
const priceTableModule = require("../../../domain/billing/priceTableModule");
const invoiceModule = require("../../../domain/billing/invoice/invoice.module");
const userModule = require("../../../domain/user/user/userModule");
const packageModule = require("../../../domain/billing/package/package.module");
const iuguModule = require("../../../domain/notification/iuguModule");
const susbscriptionModule = require("../../../domain/billing/subscriptionModule");
const systemNotificationModule = require("../../../domain/notification/systemNotificationModule");
const vehicularMonitoringModule = require("../../../domain/products/vehicularMonitoringModule");
const callbackIuguModule = require("../../../domain/log/callbackIuguModule");
const GNService = require("../../../infrastructure/services/gerencia_net/gerenciaNetService");
const mailSender = require("../../../domain/mail/mailSender.service");
const InvoiceStatusDict = require("../../../infrastructure/dictionaries/InvoiceStatus.dictionary");
const events = require("../../../infrastructure/constants/iugu/eventsName.constant");
const _ = require("lodash");

const receiveData = async (data, userid) => {
  let paymentLog = null;
  let customId = null;
  let chargeId = null;
  let account = null;
  if (data && data.notification) {
    if (userid) {
      account = {
        clientId: null,
        clientSecret: null,
      };
      // let userPartner = await userModule.getById(userid);
      // if (
      //     userPartner &&
      //     userPartner.partner.rules.billing.gateways &&
      //     userPartner.partner.rules.billing.gateways.gerenciaNet &&
      //     userPartner.partner.rules.billing.gateways.gerenciaNet.clientId
      // ) {
      //     account.clientId =
      //         userPartner.partner.rules.billing.gateways.gerenciaNet.clgoientId;
      //     account.clientSecret =
      //         userPartner.partner.rules.billing.gateways.gerenciaNet.clientSecret;
      // }
    }

    let result = await GNService.getNotification(data.notification, account);
    if (result) {
      let dataResult = result.data;
      if (dataResult && dataResult.length > 0) {
        let first = dataResult[0];
        customId = first.custom_id;
        chargeId = first.identifiers ? first.identifiers.charge_id : null;
      }
      let log = {
        chargeId: chargeId,
        payment: customId,
        raw: result,
        token: data.notification,
      };
      paymentLog = await paymentLogModule.createNewLog(log);
      let last = _.last(dataResult);
      let currentStatus = last.status ? last.status.current : null;
      let payment = await paymentModule.getById(paymentLog.payment);
      if (payment && payment.paid === false) {
        payment.status = currentStatus;
        let billing = await billingModule.getByIdInternal(payment.billing);
        let user = billing ? await userModule.getById(billing.user) : null;
        if (billing && billing.billingType === 1) {
          if (currentStatus === "paid" || currentStatus === "settled") {
            let valuePaid = last.value * 0.01;
            payment.paid = true;
            payment.totalPaid = valuePaid;
            let response = await billingModule.addCreditsByUser(
              billing.user,
              payment.realPrice,
              null,
              billing
            );
            let creditsLogObject = {
              billing: billing._id,
              payment: payment._id,
              valueCredited: payment.realPrice,
              status: response.error ? false : true,
              message: response.error ? response.error : response.data,
            };
            await creditsLogModule.createNewLog(creditsLogObject);
            for (let item of payment.items) {
              if (item.packageid) {
                let pack = await packageModule.getById(item.packageid);
                if (pack) {
                  let obj = {
                    purchasePrice: pack.purchasePrice,
                    attributedValue: pack.attributedValue,
                    name: pack.name,
                    amount: item.amount,
                    discountPercent: pack.discountPercent,
                  };
                  billing.packages.push(obj);
                  await billing.save();
                }
              }
            }
            // try {
            //     let notification = {
            //         type: 2,
            //         description: `O cliente ${user.email} comprou R$ ${payment.realPrice} de crédito.`,
            //     };
            //     await systemNotificationModule.createNew(
            //         notification,
            //     );
            // } catch (error) {
            //     console.log('Error to create notification => ');
            //     console.log(error);
            // }
          } else if (
            currentStatus === "unpaid" &&
            payment.type === "credit_card"
          ) {
            if (user)
              await mailSender.sendMailToOrderDeclinedByCreditCard(
                user.name,
                user.email
              );
          } else if (
            currentStatus === "expired" &&
            payment.type === "banking_billet"
          ) {
            if (user)
              await mailSender.sendMailToOrderDeclinedByBanking(
                user.name,
                payment.bankingBillet.link,
                user.email
              );
          }
        } else if (billing && billing.billingType === 2) {
          if (currentStatus === "paid" || currentStatus === "settled") {
            let invoice = await invoiceModule.getByPayment(payment._id);
            if (invoice) {
              let valuePaid = parseFloat(last.value * 0.01);
              payment.paid = true;
              payment.totalPaid = valuePaid;
              await payment.save();
              invoice.status = InvoiceStatusDict.get(2);
              invoice.paymenteDate = new Date();
              await invoice.save();
              for (let consumptionItem of invoice.consumptionStatementLote) {
                consumptionItem.status = true;
                consumptionItem.payday = new Date();
                await consumptionItem.save();
              }
              billing.activeAccount = true;
              await billing.save();
              if (invoice.accumulatedInvoices) {
                for (let accInv of invoice.accumulatedInvoices) {
                  accInv.refInvoice.status = InvoiceStatusDict.get(2);
                  await accInv.refInvoice.save();
                  for (let consumption of accInv.refInvoice
                    .consumptionStatementLote) {
                    consumption.status = true;
                    consumption.payday = new Date();
                    await consumption.save();
                  }
                }
              }

              const children = await billingModule.getChildsWallets(
                billing._id
              );
              for (let child of children) {
                const reverseOrderInvoices = _.reverse(child.invoices);
                let expired = reverseOrderInvoices.find((data) => {
                  return data.invoice.status === InvoiceStatusDict.get(5);
                });
                let invoiceChild = expired ? expired.invoice : null;
                invoiceChild.status = InvoiceStatusDict.get(2);
                invoiceChild.paymenteDate = new Date();
                await invoiceChild.save();
                for (let consumptionItem of invoiceChild.consumptionStatementLote) {
                  consumptionItem.status = true;
                  consumptionItem.payday = new Date();
                  await consumptionItem.save();
                }
                child.activeAccount = true;
                await child.save();
              }

              if (billing.deadlineToPay) {
                billing.deadlineToPay.initDate = billing.deadlineToPay.endDate = null;
                await billing.save();
              }

              try {
                let notification = {
                  type: 2,
                  description: `O cliente ${user.email} comprou R$ ${payment.totalPaid} de crédito.`,
                };
                await systemNotificationModule.createNew(notification);
              } catch (error) {
                console.log("Error to create notification => ");
                console.log(error);
              }
            }
          } else if (currentStatus === "expired") {
            let user = await userModule.getById(billing.user);
            if (user)
              await mailSender.sendMailToOrderDeclinedByBanking(
                user.name,
                payment.bankingBillet.link,
                user.email
              );
          } else if (currentStatus === "unpaid") {
            //TODO implementar rotina de BLOQUEIO de usuário após o boleto ter sido dado como unpaid
          } else if (currentStatus === "waiting") {
            //TODO implementar rotina para notificar o usuário quanto a essa alteração
          }
        }
        await payment.save();
      }
    }
  } else {
    let log = {
      raw: data,
    };
    await paymentLogModule.createNewLog(log);
  }
  return "ok";
};

const addUserInPlanPriceTable = async (planId, userId) => {
  const priceTable = await priceTableModule.getPriceTableByPlanId(planId);
  if (priceTable) {
    await billingModule.changeUserPriceTable(userId, priceTable._id);
  }
};

const removeUserFromPlanPriceTable = async (userId) => {
  const DEFAULT_PRICE_TABLE = "5a72246abc346a9d7c3240f0";
  await billingModule.changeUserPriceTable(userId, DEFAULT_PRICE_TABLE);
};

async function createPaymentAndInsertIntoSubscription(
  planId,
  subscriptionId,
  billingId
) {
  const payment = await planModule.createPayment(planId, billingId);
  if (!payment.result) return null; // we cannot result a error otherwise the credits with
  await subscriptionModule.insertPaymentIntoSubscription(
    payment.result._id,
    subscriptionId
  );
}

async function getBillingIdByUserId(userId) {
  const user = await userModule.getUserById(userId);
  return user.result.billing.toString();
}

function subscriptionIsNotActive(status) {
  return status !== "ATIVO";
}

function validateIfIfHasBeenPaidAndThrowExceptionIfDoes(payment) {
  if (payment.paid) throw new Error("Payment has been paid already");
}

function isTheFirstMonth(payments) {
  return payments.length === 1;
}

async function subscriptionWasNotBilledThisMonthAlreadyOrIsTheFirstPayment({
  status,
  payments,
}) {
  if (subscriptionIsNotActive(status) && isTheFirstMonth(payments)) {
    const payment = await paymentModule.getById(payments[0].payment, {
      paid: 1,
    });
    validateIfIfHasBeenPaidAndThrowExceptionIfDoes(payment);
  }
  const date = new Date();
  const paymentItem = getPaymentFromPaymentsSubscriptionArray(payments, date);
  if (paymentItem) {
    const payment = await paymentModule.getById(paymentItem.payment, {
      paid: 1,
    });
    validateIfIfHasBeenPaidAndThrowExceptionIfDoes(payment);
  }
}

function getPaymentFromPaymentsSubscriptionArray(payments, date) {
  return payments.find(
    (payment) =>
      payment.refMonth === date.getMonth() &&
      payment.refYear === date.getFullYear()
  );
}

async function setPaymentObjectToPaid(subscription) {
  const paymentId = subscription.payments[0].payment;
  await paymentModule.updatePaymentById(paymentId, {
    paid: true,
    paymentDate: new Date(),
    status: "paid",
  });
}

const receiveIuguData = async (data) => {
  const eventName = data.event;
  const dataEvent = data.data;
  let subscription = null;
  try {
    switch (eventName) {
      case events.ASSINATURA_RENOVADA:
        subscription = await iuguModule.subscriptionRenewed(dataEvent);
        if (!subscription) throw Error("subscription not found");
        if (subscription.payments && subscription.payments.length === 0)
          throw Error("payment not inserted at subscription");
        await subscriptionWasNotBilledThisMonthAlreadyOrIsTheFirstPayment(
          subscription
        );
        const PLAN_ID = subscription.plan._id.toString();
        const SUBSCRIPTION_ID = subscription._id.toString();
        const USER_ID = subscription.creator.toString();
        const BILLING_ID = await getBillingIdByUserId(USER_ID);
        if (subscription.plan.type !== "monitoramento")
          await addUserInPlanPriceTable(PLAN_ID, USER_ID);
        if (subscription.plan.addCredits) {
          await addCreditsToUser(subscription);
          await sendEmailOfCreditsAdded(
            dataEvent,
            subscription.plan.valueCents
          );
        }
        if (isTheFirstMonth(subscription.payments)) {
          await setPaymentObjectToPaid(subscription);
        } else {
          await createPaymentAndInsertIntoSubscription(
            PLAN_ID,
            SUBSCRIPTION_ID,
            BILLING_ID
          );
        }
        //await sendEmailSubscriptionRenewed(dataEvent, subscription);

        break;
      case events.ASSINATURA_SUSPENSA:
        subscription = await iuguModule.subscriptionSuspended(dataEvent);
        if (!subscription) throw Error("subscription not found");

        if (subscription.plan.type !== "monitoramento") {
          const USER_ID = subscription.creator;
          await removeUserFromPlanPriceTable(USER_ID);
        }
        const subscriptionId = subscription._id;
        await sendEmailSubscriptionSuspended(subscription);
        await susbscriptionModule.deactivateSubscription(subscriptionId);
        break;

      default:
        break;
    }
  } catch (_error) {
    await callbackIuguModule.createRegister(data, _error);
    return { error: true };
  }
  return "ok";
};

const sendEmailOfCreditsAdded = async (dataEvent, creditsToAdd) => {
  const email = dataEvent.customer_email;
  const name = dataEvent.customer_name;
  await mailSender.sendCredistReceivedMail(email, name, creditsToAdd);
};

const sendEmailSubscriptionSuspended = async (subscription) => {
  const email = subscription.creator.email;
  const name = subscription.creator.name;
  const planName = subscription.plan.name;
  await mailSender.sendSubscriptionSuspendedMail(email, name, planName);
};

/*const sendEmailSubscriptionRenewed = async (dataEvent, subscription) => {
    const email = dataEvent.customer_email;
    const name = dataEvent.customer_name;
    const planName = subscription.plan.name;
    const creditsValue = subscription.plan.valueCents;
    const planType = subscription.plan.type;
    await mailSender.sendSubscriptionApprovedMail(
        email,
        name,
        planName,
        creditsValue,
        planType,
    );
};*/

const addCreditsToUser = async (subscription) => {
  try {
    const userId = subscription.creator;
    const creditsToAdd = subscription.plan.valueCents;
    const billing = await billingModule.getByUser(userId);
    await billingModule.addCreditsByUser(userId, creditsToAdd, null, billing);
  } catch (_error) {
    console.log(_error);
    throw _error;
  }
};

module.exports = {
  receiveData,
  receiveIuguData,
};
