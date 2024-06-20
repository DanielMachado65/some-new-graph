"use strict";

const {
  MUser,
  MPartner,
  MBilling,
  MInvoice,
  MCarRevendor,
} = require("mongoose").models;
const UserCancellationReasonEnum = require("../../../infrastructure/dictionaries/UserCancellationQuizEnum");
const utils = require("../../../infrastructure/utils/utils");
const systemNotificationModule = require("../../notification/systemNotificationModule");
const consumptionStatementModule = require("../../billing/consumption/consumptionStatement.module");
const voucherModule = require("../../voucher/voucherModule");
const userHelper = require("../../../infrastructure/helpers/userHelper");
const s3Service = require("../../../infrastructure/services/aws/s3Service");
const partnerModule = require("../partnerModule");
const mailSender = require("../../mail/mailSender.service");
const paymentGatewayService = require("../../../infrastructure/services/iugu/iugu.service");
const _ = require("lodash");

const authenticationModule = require("../../authentication/authentication.module");
const userTypeEnum = require("../../../infrastructure/enumerators/userType.enum");
const billingEnum = require("../../../infrastructure/enumerators/billing.enum");
const priceTableFacade = require("../../billing/price_table/priceTable.facade");
const userFacade = require("./user.facade");

const { capitalizeAll } = require("../../../infrastructure/utils/utils");

const getAll = async () => {
  return MUser.find({}).lean().select("name email").limit(100);
};

const getById = async function (id) {
  return MUser.findOne({
    _id: id,
  })
    .populate("billing")
    .populate({
      path: "partner",
      populate: {
        path: "rules.queries.queryComposition",
      },
    });
};

const getUserById = async (userId) => {
  try {
    const user = await MUser.findOne({ _id: userId }).lean().exec();

    if (!user) return { error: "INVALID_USER_ERROR" };

    return { result: user };
  } catch (error) {
    const data =
      error instanceof Error
        ? { stack: error.stack, message: error.message }
        : error;
    return { error: "UNKNOWN_USER_ERROR", data: data };
  }
};

const login = async (email, pass) => {
  let user = await authenticationModule.matchUser(email, pass);
  if (!user.error) {
    let userObject = {
      _id: user._id,
      email: user.email,
      name: user.name,
    };
    return {
      token: authenticationModule.generateCommonJWT(user._id),
      user: userObject,
    };
  } else {
    return user;
  }
};

const createInvoiceToNewUser = async (billingId) => {
  const date = new Date();
  const invoice = new MInvoice();
  invoice.billing = billingId;
  invoice.initialDate = new Date(date.getFullYear(), date.getMonth(), 1);
  invoice.expirationDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  invoice.refMonth = invoice.expirationDate.getMonth();
  invoice.refYear = invoice.expirationDate.getFullYear();
  await MInvoice.create(invoice);
  return { invoice: invoice, insertDate: new Date() };
};

const createPartner = async (userid) => {
  let partner = new MPartner();
  partner.user = userid;
  return MPartner.create(partner);
};

const checkUserTypeStrategy = (type) => {
  return {
    isPrePaidClient() {
      return type === userTypeEnum.DEFAULT_CLIENT_TYPE;
    },
    isPosPaidClient() {
      return type === userTypeEnum.POS_PAID_CLIENT_TYPE;
    },
    isPartner() {
      return type === userTypeEnum.PARTNER_CLIENT_TYPE;
    },
    isIntegrator() {
      return type === userTypeEnum.INTEGRATION_CLIENT_TYPE;
    },
    isAdministrator() {
      return type === userTypeEnum.MASTER_USER_TYPE;
    },
    isOperatorUser() {
      return type === userTypeEnum.OPERATOR_ADMIN_USER_TYPE;
    },
    isReSale() {
      return type === userTypeEnum.RESALE_CLIENT_TYPE;
    },
  };
};

const sendEmailToNewUser = async (
  userTypeCheckerStrategy,
  { email, name, createAt, generalData: { phoneNumber1 } }
) => {
  try {
    if (userTypeCheckerStrategy.isPrePaidClient()) {
      await mailSender.sendWellcomeMailToDefaultClient(
        email,
        name.capitalizeCase(name)
      );
      await userFacade.registerNewClient(email, name, createAt, phoneNumber1);
    }
  } catch (e) {
    console.log(e);
  }
};

