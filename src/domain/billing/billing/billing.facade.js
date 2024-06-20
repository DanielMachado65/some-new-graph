"use strict";

const fs = require("fs");
const path = require("path");
const os = require("os");
const _ = require("lodash");
const numeral = require("numeral");
const mongoose = require("mongoose");
const currency = require("currency.js");

const queryComposerModule = require("../../query/queryComposer/queryComposerModule");
const userModule = require("../../user/user/userModule");
const consumptionStatementModule = require("../consumption/consumptionStatement.module");
const priceTableModule = require("../priceTableModule");
const balanceModule = require("../balanceModule");
const mailSender = require("../../mail/mailSender.service");
const utils = require("../../../infrastructure/utils/utils");
const billingEnum = require("../../../infrastructure/enumerators/billing.enum");
const billingRepository = require("./components/billing.repository");

const {
  generateBufferFromDataJson,
} = require("../../../infrastructure/utils/excel.util");

const PartnerTypesEnum = require("../../../infrastructure/dictionaries/PartnerTypesEnum");
const InvoiceStatusDict = require("../../../infrastructure/dictionaries/InvoiceStatus.dictionary");
const { matchPassword } = require("../../../infrastructure/utils/cryptor");

const MBilling = mongoose.models.MBilling;
const MConsumptionStatement = mongoose.models.MConsumptionStatement;
const MInvoice = mongoose.models.MInvoice;
const MPartner = mongoose.models.MPartner;
const MPayment = mongoose.models.MPayment;

const USER_ERRORS = require("../../../infrastructure/constants/message/user/user.error.message");
const BILLING_ERRORS = require("../../../infrastructure/constants/message/billing/billing.errors.message");
const QUERIES_ERRORS = require("../../../infrastructure/constants/message/query/query.errors.message");
const PRICE_TABLE_ERRORS = require("../../../infrastructure/constants/message/billing/priceTable.errors.message");

//@deprected - nao usar mais, nunca mais na vida, refatorar quando possivel que o utiliza
const getById = async (id) => {
  let result = null;
  let obj = null;
  try {
    result = await MBilling.findOne({
      $or: [
        {
          _id: id,
        },
        {
          user: id,
        },
      ],
    })
      .populate({
        path: "invoices.invoice",
        populate: {
          path: "payment",
        },
      })
      .exec();

    if (result) {
      let invoices = _.reverse(result.invoices);
      obj = {
        user: result.user,
        billingType: result.billingType,
        invoices: invoices,
        accountFunds: result.accountFunds,
        packages: result.packages,
        priceTable: result.priceTable,
      };
    }
  } catch (e) {
    obj = null;
  }
  return obj;
};

const getPrePaidBillingById = async (billingId) => {
  try {
    const billing = await MBilling.findOne({
      _id: billingId,
      billingType: billingEnum.PRE_PAID,
    })
      .lean()
      .exec();

    if (billing) {
      return { result: billing };
    } else {
      return { error: "INVALID_BILLING_ERROR" };
    }
  } catch (error) {
    return { error: "UNKNOWN_BILLING_ERROR" };
  }
};

const getByBillingId = async (id) => {
  return MBilling.findOne({
    _id: id,
  });
};

const getByIdInternal = async (id) => {
  return MBilling.findOne({
    _id: id,
  }).populate("invoices.invoice");
};

const isBlockedAnyway = (billing) => {
  if (billing.deadlineToPay && billing.deadlineToPay.endDate) {
    let _dtNow = new Date();
    let _initDate = new Date(billing.deadlineToPay.initDate);
    let _endDate = new Date(billing.deadlineToPay.endDate);
    if (_dtNow >= _initDate && _dtNow < _endDate) return true;
  }
  return billing.activeAccount;
};

function hasQueryCodeAndMatchWithQueryCandidate(q, query) {
  return (
    q.queryComposition &&
    q.queryComposition.queryCode &&
    q.queryComposition.queryCode.toString() === query.code.toString()
  );
}

