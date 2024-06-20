"use strict";

const {
  default: mailSender,
  MenberStatus,
  OncListMarkintingEnum,
  OncTagsEnum,
} = require("@diegomoura637/mail-sender");

const mk = new mailSender.Markinting({
  apiKey: process.env.MAILSENDER_MK_API_KEY,
  server: process.env.MAILSENDER_MK_SERVER,
});

// * Usuário que comprou uma consulta completa
const regirsterMarketingUser = async ({
  email,
  firstName,
  lastName,
  phoneNumber,
  birthday,
  plate,
  model,
  brand,
  brnadModel,
}) => {
  return await mk.addListMember(OncListMarkintingEnum.COMPLETE_VEHICLE, {
    status: MenberStatus.SUBSCRIBED,
    email: email,
    margeFields: {
      FNAME: firstName,
      LNAME: lastName,
      PHONE: phoneNumber,
      BIRTHDAY: birthday,
      PLATE: plate,
      MODEL: model,
      BRAND: brand,
      M_MODEL: brnadModel,
    },
    tags: [OncTagsEnum.QUERY],
  });
};

// * Usuário que deu a opinião do dono
const registerOwnerReview = async ({
  email,
  firstName,
  lastName,
  plate,
  model,
  brand,
}) => {
  return await mk.addListMember(OncListMarkintingEnum.COMPLETE_VEHICLE, {
    status: MenberStatus.SUBSCRIBED,
    email: email,
    margeFields: {
      FNAME: firstName,
      LNAME: lastName,
      PHONE: "",
      BIRTHDAY: "01/01",
      PLATE: plate,
      MODEL: model,
      BRAND: brand,
      M_MODEL: "",
    },
    tags: [OncTagsEnum.FINISH_OWNER_OPINION],
  });
};

// * O usuário clicou em parcelar debitos
const registerClickOnButtonDebts = async ({
  email,
  firstName,
  lastName,
  plate,
  model,
  brand,
  brandModel,
  phone,
  birthday,
}) => {
  return await mk.addListMember(OncListMarkintingEnum.COMPLETE_VEHICLE, {
    status: MenberStatus.SUBSCRIBED,
    email: email,
    margeFields: {
      FNAME: firstName,
      LNAME: lastName,
      PHONE: phone,
      BIRTHDAY: birthday,
      PLATE: plate,
      MODEL: model,
      BRAND: brand,
      M_MODEL: brandModel,
    },
    tags: [OncTagsEnum.CLICK_ON_PAY_DEBITS],
  });
};

// * Regustra o usuário que tiver debitos e multas
const registerIsHasDabits = async ({
  email,
  firstName,
  lastName,
  phone,
  birthday,
  plate,
  model,
  brandModel,
}) => {
  return await mk.addListMember(OncListMarkintingEnum.COMPLETE_VEHICLE, {
    status: MenberStatus.SUBSCRIBED,
    email: email,
    margeFields: {
      FNAME: firstName,
      LNAME: lastName,
      PHONE: phone,
      BIRTHDAY: birthday,
      PLATE: plate,
      MODEL: model,
      BRAND: brand,
      M_MODEL: brandModel,
    },
    tags: [OncTagsEnum.IF_HAS_DEBITS],
  });
};

// * Registra o usuário que acabou de pagar uma compra
const registerUserToPaid = async ({
  email,
  firstName,
  lastName,
  phone,
  birthday,
  purchase,
}) => {
  return mk.addOrUpdateMember(OncListMarkintingEnum.COMPLETE_VEHICLE, {
    status: MenberStatus.SUBSCRIBED,
    email: email,
    margeFields: {
      FNAME: firstName,
      LNAME: lastName,
      PHONE: phone,
      BIRTHDAY: birthday,
      PURCHASE: purchase,
    },
    tags: [OncTagsEnum.PURCHASE],
  });
};

// * Regirtra o usuário que parcelou os debitos
const registerUserToPaidDebits = async ({
  email,
  firstName,
  lastName,
  phone,
  birthday,
  purchase,
}) => {
  return await mk.addListMember(OncListMarkintingEnum.COMPLETE_VEHICLE, {
    status: MenberStatus.SUBSCRIBED,
    email: email,
    margeFields: {
      FNAME: firstName,
      LNAME: lastName,
      PHONE: phone,
      BIRTHDAY: birthday,
      PURCHASE: purchase,
    },
    tags: [OncTagsEnum.PAY_DEBITS],
  });
};

// * Registra um novo usuário
const registerNewClient = async ({
  email,
  firstName,
  lastName,
  phone,
  birthday,
}) => {
  return mk.addListMember(OncListMarkintingEnum.COMPLETE_VEHICLE, {
    status: MenberStatus.SUBSCRIBED,
    email: email,
    margeFields: {
      FNAME: firstName,
      LNAME: lastName,
      PHONE: phone,
      BIRTHDAY: birthday,
    },
    tags: [OncTagsEnum.NEW_CLIENT],
  });
};

// * Clicou em ir para o pagamento mas ainda não pagou
const registerUserInitPaid = async ({
  email,
  firstName,
  lastName,
  phone,
  birthday,
  pricePay,
  purchase,
}) => {
  if (!purchase) return;
  return mk.addOrUpdateMember(OncListMarkintingEnum.COMPLETE_VEHICLE, {
    status: MenberStatus.SUBSCRIBED,
    email: email,
    margeFields: {
      FNAME: firstName,
      LNAME: lastName,
      PHONE: phone,
      BIRTHDAY: birthday,
      PRICEPAY: pricePay,
      PURCHASE: purchase,
    },
    tags: [OncTagsEnum.INIT_PAID],
  });
};

const registerIndicateAndWin = async ({ email, firstName, lastName, url }) => {
  return mk.addOrUpdateMember(OncListMarkintingEnum.COMPLETE_VEHICLE, {
    status: MenberStatus.SUBSCRIBED,
    email: email,
    margeFields: {
      FNAME: firstName,
      LNAME: lastName,
      URL: url,
    },
    tags: [OncTagsEnum.INDICATE_AMD_WIN],
  });
};

module.exports = {
  registerUserToPaid,
  registerIsHasDabits,
  regirsterMarketingUser,
  registerOwnerReview,
  registerClickOnButtonDebts,
  registerUserToPaidDebits,
  registerNewClient,
  registerUserInitPaid,
  registerIndicateAndWin,
};