const createBillingToNewUserAndAssociate = async (user) => {
  const billing = new MBilling();
  billing.user = user._id;
  user.billing = billing._id;
  const defaultPriceTable = await priceTableFacade.retrievePriceTableByUserType(
    user.type
  );
  billing.priceTable = defaultPriceTable._id;
  await MBilling.create(billing);
  const userTypeCheckerStrategy = checkUserTypeStrategy(user.type);
  if (
    userTypeCheckerStrategy.isIntegrator() ||
    userTypeCheckerStrategy.isPosPaidClient()
  ) {
    billing.billingType = billingEnum.POS_PAID;
    const invoice = await createInvoiceToNewUser(billing._id);
    billing.invoices.push(invoice);
  }
  if (userTypeCheckerStrategy.isPartner()) {
    const __partner = await createPartner(user._id);
    user.partner = __partner._id;
  }
  await sendEmailToNewUser(userTypeCheckerStrategy, user);
  await MBilling.updateOne({ _id: billing._id }, billing, { upsert: true });
  await MUser.updateOne({ _id: user._id }, user);
};

function getNotificationDto(user) {
  return {
    type: 1,
    description: `O cliente ${user.name} esta conosco! E-mail: ${user.email}`,
  };
}

async function applyVoucherIfItHave(voucher, user) {
  if (voucher) {
    await voucherModule.validateAndApply(voucher, user._id);
  }
}

async function saveCarRevendorSetting(isCarRevendor, user) {
  try {
    if (typeof isCarRevendor === "boolean") {
      await MCarRevendor.create({ userId: user._id, status: isCarRevendor });
    }
  } catch {
    // skip
  }
}

function createResponseToNewUserUseCase(user) {
  return {
    user: user,
    token: authenticationModule.generateCommonJWT(user._id),
  };
}

async function updatePartnerRelationshipIfHave(partnerIdUser) {
  if (partnerIdUser) {
    try {
      return partnerModule.checkIfIsPartnerIfIsReturnHisId(partnerIdUser);
    } catch (e) {
      console.error(e);
    }
  }
}

const addNewUser = async (params, partnerUserId) => {
  try {
    const { voucher, ...User } = params;
    const { cpf, email, name } = await userFacade.addNewUser(
      User.cpf,
      User.email,
      User.name
    );

    const user = new MUser({ ...params, ...User, email, name, cpf });
    const userId = user._id && user._id.toString();
    await userHelper.userValidationToCreate(user);
    user.hierarchy.parnter = await updatePartnerRelationshipIfHave(
      partnerUserId
    );
    await MUser.create(user);
    await createBillingToNewUserAndAssociate(user);
    await userFacade.createUserConsentBatch(userId, params.consents);
    const notification = getNotificationDto(user);
    await createSystemNotification(notification);
    await applyVoucherIfItHave(voucher, user);
    await saveCarRevendorSetting(params.isCarRevendor, user);
    return createResponseToNewUserUseCase(user);
  } catch (e) {
    return {
      err: e.message,
    };
  }
};
const createSystemNotification = async (notification) => {
  try {
    await systemNotificationModule.createNew(notification);
  } catch (error) {
    console.log("Error to create notification => ");
    console.log(error);
  }
};