//@TODO must be refactored. Trash code.
const executePaymentOperation = async (userid, query, log) => {
  let objectResponse = {
    err: null,
    success: false,
    cost: 0,
  };
  let billing = await MBilling.findOne({
    user: userid,
    // }).populate('price_table');
  })
    .populate({
      path: "priceTable",
    })
    .populate({
      path: "user",
      select: "hierarchy",
      match: {
        hierarchy: {
          $exists: true,
        },
      },
      populate: {
        path: "hierarchy.partner",
        select: "partner",
      },
    });
  let invoice = null;
  if (billing) {
    if (billing.billingType === 2) {
      const dtNow = new Date();
      let isBlock = isBlockedAnyway(billing);
      if (!isBlock) {
        log.status = query.status = false;
        objectResponse.err = log.error = BILLING_ERRORS.DEFAULTING_COSTUMER;
        log.code = 997;
        return objectResponse;
      }
      if (billing.invoices.length > 0) {
        let sortedInvoicesArray = _.sortBy(billing.invoices, ["insertDate"]),
          lastInvoiceObject = _.last(sortedInvoicesArray);
        invoice = await MInvoice.findOne({
          _id: lastInvoiceObject.invoice,
        });
        if (invoice) {
          switch (invoice.status) {
            case InvoiceStatusDict.get(1): //Aberta
              if (invoice.expirationDate < dtNow) {
                invoice.status = InvoiceStatusDict.get(5);
                await invoice.save();
                let newInvoice = new MInvoice();
                newInvoice.initialDate = new Date(
                  dtNow.getFullYear(),
                  dtNow.getMonth(),
                  1
                );
                newInvoice.expirationDate = new Date(
                  dtNow.getFullYear(),
                  dtNow.getMonth() + 1,
                  0,
                  23,
                  59,
                  59
                );
                newInvoice.billing = billing._id;
                newInvoice.refMonth = dtNow.getMonth();
                newInvoice.refYear = dtNow.getFullYear();
                newInvoice = await MInvoice.create(newInvoice);
                billing.invoices.push({
                  invoice: newInvoice._id,
                  insertDate: new Date(),
                });
                await billing.save();
                invoice = newInvoice;
              }
              break;
            case InvoiceStatusDict.get(2): //Pago
            case InvoiceStatusDict.get(5): //Atrasada
              let newInvoice = new MInvoice();
              newInvoice.initialDate = new Date(
                dtNow.getFullYear(),
                dtNow.getMonth(),
                1
              );
              newInvoice.expirationDate = new Date(
                dtNow.getFullYear(),
                dtNow.getMonth() + 1,
                0,
                23,
                59,
                59
              );
              newInvoice.billing = billing._id;
              newInvoice.refMonth = dtNow.getMonth();
              newInvoice.refYear = dtNow.getFullYear();
              newInvoice = await MInvoice.create(newInvoice);
              billing.invoices.push({
                invoice: newInvoice._id,
                insertDate: new Date(),
              });
              await billing.save();
              invoice = newInvoice;
              break;
            case InvoiceStatusDict.get(3): //Parcialmente pago
              break;
            case InvoiceStatusDict.get(4): //Reembolsada
              break;
            case InvoiceStatusDict.get(6): //Em protesto
              break;
            case InvoiceStatusDict.get(7): //Chargeback
              break;
            case InvoiceStatusDict.get(8): //Em analise
              break;
            default:
              break;
          }
        }
      } else {
        invoice = new MInvoice();
        invoice.initialDate = new Date(
          dtNow.getFullYear(),
          dtNow.getMonth(),
          1
        );
        invoice.expirationDate = new Date(
          dtNow.getFullYear(),
          dtNow.getMonth() + 1,
          0,
          23,
          59,
          59
        );
        invoice.billing = billing._id;
        invoice.refMonth = dtNow.getMonth();
        invoice.refYear = dtNow.getFullYear();
        invoice = await MInvoice.create(invoice);
        billing.invoices.push({
          invoice: invoice._id,
          insertDate: new Date(),
        });
        await billing.save();
      }
    }
    let templateQueryObjectToBilling = await priceTableModule.getQueryInPriceTable(
      billing.priceTable,
      query.code
    );
    if (templateQueryObjectToBilling) {
      const priceWithFloatingInFiveCents =
        templateQueryObjectToBilling.totalPrice - 0.05;
      if (billing.accountFunds >= priceWithFloatingInFiveCents) {
        let price = templateQueryObjectToBilling.totalPrice;
        let consumptionStatement = new MConsumptionStatement({
          tag: query.refClass,
        });
        let range = 0;
        let itensCount = 0;
        if (templateQueryObjectToBilling.consumptionRanges) {
          let dtNow = new Date();
          let dtFirstMonthDay = new Date(
            dtNow.getFullYear(),
            dtNow.getMonth(),
            1,
            0,
            0,
            0,
            0
          );

          let consumptions = await MConsumptionStatement.find({
            billing: billing._id,
            querycode: query.code,
            createAt: {
              $gt: dtFirstMonthDay,
            },
          });
          if (consumptions) {
            itensCount = consumptions.length;
            let rangeItem = _.find(
              _.orderBy(
                templateQueryObjectToBilling.consumptionRanges,
                "rangeStart",
                "desc"
              ),
              function (o) {
                return o.rangeStart <= itensCount;
              }
            );

            if (rangeItem && rangeItem.price) {
              price = rangeItem.price;
              range = rangeItem.rangeStart;
            }
          }
        }

        if (
          billing.user &&
          billing.user.hierarchy &&
          billing.user.hierarchy.partner &&
          billing.user.hierarchy.partner.partner
        ) {
          let partner = await MPartner.findOne({
            _id: billing.user.hierarchy.partner.partner,
          }).populate("rules.queries.queryComposition");
          if (partner) {
            if (
              partner.partnerType == PartnerTypesEnum(1) &&
              partner.rules &&
              partner.rules.queries
            ) {
              //Fixo
              let item = partner.rules.queries.find((q) => {
                return hasQueryCodeAndMatchWithQueryCandidate(q, query);
              });
              if (item) {
                consumptionStatement.commission.fixedBaseValue = item.cost;
                consumptionStatement.commission.value = (
                  price - item.cost
                ).toFixed(2);
              }
            } else if (partner.partnerType == PartnerTypesEnum(2)) {
              //Percentual
              consumptionStatement.commission.percentage = partner.percentage;
              consumptionStatement.commission.value = (
                (price * partner.percentage) /
                100
              ).toFixed(2);
            }
          }
        }
        consumptionStatement.invoice = invoice ? invoice._id : null;
        consumptionStatement.billing = billing._id;
        consumptionStatement.query = query._id;
        consumptionStatement.querycode = query.code;
        consumptionStatement.value = price.toFixed(2);
        consumptionStatement.range = range;
        consumptionStatement.totalConsumptions = itensCount;
        consumptionStatement.tag = consumptionStatement.description = `${consumptionStatement.tag
          } ${numeral(consumptionStatement.value).format("$0,0.00")}`;
        if (billing.billingType == 1) {
          consumptionStatement.payday = new Date();
          consumptionStatement.status = true;
        }
        consumptionStatement = await consumptionStatementModule.createNew(
          consumptionStatement
        );

        let __balance = {
          user: billing.user,
          lastBalance: billing.accountFunds,
          currentBalance: billing.accountFunds - consumptionStatement.value,
          consumptionItem: consumptionStatement._id,
        };
        await balanceModule.createNew(__balance);

        billing.accountFunds -= consumptionStatement.value;

        if (billing.billingType == 2) {
          invoice.consumptionStatementLote.push(consumptionStatement._id);
          invoice.value += consumptionStatement.value;
          await invoice.save();
        }
        objectResponse.success = true;
        objectResponse.cost = consumptionStatement.value;
      } else {
        log.status = query.status = false;
        objectResponse.err = log.error =
          billing.billingType == 1
            ? BILLING_ERRORS.INSUFFICIENTE_CREDITS
            : BILLING_ERRORS.INSUFFICIENTE_CREDITS_POST_PAID_CLIENT;
        log.code = 999;
      }
    } else {
      log.status = query.status = false;
      objectResponse.err = log.error = QUERIES_ERRORS.INVALID_CODE;
      log.code = 998;
    }
    await billing.save();
  } else if (!billing.activeAccount) {
    log.status = query.status = false;
    objectResponse.err = log.error = BILLING_ERRORS.DEFAULTING_COSTUMER;
    log.code = 997;
  } else {
    log.status = query.status = false;
    objectResponse.err = log.error = BILLING_ERRORS.BILLING_MODEL_NOT_FOUND;
    log.code = 996;
  }
  await query.save();
  await log.save();
  return objectResponse;
};