const update = async (obj, id) => {
  let user = await MUser.findOne({
    _id: id,
  });
  if (!user) return null;
  else {
    if (obj.pass && obj.newPass) {
      let result = await authenticationModule.matchUser(user.email, obj.pass);
      if (result.error) return result;
      result ? (user.pass = obj.newPass) : true;
    }
    if (obj.email) {
      let checkUserByNewEmail = await MUser.findOne({
        email: obj.email,
      });
      if (!checkUserByNewEmail || checkUserByNewEmail.email === obj.email)
        user.email = obj.email;
      else if (checkUserByNewEmail._id !== id)
        return "Já existe uma conta cadastrada com o e-mail informado.";
    }
    if (obj.cpf) {
      let checkUserByCpf = await MUser.findOne({
        cpf: obj.cpf,
      });
      if (checkUserByCpf == null || checkUserByCpf._id.toString() === id)
        user.cpf = obj.cpf;
      else if (checkUserByCpf._id.toString() !== id)
        return "Já existe uma conta cadastrada para o CPF informado.";
    }

    if (obj.name) {
      user.name = capitalizeAll(obj.name);
    }

    if (obj.generalData && obj.generalData.address) {
      obj.generalData.address.zipcode
        ? (user.generalData.address.zipcode = obj.generalData.address.zipcode)
        : false;
      obj.generalData.address.city
        ? (user.generalData.address.city = obj.generalData.address.city)
        : false;
      obj.generalData.address.state
        ? (user.generalData.address.state = obj.generalData.address.state)
        : false;
      obj.generalData.address.neighborhood
        ? (user.generalData.address.neighborhood =
            obj.generalData.address.neighborhood)
        : false;
      obj.generalData.address.street
        ? (user.generalData.address.street = obj.generalData.address.street)
        : false;
      obj.generalData.address.complement
        ? (user.generalData.address.complement =
            obj.generalData.address.complement)
        : false;
      obj.generalData.address.number
        ? (user.generalData.address.number = obj.generalData.address.number)
        : false;
    }

    if (obj.generalData && obj.generalData.billingOwner) {
      obj.generalData.billingOwner.name
        ? (user.generalData.billingOwner.name =
            obj.generalData.billingOwner.name)
        : false;
      obj.generalData.billingOwner.phoneNumber
        ? (user.generalData.billingOwner.phoneNumber =
            obj.generalData.billingOwner.phoneNumber)
        : false;
      obj.generalData.billingOwner.email
        ? (user.generalData.billingOwner.email =
            obj.generalData.billingOwner.email)
        : false;
    }

    obj.generalData && obj.generalData.phoneNumber1
      ? (user.generalData.phoneNumber1 = obj.generalData.phoneNumber1)
      : false;
    obj.generalData && obj.generalData.phoneNumber2
      ? (user.generalData.phoneNumber2 = obj.generalData.phoneNumber2)
      : false;
    obj.generalData && obj.generalData.birthDate
      ? (user.generalData.birthDate = obj.generalData.birthDate)
      : false;

    if (obj.company) {
      user.company.cnpj = obj.company.cnpj;
      user.company.socialName = obj.company.socialName;
      user.company.fantasyName = obj.company.fantasyName;
      user.company.codigoCnae = obj.company.codigoCnae;
      user.company.stateSubscription = obj.company.stateSubscription;
      user.company.simplesNacional = obj.company.simplesNacional;
      user.company.codigoNaturezaJuridica = obj.company.codigoNaturezaJuridica;
    }

    if (obj.hierarchy) {
      user.hierarchy.partner = obj.hierarchy.partner;
    }

    if (obj.type == 3 && user.type != 3 && !user.partner) {
      let __partner = await createPartner(id);
      user.partner = __partner._id;
    }

    if (
      obj.externalControls &&
      obj.externalControls.iugu &&
      obj.externalControls.iugu.id
    ) {
      let clientId = obj.externalControls.iugu.id;
      try {
        await updateClient(clientId, obj);
      } catch (error) {
        console.log(error);
      }
    }

    await user.save();
    return {
      name: user.name,
      username: user.username,
      email: user.email,
      cpf: user.cpf,
      generalData: user.generalData,
      type: user.type,
      lastLogin: user.lastLogin,
      createAt: user.createAt,
      status: user.status,
      company: user.company,
    };
  }
};

const getByEmail = async (email, projection) => {
  return MUser.findOne(
    {
      email: email,
    },
    projection
  );
};

const getByCpf = async (document) => {
  return MUser.findOne({
    cpf: document,
  });
};

let getTotalPrePaid = async () => {
  return MUser.countDocuments({
    type: 1,
  });
};

let getTotalPosPaid = async () => {
  return await MUser.countDocuments({
    type: 5,
  });
};

let getTotalPartners = async () => {
  return MUser.countDocuments({
    type: 3,
  });
};

const getAllPrePaid = async () => {
  const LIMIT_SEARCH = 500;
  const users = await MUser.find({
    type: 1,
  })
    .populate("billing")
    .limit(LIMIT_SEARCH)
    .lean();
  return sanitizeDate(users);
};

const getAllPosPaid = async () => {
  let opts = {
    path: "billing",
    populate: {
      path: "invoices.invoice",
      populate: {
        path: "payment",
      },
      sort: {
        createAt: -1,
      },
    },
  };
  let users = await MUser.find({
    type: 5,
  })
    .populate("hierarchy.owner")
    .populate(opts)
    .lean()
    .exec();

  _.forEach(users, (user) => {
    user.lastLogin = utils.getBrazilianDateFormat(user.lastLogin);
    user.createAt = utils.getBrazilianDateFormat(user.createAt);
  });
  return users;
};

const getPartnerAndChildrensFrom = async (userId, projection) => {
  return await MUser.find(
    {
      $or: [{ _id: userId }, { "hierarchy.partner": userId }],
    },
    projection
  )
    .lean()
    .exec();
};

const getAllPartners = async () => {
  const users = await MUser.find({
    type: 3,
  })
    .lean()
    .populate({
      path: "partner",
      populate: {
        path: "rules.queries.queryComposition",
      },
    })
    .populate("billing");
  return sanitizeDate(users);
};

const getAllIntegrators = async () => {
  const integrators = await MUser.find({
    type: 2,
  })
    .populate({
      path: "billing",
      populate: {
        path: "invoices",
        sort: {
          createAt: -1,
        },
      },
    })
    .lean();
  return sanitizeDate(integrators);
};

const disableUser = async (userid) => {
  if (userid) {
    let users = await MUser.find({
      $or: [
        {
          _id: userid,
        },
        {
          "hierarchy.owner": userid,
        },
      ],
    });
    for (let user of users) {
      user.status = false;
      await user.save();
      if (
        (user.cancellationQuiz && !user.cancellationQuiz.debtorClient) ||
        !user.cancellationQuiz
      )
        mailSender.sendMailCanceledUser(user.name, user.email);
    }
    return true;
  }
  return false;
};

const setCancellationReason = async (
  userId,
  reason,
  anotherReason,
  message,
  isDebtor
) => {
  if (reason && UserCancellationReasonEnum(reason)) {
    let users = await MUser.find({
      $or: [
        {
          _id: userId,
        },
        {
          "hierarchy.owner": userId,
        },
      ],
    });

    for (let user of users) {
      user.cancellationQuiz.reason = UserCancellationReasonEnum(reason);
      user.cancellationQuiz.anotherReason = anotherReason
        ? anotherReason
        : null;
      user.cancellationQuiz.message = message ? message : null;
      user.cancellationQuiz.createAt = new Date();
      user.cancellationQuiz.debtorClient = isDebtor;
      await user.save();
    }
    return true;
  }
  return false;
};

const enableUser = async (userid) => {
  if (userid) {
    let users = await MUser.find({
      $or: [
        {
          _id: userid,
        },
        {
          "hierarchy.owner": userid,
        },
      ],
    });
    for (let user of users) {
      user.status = true;
      user.cancellationQuiz.reason = null;
      user.cancellationQuiz.anotherReason = null;
      user.cancellationQuiz.message = null;
      user.cancellationQuiz.createAt = null;

      await user.save();
    }
    return true;
  }
  return false;
};

const changeUserType = async (userid, data) => {
  let user = await MUser.findById(userid);
  if (user) {
    if (data.id === 3 && user.type !== 3) {
      if (!user.partner) {
        let __partner = await createPartner(userid);
        user.partner = __partner._id;
      }
    } else if (data.id !== 3) {
      if (user.partner) {
        user.partner = null;
        delete user["partner"];
        await MPartner.deleteOne({
          user: user._id,
        });
      }
    }
    user.type = data.id;
    await user.save();

    if (data.id === 2 || data.id === 5) {
      await MBilling.updateOne(
        {
          user: user._id,
        },
        {
          $set: {
            billingType: 2,
            fatmin: data.fatmin ? data.fatmin : 0,
            dspac: data.dspac ? data.dspac : 0,
            accountFunds: data.block ? data.block : 0,
            "financialLock.value": data.financialLock ? data.financialLock : 0,
          },
        }
      );
    } else {
      await MBilling.updateOne(
        {
          user: user._id,
        },
        {
          $set: {
            billingType: 1,
            fatmin: 0,
            dspac: 0,
            accountFunds: 0,
          },
        }
      );
    }
    return true;
  }
  return false;
};

const getAllAdms = async () => {
  const admins = await MUser.find({
    type: 10,
  })
    .lean()
    .populate({
      path: "billing",
      populate: {
        path: "invoices.invoice",
        sort: {
          createAt: -1,
        },
      },
    });
  return sanitizeDate(admins);
};

const getAllPrePaidPartnerChildren = async (partnerId) => {
  const users = await MUser.find({
    $and: [
      {
        type: 1,
      },
      {
        "hierarchy.partner": partnerId,
      },
    ],
  })
    .populate("billing")
    .lean();
  return sanitizeDate(users);
};

function sanitizeDate(users) {
  return users.map((user) => {
    user.lastLogin = utils.getBrazilianDateFormat(user.lastLogin);
    user.createAt = utils.getBrazilianDateFormat(user.createAt);
    delete user.pass;
    return user;
  });
}

const getAllPosPaidPartnerChildren = async (partnerId) => {
  const users = await MUser.find({
    $and: [
      {
        type: 5,
      },
      {
        "hierarchy.partner": partnerId,
      },
    ],
  })
    .populate("hierarchy.owner")
    .populate({
      path: "billing",
      populate: {
        path: "invoices.invoice",
        populate: {
          path: "payment",
        },
        sort: {
          createAt: -1,
        },
      },
    })
    .lean()
    .exec();
  return sanitizeDate(users);
};