const completeExtractConsumption = async (userid) => {
  let returnObject = [];
  let billing = await MBilling.findOne({
    user: userid,
  });
  if (billing) {
    let date = new Date();
    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    let filter = {
      $and: [
        {
          billing: billing._id,
        },
        {
          createAt: {
            $gt: firstDay,
          },
        },
        {
          createAt: {
            $lt: lastDay,
          },
        },
      ],
    };
    let consumptionStatementArray = await MConsumptionStatement.find(
      filter
    ).sort({
      createAt: -1,
    });
    for (let elem of consumptionStatementArray) {
      let obj = {
        query: elem.description,
        date: elem.createAt,
        cost: elem.value,
        status: elem.status,
        payday: elem.payday,
      };
      returnObject.push(obj);
    }
  }
  return returnObject;
};

const changeUserPriceTable = async (userid, newpricetable) => {
  let response = {
    error: null,
    data: null,
  };
  let priceTable = await priceTableModule.getById(newpricetable);
  let result = null;
  if (priceTable) {
    result = await billingRepository.updateOne(
      {
        user: userid,
      },
      {
        priceTable: priceTable._id,
      }
    );
    response.data = result;
  } else response.error = PRICE_TABLE_ERRORS.TABLE_NOT_EXISTS;

  return response;
};

const addCreditsToUser = async (userId, credits, assigner, billing) => {
  const response = {
    error: null,
    data: null,
    currentBalance: 0,
  };
  billing = billing
    ? billing
    : await MBilling.findOne({
      user: userId,
    });

  const __balance = {
    user: userId,
    assigner: {
      isSystem: !assigner,
      user: assigner,
    },
    lastBalance: billing.accountFunds,
    currentBalance: billing.accountFunds + credits,
    attributedValue: credits,
  };

  await balanceModule.createNew(__balance);
  billing.accountFunds += credits;
  await billing.save();
  response.currentBalance = billing.accountFunds;
  return response;
};

const addCreditsByUser = async (userid, credits, assigner, billing) => {
  const response = addCreditsToUser(userid, credits, assigner, billing);
  const user = await userModule.getById(userid);
  if (user)
    await mailSender.sendCredistReceivedMail(user.email, user.name, credits);
  response.data = "Parabéns! 😄 Seus créditos foram adicionados com sucesso!";
  return response;
};

const executeChargebackOperation = async (query) => {
  let billing = await MBilling.findOne({
    user: query.user,
  }).populate("priceTable");
  if (billing) {
    let queryOnPriceTable = _.find(billing.priceTable.template, (o) => {
      return o.querycode == query.code;
    });
    if (queryOnPriceTable) {
      billing.accountFunds += queryOnPriceTable.totalPrice;
      let _consumption = await consumptionStatementModule.getByQuery(query._id);
      if (_consumption) {
        let _balance = await balanceModule.getByConsumption(_consumption._id);
        if (_balance) await _balance.deleteOne();
      }

      if (billing.billingType === 2) {
        let invoiceRef = _.last(billing.invoices);
        if (invoiceRef && invoiceRef.invoice) {
          let invoice = await MInvoice.findOne({
            _id: invoiceRef.invoice,
          });
          if (invoice) {
            _.remove(invoice.consumptionStatementLote, (c) => {
              return c.toString() === _consumption._id.toString();
            });
            invoice.value -= _consumption.value;
            await invoice.save();
          }
        }
      }
      await billing.save();
      return true;
    }
  }
  return false;
};

const getCreditsByUser = async (user) => {
  let response = {
    error: null,
    data: null,
  };
  let billing = await MBilling.findOne({
    user: user,
  });
  billing
    ? (response.data = billing.accountFunds
      ? billing.accountFunds.toFixed(2)
      : 0)
    : (response.error = USER_ERRORS.INVALID_USER);
  return response;
};

const getByUser = async (userid) => {
  return MBilling.findOne({
    user: userid,
  }).populate("priceTable");
};

const closeAllInvoicesPosPaid = async () => {
  let dtNow = new Date();
  let dtLastMonthDay = new Date(
    dtNow.getFullYear(),
    dtNow.getMonth() + 1,
    0,
    23,
    59,
    59,
    999
  ); // ultimo dia do mes as 23:59:59 hs/m/s

  let filter = {
    $and: [
      {
        status: InvoiceStatusDict.get(1),
      },
      {
        expirationDate: {
          $lte: dtLastMonthDay,
        },
      },
    ],
  };
  let updteObject = {
    $set: {
      status: InvoiceStatusDict.get(5),
    },
  };

  try {
    await MInvoice.updateMany(filter, updteObject);
    return true;
  } catch (error) {
    console.log("Error to update invoices status => " + error.message);
    return false;
  }
};

const getPosPaidBillings = async () => {
  let opts = {
    path: "invoices.invoice",
  };

  let filter = {
    $and: [
      {
        activeAccount: true,
      },
      {
        billingType: 2,
      },
    ],
  };
  return await MBilling.find(filter)
    .populate(opts)
    .sort({
      createAt: -1,
    })
    .exec();
};