const getAllIntegratorsPartnerChildren = async (partnerId) => {
  const users = await MUser.find({
    $and: [
      {
        type: 2,
      },
      {
        "hierarchy.partner": partnerId,
      },
    ],
  })
    .populate("hierarchy.owner")
    .populate({
      path: "billing",
      populate: [
        {
          path: "invoices.invoice",
          populate: {
            path: "payment",
          },
          sort: {
            createAt: -1,
          },
        },
      ],
    })
    .lean();
  return sanitizeDate(users);
};

const uploadDocuments = async (userid, documents) => {
  let response = {
    cod: 200,
    error: null,
    data: null,
  };
  let user = await MUser.findById(userid);
  if (user) {
    try {
      let folder = await s3Service.getObject(null, `${user.email}/`);
      if (!folder) await s3Service.createFolderOnBucket(null, user.email); //await s3Service.emptyFolderOnBucket(null,user.email);
      user.documents = [];
      let baseUrlBucketUsers =
        "https://s3-sa-east-1.amazonaws.com/olhonocarro.users/";
      for (const doc of documents) {
        if (!doc.link) {
          let obj = {
            contentType: doc.filetype,
            base64: doc.base64,
            key: doc.filename,
          };
          await s3Service.putObject(`olhonocarro.users/${user.email}`, obj);
          user.documents.push({
            name: doc.filename,
            link: `${baseUrlBucketUsers}${user.email}/${doc.filename}`,
          });
        } else
          user.documents.push({
            name: doc.name,
            link: doc.link,
          });
      }
      response.data = "ok";
      delete response.error;
    } catch (error) {
      response.cod = 410;
      response.error = "Não foi posível realizar o upload do(s) arquivo(s)";
      delete response.data;
    } finally {
      await user.save();
    }
  } else {
    response.cod = 404;
    response.error = "Usuário não encontrado.";
  }
  return response;
};

const uploadPicture = async (userid, picture) => {
  let response = {
    cod: 200,
    error: null,
    data: null,
  };
  let user = await MUser.findById(userid);
  if (user) {
    try {
      let folder = await s3Service.getObject(null, `${user.email}/`);
      if (!folder) await s3Service.createFolderOnBucket(null, user.email); //await s3Service.emptyFolderOnBucket(null,user.email);
      user.documents = [];
      let baseUrlBucketUsers =
        "https://s3-sa-east-1.amazonaws.com/olhonocarro.users/";

      let extension = picture.filename.split(".");
      extension = _.last(extension);

      let obj = {
        contentType: picture.filetype,
        base64: picture.base64,
        key: `${userid}.${extension}`,
      };
      await s3Service.putObject(`olhonocarro.users/${user.email}`, obj);
      user.picture = `${baseUrlBucketUsers}${user.email}/${userid}.${extension}`;

      response.data = "ok";
      delete response.error;
    } catch (error) {
      response.cod = 410;
      response.error = "Não foi posível realizar o upload do(s) arquivo(s)";
      delete response.data;
    } finally {
      await user.save();
    }
  } else {
    response.cod = 404;
    response.error = "Usuário não encontrado.";
  }
  return response;
};

const deletePicture = async (userid, picture) => {
  let response = {
    cod: 200,
    error: null,
    data: null,
  };
  let user = await MUser.findById(userid);
  if (user) {
    try {
      let baseToSplit = `https://s3-sa-east-1.amazonaws.com/checktudo.users/${user.email}/`;
      let obj = picture.pictureUrl.split(baseToSplit)[1];
      await s3Service.deleteObject(`checktudo.users/${user.email}`, obj);
      user.picture = null;

      response.data = "ok";
      delete response.error;
    } catch (error) {
      response.cod = 410;
      response.error = "Não foi posível realizar a exclusão do(s) arquivo(s)";
      delete response.data;
    } finally {
      await user.save();
    }
  } else {
    response.cod = 404;
    response.error = "Usuário não encontrado.";
  }
  return response;
};

const getLeanParentSiblingsChildrensUsers = async (userid, lookup) => {
  let users;
  let user = await MUser.findOne({
    _id: userid,
  }).lean();

  if (user.hierarchy && user.hierarchy.owner) {
    if (lookup) {
      users = await MUser.find({
        $or: [
          {
            _id: user.hierarchy.owner,
          },
          {
            "hierarchy.owner": user.hierarchy.owner,
          },
        ],
      }).lean();
    } else {
      users = await MUser.find({
        "hierarchy.owner": user.hierarchy.owner,
      }).lean();
    }
  } else {
    users = await MUser.find({
      "hierarchy.owner": userid,
    }).lean();
    users.push(user);
  }
  return users;
};