const clientsPostPaidSummeryConsumption = async () => {
  try {
    let posPaidBillings = await getPosPaidBillings();
    let arrClientRevenues = [];
    if (posPaidBillings) {
      for (let bill of posPaidBillings) {
        let sortedInvoices = _.orderBy(bill.invoices, ["insertDate"], ["asc"]);
        let data = _.last(sortedInvoices);
        let invoice = data ? data.invoice : null;
        if (invoice) {
          if (invoice.status === InvoiceStatusDict.get(5)) {
            let user = await userModule.getById(bill.user);
            if (invoice.consumptionStatementLote.length > 0) {
              let item = await consumptionStatementModule.getById(
                invoice.consumptionStatementLote[0]
              );
              let obj = {
                name: user.name,
                email: user.email,
                consumption: invoice.value,
                totalQueries: invoice.consumptionStatementLote.length,
                query: item.querycode
                  ? await queryComposerModule.getNameQueryByCode(item.querycode)
                  : item.description,
                creditsAvailable: bill.accountFunds,
              };
              arrClientRevenues.push(obj);
            } else {
              let obj = {
                name: user.name,
                email: user.email,
                consumption: 0,
                totalQueries: 0,
                query: null,
                creditsAvailable: bill.accountFunds,
              };
              arrClientRevenues.push(obj);
            }
          }
        }
      }
    }
    return arrClientRevenues;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getTotalByPriceTable = async (priceTableId) => {
  return MBilling.find({
    priceTable: priceTableId,
  }).countDocuments();
};

const getCreditsToAdd = (totalValue, discountValue) => {
  const credits = currency(totalValue).subtract(discountValue).value;
  return credits > 0 ? credits : 0;
};

const addAccountFunds = async (billingId, billing, credits) => {
  try {
    const filter = { _id: billingId };
    const updatedBilling = {
      ...billing,
      accountFunds: currency(billing.accountFunds).add(credits).value,
    };
    const response = await billingRepository.updateOne(filter, updatedBilling);

    if (response.ok) {
      return { result: updatedBilling };
    } else {
      return { error: "ADD_FUNDS_BILLING_ERROR", data: { response } };
    }
  } catch (error) {
    return { error: "UNKNOWN_BILLING_ERROR", data: error };
  }
};

const addPackagesToBilling = async (
  billingId,
  billing,
  cartPacks,
  packsModel
) => {
  try {
    const filter = { _id: billingId };
    const packagesToAdd = cartPacks.map((cartPack) => {
      const packModel = packsModel.find(
        (pack) => pack._id.toString() === cartPack.id
      );
      if (!packModel) return null;

      return {
        purchasePrice: packModel.purchasePrice,
        attributedValue: packModel.attributedValue,
        name: packModel.name,
        amount: cartPack.amount,
        discountPercent: packModel.discountPercent,
      };
    });
    const updatedBilling = {
      ...billing,
      packages: [...billing.packages, ...packagesToAdd],
    };

    const response = await billingRepository.updateOne(filter, updatedBilling);

    if (response.ok) {
      return { result: updatedBilling };
    } else {
      return { error: "UPDATE_BILLING_ERROR", data: { response } };
    }
  } catch (error) {
    return { error: "UNKNOWN_BILLING_ERROR", data: error };
  }
};

const updateAccountFunds = async (billId, credits, assigner) => {
  let billing = await MBilling.findOne({
    _id: billId,
  });
  if (billing) {
    let __balance = {
      user: billing.user,
      assigner: {
        isSystem: assigner ? false : true,
        user: assigner,
      },
      lastBalance: billing.accountFunds,
      currentBalance: credits,
      attributedValue: credits,
    };
    await balanceModule.createNew(__balance);

    billing.accountFunds = credits;
    await billing.save();
    return true;
  }
  return false;
};

const updateAccountFundsv2 = async (
  user,
  billingid,
  billingUserId,
  credits,
  assigner,
  password
) => {
  const pass = user && user.pass;
  const match = matchPassword(pass, password);

  if (match) {
    const {
      billing,
      accountFunds,
    } = await billingRepository.updateAccountFundsv2(
      billingid,
      credits,
      assigner,
      password
    );

    if (billing) {
      const balance = {
        user: billing.user,
        assigner: {
          isSystem: assigner ? false : true,
          user: assigner,
        },
        lastBalance: accountFunds,
        currentBalance: credits,
        attributedValue: credits,
      };
      await balanceModule.createNew(balance);
    }

    mailSender.sendEmailAdmAlert({
      emailTo: "barbara@olhonocarro.com.br",
      user: (billingUserId && billingUserId.name) || "-",
      userEmail: (billingUserId && billingUserId._id) || "-",
      userId: (billingUserId && billingUserId.email) || "-",
      assigner: (user && user.name) || "-",
      assignerId: (user && user.email) || "-",
      assignerEmail: (user && user._id) || "-",
      credits: credits || "-",
      funds: accountFunds || "-",
    });

    return true;
  }
  throw new Error("Usuário ou senha invalidos");
};

const updateFatmin = async (billId, fatmin) => {
  let billing = await MBilling.findOne({
    _id: billId,
  });
  if (billing) {
    billing.fatmin = fatmin;
    await billing.save();
    return true;
  }
  return false;
};

const updateDspac = async (billId, dspac) => {
  let billing = await MBilling.findOne({
    _id: billId,
  });
  if (billing) {
    billing.dspac = dspac;
    await billing.save();
    return true;
  }
  return false;
};

const updateInvoiceBillingStatus = async (invoiceid) => {
  const response = {
    cod: 200,
    data: {
      status: null,
    },
  };

  const primaryInvoice = await mongoose.models.MInvoice.findById(invoiceid);
  const relatedBillings = (
    await MBilling.find(
      {
        $or: [
          {
            _id: primaryInvoice.billing,
          },
          {
            "billingHierarchy.mothersWallet": primaryInvoice.billing,
          },
        ],
      },
      {
        _id: 1,
      }
    )
      .lean()
      .exec()
  ).map((b) => b._id);

  const [relatedInvoices, relatedConsumptions] = (
    await mongoose.models.MInvoice.find(
      {
        $and: [
          {
            billing: {
              $in: relatedBillings,
            },
          },
          {
            refMonth: primaryInvoice.refMonth,
          },
          {
            refYear: primaryInvoice.refYear,
          },
          {
            status: InvoiceStatusDict.get(5),
          },
        ],
      },
      {
        _id: 1,
        consumptionStatementLote: 1,
      }
    )
      .lean()
      .exec()
  )
    .map((dt) => {
      return {
        _id: dt._id,
        consumptionStatementLote: dt.consumptionStatementLote,
      };
    })
    .reduce((acc, curr) => {
      acc[0] = acc[0] ? [...acc[0], curr._id] : [curr._id];
      if (Object.getOwnPropertyNames(curr.consumptionStatementLote).length)
        acc[1] = acc[1]
          ? [...acc[1], ...curr.consumptionStatementLote]
          : curr.consumptionStatementLote;
      return acc;
    }, []);

  if (relatedInvoices)
    await mongoose.models.MInvoice.updateMany(
      {
        _id: {
          $in: relatedInvoices,
        },
      },
      {
        $set: {
          status: InvoiceStatusDict.get(2),
        },
      }
    );

  if (relatedConsumptions) {
    const dt = new Date();
    await mongoose.models.MConsumptionStatement.updateMany(
      {
        _id: {
          $in: relatedConsumptions,
        },
      },
      {
        $set: {
          payday: dt,
          status: true,
        },
      }
    );
  }

  response.data.status = InvoiceStatusDict.get(2);

  const hasInvoiceDelayed = await mongoose.models.MInvoice.find({
    billing: primaryInvoice.billing,
    status: InvoiceStatusDict.get(5),
  });
  if (!hasInvoiceDelayed.length) {
    await MBilling.updateMany(
      {
        $or: [
          {
            _id: {
              $in: relatedBillings,
            },
          },
          {
            "billingHierarchy.mothersWallet": {
              $in: relatedBillings,
            },
          },
        ],
      },
      {
        $set: {
          activeAccount: true,
        },
      }
    );
  }

  return response;
};

const updateBillingHierarchy = async (userid, ownerid) => {
  let response = {
    data: null,
    error: null,
    cod: 200,
  };
  try {
    let user = await userModule.getById(userid);
    if (user) {
      let owner = await userModule.getById(ownerid);
      if (owner) {
        if (user.billing.billingType !== 2 || owner.billing.billingType !== 2) {
          response.error = BILLING_ERRORS.BILLING_TYPE_DONT_MATCH_TO_HIERARCHY;
          response.cod = 410;
        } else {
          if (user._id.toString() === owner._id.toString()) {
            user.hierarchy.owner = null;
            user.billing.billingHierarchy.mothersWallet = null;
          } else {
            try {
              if (owner.status && !user.status) {
              } else if (!owner.status && user.status) {
                await mailSender.sendMailCanceledUser(
                  billing.user.name,
                  billing.user.generalData.billingOwner &&
                    billing.user.generalData.billingOwner.email
                    ? billing.user.generalData.billingOwner.email
                    : billing.user.email
                );
              }
            } catch (err) {
              console.log(
                "Erro envio de aviso de liberação/bloqueio acesso:" + err
              );
            }

            user.status = owner.status;
            user.billing.activeAccount = owner.billing.activeAccount;

            user.hierarchy.owner = owner._id;
            user.billing.billingHierarchy.mothersWallet = owner.billing._id;
          }
          await user.save();
          await user.billing.save();
          if (user.hierarchy.owner) {
            let ownerData = await userModule.getById(user.hierarchy.owner);
            user = JSON.parse(JSON.stringify(user));
            user.hierarchy.owner = ownerData;
          }

          response.data = user;
        }
      } else {
        response.error = USER_ERRORS.USER_NOT_FOUND;
        response.cod = 404;
      }
    } else {
      response.error = USER_ERRORS.USER_NOT_FOUND;
      response.cod = 404;
    }
  } catch (error) {
    response.cod = 500;
    response.error = error.message;
    delete response.data;
  } finally {
    return response;
  }
};

const getChildsWallets = async (billingid) => {
  let opts = {
    path: "invoices.invoice",
    populate: {
      path: "consumptionStatementLote",
    },
  };
  return await MBilling.find({
    "billingHierarchy.mothersWallet": billingid,
  }).populate(opts);
};

const updateFinancialLock = async (billId, financialLock) => {
  let billing = await MBilling.findOne({
    _id: billId,
  });
  if (billing) {
    billing.financialLock.value = financialLock;
    await billing.save();
    return true;
  }
  return false;
};

const updateDeadlineToPay = async (billingid, init, end) => {
  let inDate = init ? new Date(init) : new Date();
  let limitDate = new Date(inDate);
  limitDate.setDate(limitDate.getDate() + 15);
  let endDate = new Date(end);
  let opts = {
    $set: {
      deadlineToPay: {
        initDate: inDate,
        endDate: endDate > limitDate ? limitDate : endDate,
      },
    },
  };
  let filter = {
    $or: [
      {
        _id: billingid,
      },
      {
        "billingHierarchy.mothersWallet": billingid,
      },
    ],
  };
  return await MBilling.updateMany(filter, opts);
};

function reportItemPrePaidFactory(item) {
  return {
    nome: item.userName,
    email: item.userEmail,
    documento: item.userDocument,
    telefone_1: item.userPhone1,
    telefone_2: item.userPhone2,
    //parceiro: item.userPartner && item.userPartner.email,
    origem:
      !item.userOrigin || item.userOrigin === "unknown"
        ? "DESCONHECIDA"
        : item.userOrigin.toUpperCase(),
    creditos_disponiveis: item.accountFunds,
    status:
      item.activeAccount && item.userStatus
        ? "ATIVO"
        : !item.userStatus
          ? "CANCELADO"
          : "BLOQUEADO",
    tabela_de_preco: item.priceTable,
    data_cadastro: utils.getBrazilianDateFormat(item.createAt),
    ultimo_acesso: utils.getBrazilianDateFormat(item.lastLogin),
    qntd_de_compras: item.payments && item.payments.amount,
    valor_total_gasto: item.payments && item.payments.totalPaid,
    dt_ultima_compra:
      item.payments && utils.getBrazilianDateFormat(item.payments.createAt),
  };
}

function isPrePaidClient(billingType) {
  return billingType === 1;
}

function isPosPaidClient(billingType) {
  return billingType === 2;
}

function getLastInvoiceValue(invoices) {
  const lastInvoice = invoices.pop();
  if (lastInvoice && lastInvoice.invoice) {
    return lastInvoice.invoice.value;
  }
  return 0;
}

//@todo REFAZER #MEDO :'(
function reportItemPosPaidFactory(data) {
  return data.map((item) => ({
    nome: item.user && item.user.name,
    cpf: item.user && item.user.cpf,
    razao_social:
      item.user && item.user.company && item.user.company.socialName,
    cnpj: item.user && item.user.company && item.user.company.cnpj,
    telefone_1: item.user.generalData.phoneNumber1,
    telefone_2: item.user.generalData.phoneNumber2,
    data_nascimento:
      (item.user.generalData.birthDate &&
        utils.getBrazilianDateFormat(item.user.generalData.birthDate)) ||
      null,
    status:
      item.user.status && item.activeAccount
        ? "ATIVO"
        : !item.user.status
          ? "CANCELADO"
          : "BLOQUEADO",
    fatmin: item.fatmin,
    dspac: item.dspac,
    email_mae:
      item.user &&
      item.user.hierarchy &&
      item.user.hierarchy.owner &&
      item.user.hierarchy.owner.email,
    email_parceiro:
      item.user &&
      item.user.hierarchy &&
      item.user.hierarchy.partner &&
      item.user.hierarchy.partner.email,
    creditos_disponiveis: item.accountFunds,
    tabela_de_preco: item.priceTable && item.priceTable.name,
    valor_ultima_fatura: getLastInvoiceValue(item.invoices),
    data_cancelamento:
      !item.user.status && item.user.cancellationQuiz
        ? utils.getBrazilianDateFormat(item.user.cancellationQuiz.createAt)
        : null,
  }));
}

//@TODO must be remade it
async function getPosPaidConsumersReportData(filters) {
  const data = await MBilling.find(
    { $and: filters },
    {
      accountFunds: 1,
      financialLock: 1,
      activeAccount: 1,
      createAt: 1,
      dspac: 1,
      fatmin: 1,
    }
  )
    .lean()
    .populate({
      path: "user",
      select:
        "" +
        "type " +
        "name " +
        "company.socialName " +
        "company.cnpj " +
        "email " +
        "hierarchy.owner " +
        "hierarchy.partner " +
        "code " +
        "accessCode " +
        "cpf " +
        "generalData.birthDate " +
        "generalData.phoneNumber1 " +
        "generalData.phoneNumber2 " +
        "generalData.address.number " +
        "generalData.address.complement " +
        "generalData.address.street " +
        "generalData.address.neighborhood " +
        "generalData.address.state " +
        "generalData.address.city " +
        "generalData.billingOwner.email " +
        "status " +
        "cancellationQuiz.reason " +
        "cancellationQuiz.anotherReason " +
        "cancellationQuiz.createAt",
      populate: {
        path: "hierarchy.owner hierarchy.partner",
        select: "code email name",
      },
    })
    .populate({
      path: "priceTable",
      select: "name",
    })
    .populate({
      path: "invoices.invoice",
      select: "value",
    });

  return reportItemPosPaidFactory(data);
}

//@TODO REFAZERRRRRRRRRRRRRRRRRRR
const getAllUserDataToReport = async ({
  userId,
  billingType,
  initDate,
  endDate,
  minBuyout,
  maxBuyout,
}) => {
  if (billingType !== 1 && billingType !== 2) return [];

  const users = await userModule.getPartnerAndChildrensFrom(userId, {
    _id: 1,
    email: 1,
    partner: 1,
    billing: 1,
  });
  const user = users.find((user) => user._id.toString() === userId);
  const hasClients = users.length > 1;
  const hasPartner = !!users.find((u) => u.partner);
  const hasUsersFilter = hasClients || hasPartner;
  const filters = [{ billingType: billingType }];

  if (initDate) {
    const start = new Date(initDate);

    filters.push({
      createAt: {
        $gte: new Date(
          start.getFullYear(),
          start.getMonth(),
          start.getDate(),
          0,
          0,
          0,
          0
        ),
      },
    });
  }

  if (endDate) {
    const end = new Date(endDate);

    filters.push({
      createAt: {
        $lte: new Date(
          end.getFullYear(),
          end.getMonth(),
          end.getDate(),
          23,
          59,
          59,
          999
        ),
      },
    });
  }

  if (hasUsersFilter) {
    const billings = users.map((u) => new mongoose.Types.ObjectId(u.billing));
    filters.push({
      _id: { $in: billings },
    });
  }

  setTimeout(async () => {
    const title = `Relatório-Clientes-${isPrePaidClient(billingType) ? "PRE-PAGO" : "POS-PAGO"
      }`;
    const reportData = isPrePaidClient(billingType)
      ? await getPrePaidConsumersReportData(filters, minBuyout, maxBuyout)
      : await getPosPaidConsumersReportData(filters);
    const buffer = generateBufferFromDataJson(reportData, title);
    const tempPath = path.join(os.tmpdir(), title + ".xlsx");
    const writableStream = fs.createWriteStream(tempPath);
    writableStream.write(buffer, "base64");
    writableStream.on("finish", async () => {
      await mailSender.sendSimpleEmailWithLink(
        user.email,
        title,
        `O relatório ${title} esta pronto!`,
        null,
        tempPath
      );
      fs.unlinkSync(tempPath);
    });
    writableStream.end();
  });
};

const getPartnerComissionConsumptionrDataToReportByPeriod = async (
  month,
  year,
  prePaid,
  posPaid
) => {
  let result = [];
  let initDate = new Date(year, month - 1, 1);
  let endDate = new Date(year, month, 1);

  let pos = [];
  let pre = [];

  if (posPaid) {
    pos = MInvoice.aggregate([
      {
        $match: {
          createAt: {
            $gte: initDate,
            $lte: endDate,
          },
        },
      },
      {
        $lookup: {
          from: "mbillings",
          localField: "billing",
          foreignField: "_id",
          as: "billing",
        },
      },
      {
        $unwind: "$billing",
      },
      {
        $lookup: {
          from: "musers",
          localField: "billing.user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $lookup: {
          from: "musers",
          localField: "user.hierarchy.partner",
          foreignField: "_id",
          as: "partner",
        },
      },
      {
        $project: {
          _id: "$billing._id",
          billing: "$billing",
          user: "$user",
          partner: {
            $arrayElemAt: ["$partner", 0],
          },
          invoiceStatus: "$status",
          invoiceValue: "$value",
        },
      },
    ])
      .cursor({
        batchSite: 0,
      })
      .exec();

    let results = [],
      pointer = await pos.next();
    while (pointer) {
      results.push(pointer);
      pointer = await pos.next();
    }
    pos = results;
  }

  if (prePaid) {
    pre = MPayment.aggregate([
      {
        $match: {
          paid: true,
          createAt: {
            $gte: initDate,
            $lte: endDate,
          },
        },
      },
      {
        $lookup: {
          from: "mbillings",
          localField: "billing",
          foreignField: "_id",
          as: "billing",
        },
      },
      {
        $match: {
          "billing.billingType": 1,
        },
      },
      {
        $unwind: "$billing",
      },
      {
        $lookup: {
          from: "musers",
          localField: "billing.user",
          foreignField: "_id",
          as: "billing.user",
        },
      },
      {
        $unwind: "$billing.user",
      },
      {
        $lookup: {
          from: "musers",
          localField: "billing.user.hierarchy.partner",
          foreignField: "_id",
          as: "billing.user.hierarchy.partner",
        },
      },
      {
        $group: {
          _id: "$billing",
          purchasesValue: {
            $sum: "$totalPrice",
          },
          purchasesCount: {
            $sum: 1,
          },
        },
      },
      {
        $project: {
          _id: "$_id._id",
          billing: "$_id",
          user: "$_id.user",
          partner: {
            $arrayElemAt: ["$billing.user.hierarchy.partner", 0],
          },
          purchasesValue: 1,
          purchasesCount: 1,
        },
      },
    ])
      .cursor({
        batchSite: 0,
      })
      .exec();

    let results = [],
      pointer = await pre.next();
    while (pointer) {
      results.push(pointer);
      pointer = await pre.next();
    }
    pre = results;
  }

  return pos.concat(pre);
};

const getPartnerConsumptionForecastDataToReport = async (partnerId) => {
  let result = [];
  let date = new Date();
  let refDay = date.getDate();
  let refDate = new Date(date.getFullYear(), date.getMonth(), 1);
  let initDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);

  let pastDayCount = utils.getWorkingDaysCount(
    initDate.getFullYear(),
    initDate.getMonth(),
    1,
    31
  );
  let actualDayCount = utils.getWorkingDaysCount(
    refDate.getFullYear(),
    refDate.getMonth(),
    1,
    refDay
  );
  let forecastDayCount = utils.getWorkingDaysCount(
    refDate.getFullYear(),
    refDate.getMonth(),
    refDay,
    31
  );

  try {
    let users = await userModule.getChildrensPartnerFrom(partnerId);

    if (users) {
      for (let user of users) {
        let consumptionCount = 0;
        let consumptionValue = 0;
        let consumptionHistoryCount = 0;
        let consumptionHistoryValue = 0;
        let consumptionHistoryAverageCount = 0;
        let consumptionHistoryAverageValue = 0;
        let consumptionAverageCount = 0;
        let consumptionAverageValue = 0;
        let consumptionForecastCount = 0;
        let consumptionForecastValue = 0;

        let bill = await MBilling.findOne({
          user: user,
          billingType: 2,
        });

        if (bill) {
          let consumptions = await MConsumptionStatement.find({
            billing: bill,
            status: true,
            createAt: {
              $gte: initDate,
            },
          });

          if (consumptions) {
            let history = _.remove(consumptions, function (o) {
              return o.createAt < refDate;
            });

            for (let c of consumptions) {
              consumptionValue += c.value;
              consumptionCount += 1;
            }

            if (history) {
              for (let h of history) {
                consumptionHistoryValue += h.value;
                consumptionHistoryCount += 1;
              }
              consumptionHistoryAverageCount =
                consumptionHistoryCount / pastDayCount;
              consumptionHistoryAverageValue =
                consumptionHistoryValue / pastDayCount;
            }

            consumptionAverageCount = consumptionCount / actualDayCount;
            consumptionAverageValue = consumptionValue / actualDayCount;
            consumptionForecastCount =
              consumptionAverageCount * forecastDayCount + consumptionCount;
            consumptionForecastValue =
              consumptionAverageValue * forecastDayCount + consumptionValue;

            result.push({
              name: user.name,
              cpf: user.cpf,
              company: user.company,
              generalData: user.generalData,
              fatmin: bill.fatmin,
              lastMonthConsumptionCount: consumptionHistoryCount,
              lastMonthConsumptionValue: consumptionHistoryValue,
              lastMonthConsumptionAverageCount: consumptionHistoryAverageCount,
              lastMonthConsumptionAverageValue: consumptionHistoryAverageValue,
              consumptionCount: consumptionCount,
              consumptionValue: consumptionValue,
              consumptionForecastCount: consumptionForecastCount,
              consumptionForecastValue: consumptionForecastValue,
              consumptionAverageCount: consumptionAverageCount,
              consumptionAverageValue: consumptionAverageValue,
            });
          }
        }
      }
    }
    return result;
  } catch (e) {
    console.log(e);
  }
};

const unblockUser = async (userid) => {
  let response = {
    cod: 200,
    data: false,
  };

  if (userid) {
    let opts = {
      path: "invoices.invoice",
      populate: {
        path: "consumptionStatementLote",
      },
    };

    try {
      let billing = await MBilling.findOne({
        user: userid,
      }).populate(opts);
      billing.activeAccount = true;
      await billing.save();

      let delayedInvoice = _.find(billing.invoices, (data) => {
        return data.invoice.status == InvoiceStatusDict.get(5);
      });

      if (delayedInvoice) {
        for (let consumptionItem of delayedInvoice.invoice
          .consumptionStatementLote) {
          consumptionItem.payday = new Date();
          consumptionItem.status = true;
          await consumptionItem.save();
        }
        delayedInvoice.status = InvoiceStatusDict.get(2);
        await delayedInvoice.save();
      }

      response.data = true;
    } catch (error) { }

    return response;
  }
  response.cod = 405;
  return response;
};

const blockUser = async (userid) => {
  const response = {
    cod: 200,
    error: null,
  };
  try {
    const user = await userModule.getById(userid);
    if (user) {
      await MBilling.updateOne(
        {
          _id: user.billing,
        },
        {
          $set: {
            activeAccount: false,
          },
        }
      );
    } else throw new Error("Invalid user id");
  } catch (error) {
    response.cod = 500;
    response.error = error.message;
  }
  return response;
};

const updateSubscriptions = async (userid, subscriptions) => {
  const response = {
    cod: 200,
    error: null,
  };
  if (userid) {
    try {
      await MBilling.updateMany(
        {
          user: userid,
        },
        {
          $set: {
            subscriptions,
          },
        }
      );
    } catch (error) {
      response.cod = 500;
      response.error = error.message;
    }
  }
  return response;
};

let updatePaymentExpirationDay = async (billingid, expirationDay) => {
  let opts = {
    payment: {
      expirationDay: expirationDay,
    },
  };
  let filter = {
    $or: [
      {
        _id: billingid,
      },
      {
        "billingHierarchy.mothersWallet": billingid,
      },
    ],
  };
  let billingList = await MBilling.find(filter);

  const promises = billingList.map(async (billing) => {
    billing = _.assign(billing, opts);
    billing = await billing.save();

    return billing;
  });
  return Promise.all(promises);
};

async function getPrePaidConsumersReportData(filters, minBuyout, maxBuyout) {
  const pipeline = [
    {
      $match: { $and: filters },
    },
    {
      $lookup: {
        from: "mpayments",
        let: { billingId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$billing", "$$billingId"] },
                  { $eq: ["$paid", true] },
                ],
              },
            },
          },
          {
            $project: {
              billing: 1,
              createAt: 1,
              totalPaid: 1,
            },
          },
          {
            $group: {
              _id: "$billing",
              amount: { $sum: 1 },
              totalPaid: { $sum: "$totalPaid" },
              createAt: { $last: "$createAt" },
            },
          },
        ],
        as: "payments",
      },
    },
    {
      $unwind: {
        path: "$payments",
        preserveNullAndEmptyArrays: true,
      },
    },
  ];

  if (minBuyout !== 0 || maxBuyout !== Number.MAX_SAFE_INTEGER) {
    const paymentFilter =
      minBuyout <= 0
        ? {
          $match: {
            $or: [
              { payments: { $exists: 0 } },
              {
                "payments.amount": {
                  $gte: 0,
                  $lte: maxBuyout,
                },
              },
            ],
          },
        }
        : {
          $match: {
            "payments.amount": {
              $gte: minBuyout,
              $lte: maxBuyout,
            },
          },
        };

    pipeline.push(paymentFilter);
  }

  pipeline.push(
    {
      $lookup: {
        from: "musers",
        let: { billingId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$billing", "$$billingId"],
              },
            },
          },
          {
            $project: {
              name: 1,
              cpf: 1,
              email: 1,
              phone1: "$generalData.phoneNumber1",
              phone2: "$generalData.phoneNumber2",
              userPartner: "$hierarchy.partner",
              creationOrigin: 1,
              lastLogin: 1,
              status: 1,
            },
          },
          {
            $lookup: {
              from: "musers",
              let: { userPartner: "$userPartner" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $eq: ["$_id", "$$userPartner"],
                    },
                  },
                },
                {
                  $project: {
                    partnerEmail: "$email",
                  },
                },
              ],
              as: "userPartner",
            },
          },
          {
            $unwind: {
              path: "$userPartner",
              preserveNullAndEmptyArrays: true,
            },
          },
        ],
        as: "user",
      },
    },
    {
      $unwind: {
        path: "$user",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "mpricetables",
        let: { priceTableId: "$price_table" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$_id", "$$priceTableId"],
              },
            },
          },
          {
            $project: {
              name: 1,
            },
          },
        ],
        as: "priceTable",
      },
    },
    {
      $unwind: {
        path: "$price_table",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        accountFunds: 1,
        activeAccount: 1,
        createAt: 1,
        userId: "$user._id",
        userName: "$user.name",
        userEmail: "$user.email",
        userDocument: "$user.cpf",
        userStatus: "$user.status",
        userPhone1: "$user.phone1",
        userPhone2: "$user.phone2",
        userPartner: "$user.userPartner",
        userOrigin: "$user.creationOrigin",
        priceTable: "$price_table.name",
        payments: 1,
        lastLogin: "$user.lastLogin",
      },
    }
  );

  const report = await MBilling.aggregate(pipeline).exec();
  return report.map((item) => reportItemPrePaidFactory(item));
}

const findById = async (id, projection = {}) =>
  MBilling.findById(id, projection).lean();

const updateOne = async (filter, data) => billingRepository.updateOne(filter, data);

const updateMany = async (filter, data) => billingRepository.updateOne(filter, data);

const distinctChildrenBillingIdsByMotherBilling = async (billingId) =>
  MBilling.distinct("_id", { "billingHierarchy.mothersWallet": billingId });

const validateIfBillingExists = (billing) => {
  if (!billing)
    throw new Error("Invalid billing information or billing not exists");
};

const findUserWithoutContractedPlans = async (userId) => {
  return await MBilling.findOne({ user: userId });
};

const getByIdWithPriceTable = async (billingId) => {
  return billingRepository.getByIdWithPriceTable(billingId);
};

module.exports = {
  getByIdWithPriceTable,
  getById,
  getPrePaidBillingById,
  executePaymentOperation,
  completeExtractConsumption,
  changeUserPriceTable,
  addCreditsToUser,
  addCreditsByUser,
  executeChargebackOperation,
  getCreditsByUser,
  getByUser,
  getByBillingId,
  getByIdInternal,
  getPosPaidBillings,
  closeAllInvoicesPosPaid,
  clientsPostPaidSummeryConsumption,
  getTotalByPriceTable,
  getCreditsToAdd,
  addAccountFunds,
  updateAccountFundsv2,
  addPackagesToBilling,
  updateAccountFunds,
  updateFatmin,
  updateDspac,
  updateInvoiceBillingStatus,
  updateBillingHierarchy,
  getChildsWallets,
  updateFinancialLock,
  updateDeadlineToPay,
  getAllUserDataToReport,
  getPartnerComissionConsumptionrDataToReportByPeriod,
  getPartnerConsumptionForecastDataToReport,
  unblockUser,
  blockUser,
  updateSubscriptions,
  updatePaymentExpirationDay,

  findById,
  updateOne,
  updateMany,
  distinctChildrenBillingIdsByMotherBilling,
  findUserWithoutContractedPlans,
  validators: {
    validateIfBillingExists,
  },
};