const getChildrensFrom = async (userid) => {
  return await MUser.find({
    "hierarchy.owner": userid,
  });
};

const getChildrensPartnerFrom = async (userid) => {
  return await MUser.find({
    "hierarchy.partner": userid,
  });
};

const isFather = async (userid) => {
  return await MUser.countDocuments({
    "hierarchy.owner": userid,
  });
};

const agreeTermsAndConditions = async (userid, termid) => {
  let filter = {
    _id: userid,
  };
  let query = {
    "conditions.term": termid,
    "conditions.date": new Date(),
    "conditions.agree": true,
  };
  return await userFacade.updateOne(filter, query, {
    multi: false,
  });
};

const checkPhoneNumber = async (telefone) => {
  const filter = {
    $or: [
      {
        "generalData.phoneNumber1": telefone,
      },
      {
        "generalData.phoneNumber2": telefone,
      },
    ],
  };
  return MUser.find(filter).lean();
};

const generatePartnerReportDataRepass = async (
  partnersIds,
  initDate,
  endDate
) => {
  let response = {
    partners: [],
  };

  let opts = {
    path: "partner",
    populate: {
      path: "rules.queries.queryComposition",
    },
  };

  let startDate = new Date(initDate);
  let finalDate = new Date(endDate);

  let users = await MUser.find({
    _id: {
      $in: partnersIds,
    },
  })
    .populate(opts)
    .populate("billing");

  if (users.length > 0) {
    for (let user of users) {
      let obj = {
        partner: null,
        repass: {
          fixed_cost: null,
          percentage: null,
        },
      };
      obj.partner = JSON.parse(JSON.stringify(user));
      let partnerChildrens = await getChildrensPartnerFrom(user._id);

      let arrayBillingsChildrens = _.map(partnerChildrens, (c) => {
        return c.billing;
      });
      let filter = {
        $and: [
          {
            billing: {
              $in: arrayBillingsChildrens,
            },
          },
          {
            status: true,
          },
          {
            payday: {
              $ne: null,
            },
          },
          {
            createAt: {
              $gte: startDate,
            },
          },
          {
            createAt: {
              $lte: finalDate,
            },
          },
        ],
      };
      let consumptionItens = await consumptionStatementModule.find(filter);
      if (user.partner && user.partner.partnerType === "fixed_cost") {
        delete obj.repass.percentage;
        obj.repass.fixed_cost = _.sumBy(consumptionItens, (c) => {
          return c.commission.value;
        });
      } else if (user.partner) {
        delete obj.repass.fixed_cost;
        obj.repass.percentage = _.sumBy(consumptionItens, (c) => {
          return c.commission.value;
        });
      }
      response.partners.push(obj);
    }
  }
  return response;
};

const getLasts = async (limit, type) => {
  limit = parseInt(limit);
  limit = limit <= 1000 ? limit : 1000;

  let params = {};

  if (type === 1 || type === 5) {
    params.type = parseInt(type);
  } else {
    params = {
      $or: [
        {
          type: 1,
        },
        {
          type: 5,
        },
      ],
    };
  }

  return await MUser.find(params)
    .sort({
      createAt: -1,
    })
    .limit(limit)
    .lean()
    .exec();
};

const search = async (
  name,
  email,
  document,
  _id,
  socialName,
  mEmail,
  type,
  lastLogin
) => {
  const LIMIT_SEARCH = 500;

  let filter = {
    $and: [
      {
        _id,
      },
    ],
  };

  if (name || email || document || lastLogin) {
    filter = {
      $and: [
        {
          type: type,
        },
      ],
    };

    if (document)
      filter.$and.push({
        $or: [
          {
            cpf: {
              $regex: new RegExp(`.*${document}.*`),
            },
          },
          {
            "company.cnpj": {
              $regex: new RegExp(`.*${document}.*`),
            },
          },
        ],
      });

    if (email)
      filter.$and.push({
        email: {
          $regex: new RegExp(`.*${email}.*`),
        },
      });

    if (name) {
      let _rgx = new RegExp(`.*${name}.*`, "i");
      filter.$and.push({
        name: {
          $regex: _rgx,
        },
      });
    }

    if (lastLogin) {
      let date = new Date(lastLogin);
      const initialDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        0,
        0,
        1,
        1
      );
      const endDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        23,
        59,
        59,
        59
      );
      filter.$and.push({
        lastLogin: {
          $gte: initialDate,
          $lte: endDate,
        },
      });
    }
  }
  const users = await MUser.find(filter)
    .lean()
    .populate("billing")
    .limit(LIMIT_SEARCH);
  return sanitizeDate(users);
};

const generateBreakdownRepassReport = async (partnerId, dt) => {
  let responseObject = [];
  let filter = {
    $and: [
      {
        "hierarchy.partner": partnerId,
      },
      {
        status: true,
      },
      {
        $or: [
          {
            type: 5,
          },
          {
            type: 2,
          },
        ],
      },
    ],
  };

  let opts = {
    path: "billing",
    populate: {
      path: "invoices.invoice",
      populate: {
        path: "consumptionStatementLote",
      },
      match: {
        initialDate: {
          $lt: dt,
        },
        expirationDate: {
          $gt: dt,
        },
      },
    },
  };

  let posPaidPartnersChild = await MUser.find(filter).populate(opts);
  if (posPaidPartnersChild && posPaidPartnersChild.length > 0) {
    posPaidPartnersChild.forEach((child) => {
      let invoice = child.billing.invoices.find((obj) => {
        return !!obj.invoice;
      });
      if (invoice) {
        let repassValue = _.sumBy(invoice.consumptionStatementLote, (o) => {
          return o.commission.value;
        });
        let element = {
          email: child.email,
          name:
            child.company && child.company.socialName
              ? child.company.socialName
              : child.name,
          document:
            child.company && child.company.cnpj ? child.company.cnpj : null,
          createAt: child.createAt,
          repassValue: repassValue ? repassValue : 0,
          type: "PJ",

          invoiceStartDate: invoice.initialDate,
          invoiceEndDate: invoice.expirationDate,
          invoiceValue: invoice.value ? invoice.value : 0,

          query: String(),
          cost: String(),
          queryDate: String(),
        };
        responseObject.push(element);
      }
    });
  }

  let usersPrePaid = await MUser.find({
    $and: [
      {
        "hierarchy.partner": partnerId,
      },
      {
        status: true,
      },
      {
        type: 1,
      },
    ],
  }).select({
    billing: 1,
    email: 1,
    createAt: 1,
    cpf: 1,
    name: 1,
  });

  if (usersPrePaid && usersPrePaid.length > 0) {
    let arrayBillings = _.map(usersPrePaid, (u) => {
      return u.billing;
    });
    dt = new Date(dt);
    let initDate = new Date(dt.getFullYear(), dt.getMonth(), 1, 0, 0, 0, 0);
    let endDate = new Date(
      dt.getFullYear(),
      dt.getMonth() + 1,
      0,
      23,
      59,
      59,
      999
    );
    let consumptionItens = await consumptionStatementModule.getByArrayBilling(
      arrayBillings,
      initDate,
      endDate
    );

    if (consumptionItens) {
      usersPrePaid.forEach((user) => {
        const consumptionsUser = consumptionItens.filter((c) => {
          return c.billing.toString() === user.billing.toString();
        });
        consumptionsUser.forEach((c) => {
          let obj = {
            email: user.email,
            name: user.name,
            document: user.cpf,
            createAt: user.createAt,
            repassValue: c.commission.value,
            type: "PF",

            query: c.query.refClass,
            cost: c.value,
            queryDate: c.query.createAt,

            invoiceStartDate: String(),
            invoiceEndDate: String(),
            invoiceValue: String(),
          };
          responseObject.push(obj);
        });
      });
    }
  }

  return responseObject;
};

const updatePasswordById = async (id, password) => {
  let user = await MUser.findOne({
    _id: id,
  });
  if (user) {
    user.pass = password;
    await user.save();
  }
  return user;
};
const findByEmail = async (email) => {
  return MUser.findOne({ email });
};
const emailAreRegistered = async (email) => {
  const user = await findByEmail(email);
  return !!user;
};

const updateExternalControls = async (userId, clientId) => {
  let response = null;
  try {
    response = await userFacade.updateOne(
      { _id: userId },
      { externalControls: { iugu: { id: clientId } } }
    );
  } catch (error) {
    response = error.message;
  }
  return response;
};

const updateClient = async (clientId, user) => {
  const clientData = await clientIuguDataFactory(user);
  try {
    await paymentGatewayService.updateClient(clientId, clientData);
  } catch (error) {
    return false;
  }
  return true;
};

const clientIuguDataFactory = async (user) => {
  let cc_emails =
    process.env.NODE_ENV === "production"
      ? `${
          user.generalData.billingOwner.email
            ? user.generalData.billingOwner.email + ","
            : ""
        }contato@olhonocarro.com.br`
      : null;
  return {
    email: user.email,
    name: (user.company && user.company.socialName) || user.name,
    cpf_cnpj: (user.company && user.company.cnpj) || user.cpf,
    cc_emails,
    zip_code: user.generalData.address.zipcode,
    number: user.generalData.address.number,
    street: user.generalData.address.street,
    city: user.generalData.address.city,
    state: user.generalData.address.state,
    district: user.generalData.address.neighborhood,
    complement: user.generalData.address.complement,
    custom_variables: [
      {
        name: "internalId",
        value: user._id.toString(),
      },
    ],
  };
};

const findRelatedUsersByIdAndHierarchyOwner = async (_id, projection) => {
  return MUser.find(
    {
      $or: [{ _id }, { "hierarchy.owner": _id }],
    },
    projection
  ).lean();
};

const updatePhoneNumberById = async (userId, phoneNumber1) => {
  const match = { _id: userId };
  const queryToUpdate = { "generalData.phoneNumber1": phoneNumber1 };
  let response = null;
  try {
    response = await MUser.updateOne(match, queryToUpdate);
  } catch (error) {
    console.log(error);
    return response;
  }
  return response;
};

const findOneLean = async (filter, projection = {}, population = {}) => {
  return MUser.findOne(filter, projection).lean().populate(population);
};

const addAfterSalesInformation = async (userId, operator, message) => {
  const infoObj = {
    date: new Date(),
    operator,
    message,
  };

  let user = await MUser.findById(userId);
  if (user) {
    if (!user.afterSales)
      user.afterSales = {
        infos: [],
      };
    user.afterSales.infos.push(infoObj);

    await user.save();

    return user.afterSales.infos;
  } else {
    return null;
  }
};

const getAfterSalesInformations = async (userId) => {
  let user = await MUser.findOne(
    {
      _id: userId,
    },
    {
      afterSales: 1,
    }
  )
    .populate([
      {
        path: "afterSales.infos.operator",
        select: "email",
      },
    ])
    .lean();

  if (user && user.afterSales) return user.afterSales.infos;
  else if (user) return [];
  return false;
};

const deleteAfterSalesInformation = async (userId, commentId) => {
  let user = await MUser.findById(userId);

  if (user && user.afterSales && user.afterSales.infos) {
    user.afterSales.infos = user.afterSales.infos.filter(
      (comment) => comment._id.toString() !== commentId
    );

    await user.save();

    return user.afterSales.infos;
  }

  return false;
};

const editAfterSalesInformation = async (userId, commentId, data) => {
  let user = await MUser.findById(userId);
  let operator = await MUser.findById(data.operator).lean();

  if (user && operator) {
    if (user.afterSales && user.afterSales.infos) {
      user.afterSales.infos.forEach((element) => {
        if (element._id.toString() === commentId) {
          element.message = data.message;
          element.operator = data.operator;
          element.date = new Date();
        }
      });
    }

    await user.save();

    return user.afterSales.infos;
  } else {
    return null;
  }
};

const newContact = async (contact) => {
  return mailSender.sendNewContactMail({
    name: contact.name,
    email: contact.email,
    phone: contact.phone || "Não Informado",
    message: contact.message,
  });
};

module.exports = {
  getAll,
  getById,
  getUserById,
  emailAreRegistered,
  findByEmail,
  getByEmail,
  getByCpf,
  addNewUser,
  login,
  update,
  getAllPrePaid,
  getAllPosPaid,
  getTotalPrePaid,
  getTotalPosPaid,
  getAllIntegrators,
  disableUser,
  setCancellationReason,
  enableUser,
  changeUserType,
  getAllAdms,
  getTotalPartners,
  getPartnerAndChildrensFrom,
  getAllPartners,
  getAllPrePaidPartnerChildren,
  getAllPosPaidPartnerChildren,
  getAllIntegratorsPartnerChildren,
  uploadDocuments,
  getChildrensFrom,
  isFather,
  getLeanParentSiblingsChildrensUsers,
  getChildrensPartnerFrom,
  agreeTermsAndConditions,
  generatePartnerReportDataRepass,
  getLasts,
  search,
  uploadPicture,
  deletePicture,
  generateBreakdownRepassReport,
  updatePasswordById,
  checkPhoneNumber,
  updateExternalControls,
  findRelatedUsersByIdAndHierarchyOwner,
  updatePhoneNumberById,
  findOneLean,
  addAfterSalesInformation,
  getAfterSalesInformations,
  deleteAfterSalesInformation,
  editAfterSalesInformation,
  newContact,
};
