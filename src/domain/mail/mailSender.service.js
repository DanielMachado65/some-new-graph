"use strict";

const {
  OncTemplateEnum,
  default: mailSender,
} = require("@diegomoura637/mail-sender");

const mailModule = require("./mail.module");

const tr = new mailSender.Transactional({
  fromEmail: "noreply@olhonocarro.com.br",
  token: process.env.MAILSENDER_TR_KEY,
});

function prepareDeregisterEndpointWithEmailToSuppress(email) {
  const DEREGISTER_ENDPOINT =
    "https://api.olhonocarro.com.br/api/mailer/suppress";
  return DEREGISTER_ENDPOINT + "/" + email;
}

// * Novo cliente - Bem Vindo
const sendWellcomeMailToDefaultClient = async (to, username) => {
  const subject = `☝Caro(a) cliente ${username}, Seja Bem-Vindo(a)! #Olhonocarro ☝`;
  const response = await tr.sendTemplate({
    templateName: OncTemplateEnum.NEW_CLIENT,
    margeVars: [
      {
        name: "USERNAME",
        content: username,
      },
    ],
    subject: subject,
    text: "",
    to: [
      {
        email: to,
        type: "to",
      },
    ],
  });

  return response;
};

// * Recuperação de senha
const sendRecoveryPasswordMail = async (to, username, redirectLink) => {
  const subject = `🔑🔒 Olá ${username}! Siga com a recuperação de senha - #Olhonocarro`;
  const response = await tr.sendTemplate({
    templateName: OncTemplateEnum.RECOVERY_PASSWORD,
    margeVars: [
      {
        name: "USERNAME",
        content: username,
      },
      {
        name: "LINK",
        content: redirectLink,
      },
    ],
    subject: subject,
    text: "",
    to: [
      {
        email: to,
        type: "to",
      },
    ],
  });

  return response;
};

// * Novo contato recebido
const sendNewContactMail = async ({ name, email, phone, message }) => {
  const subject = `🔑🔒Olho no Carro - Contato através do Site`;
  const response = await tr.sendTemplate({
    templateName: OncTemplateEnum.SEND_CONTACT_TEMPLATE_EMAIL,
    margeVars: [
      {
        name: "NAME",
        content: name,
      },
      {
        name: "EMAIL",
        content: email,
      },
      {
        name: "PHONE",
        content: phone,
      },
      {
        name: "MESSAGE",
        content: message,
      },
    ],
    subject: subject,
    text: "",
    to: [
      {
        email: "contato@olhonocarro.com.br",
        type: "to",
      },
      {
        email: "comercial@olhonocarro.com.br",
        type: "to",
      },
    ],
  });

  return response;
};

// * Pagamento recebido
const sendCredistReceivedMail = async (to, username, credits) => {
  const subject = `☝Parabéns ${username}! Seus créditos foram adicionados com sucesso! #OlhoNoCarro ☝`;
  const response = await tr.sendTemplate({
    templateName: OncTemplateEnum.PAYMENT_RECEIVED,
    margeVars: [
      {
        name: "USERNAME",
        content: username,
      },
      {
        name: "VALUE",
        content: credits,
      },
    ],
    subject: subject,
    text: "",
    to: [
      {
        email: to,
        type: "to",
      },
    ],
  });

  return response;
};

// * Pagamento recusado
const sendMailToOrderDeclinedByCreditCard = async (name, to) => {
  const subject = `${name}, seu pagamento foi negado... 😫 #OlhoNoCarro`;
  const response = await tr.sendTemplate({
    templateName: OncTemplateEnum.PAYMENT_DECLINED,
    margeVars: [
      {
        name: "USERNAME",
        content: name,
      },
    ],
    subject: subject,
    text: "",
    to: [
      {
        email: to,
        type: "to",
      },
    ],
  });

  return response;
};

// * Boleto disponivel para pagamento
const sendMailToOrderDeclinedByBanking = async (username, link, to) => {
  const subject = `${username}, seu pagamento não foi identificado... 😫 #OlhoNoCarro`;
  const response = await tr.sendTemplate({
    templateName: OncTemplateEnum.BANK_BILLET_NOT_PAYED,
    margeVars: [
      {
        name: "USERNAME",
        content: username,
      },
      {
        name: "LINK",
        content: link,
      },
    ],
    subject: subject,
    text: "",
    to: [
      {
        email: to,
        type: "to",
      },
    ],
  });

  return response;
};

// * Boleto disponivel para pagamento
const sendMailEnableBankingBillet = async (username, link, to) => {
  const subject = `${username}, seu boleto está disponível para pagamento! 😄 #OlhoNoCarro`;
  const response = await tr.sendTemplate({
    templateName: OncTemplateEnum.BANK_BILLET_NOT_PAYED,
    margeVars: [
      {
        name: "USERNAME",
        content: username,
      },
      {
        name: "LINK",
        content: link,
      },
    ],
    subject: subject,
    text: "",
    to: [
      {
        email: to,
        type: "to",
      },
    ],
  });

  return response;
};

// * Cliente cancelado por nós
const sendMailCanceledUser = async (username, to) => {
  const subject = `${username}, sua conta foi cancelada... 😫 #OlhoNoCarro`;
  const response = await tr.sendTemplate({
    templateName: OncTemplateEnum.CLIENT_WAS_CANCELED_BY_US,
    margeVars: [
      {
        name: "USERNAME",
        content: username,
      },
    ],
    subject: subject,
    text: "",
    to: [
      {
        email: to,
        type: "to",
      },
    ],
  });

  return response;
};

// * Assinatura aprovada
const sendSubscriptionApprovedMail = async (
  to,
  username,
  planName,
  credits,
  planType
) => {
  const subject = `☝Parabéns ${username}! Sua Assinatura Foi Ativada com Sucesso! #OlhoNoCarro ☝`;
  const response = await tr.sendTemplate({
    templateName: OncTemplateEnum.SIGNATURE_APPROVED,
    margeVars: [
      {
        name: "USERNAME",
        content: username,
      },
      {
        name: "PLAN_NAME",
        content: planName,
      },
      {
        name: "TEXT_MONITORING",
        content: planType,
      },
      {
        name: "VALUE",
        content: credits,
      },
    ],
    subject: subject,
    text: "",
    to: [
      {
        email: to,
        type: "to",
      },
    ],
  });

  return response;
};

// * Assinatura suspensa
const sendSubscriptionSuspendedMail = async (to, username, planName) => {
  const subject = `☝${username}, Sua Assinatura Foi Suspensa! #OlhoNoCarro`;
  const redirectEmails = [
    {
      email: "thiago.silva@olhonocarro.com.br",
      type: "cc",
    },
    {
      email: "ariel.alcantara@olhonocarro.com.br",
      type: "cc",
    },
    {
      email: "anna.santos@olhonocarro.com.br",
      type: "cc",
    },
    {
      email: "igor.alcantara@olhonocarro.com.br",
      type: "cc",
    },
  ];
  const response = await tr.sendTemplate({
    templateName: OncTemplateEnum.SIGNATURE_SUSPENDED,
    margeVars: [
      {
        name: "USERNAME",
        content: username,
      },
      {
        name: "PLAN_NAME",
        content: planName,
      },
    ],
    subject: subject,
    text: "",
    to: [
      {
        email: to,
        type: "to",
      },
      ...redirectEmails,
    ],
  });

  return response;
};

// * Assinatura em analize
const sendSubscriptionAnalysingMail = async (to, username) => {
  const subject = `☝${username}, o da Sua Assinatura Está em Análise! 😄 #OlhoNoCarro `;
  const response = await tr.sendTemplate({
    templateName: OncTemplateEnum.SIGNATURE_ANALYSING,
    margeVars: [
      {
        name: "USERNAME",
        content: username,
      },
    ],
    subject: subject,
    text: "",
    to: [
      {
        email: to,
        type: "to",
      },
    ],
  });

  return response;
};

// * Quiz 1
const sendFirstEmailQuiz = async (to, coupon, quizAnswer, pricesQuery) => {
  const response = await tr.sendTemplate({
    templateName: OncTemplateEnum.EMAIL_QUIZ_FIRST,
    margeVars: [
      {
        name: "DEREGISTER_ENDPOINT",
        content: prepareDeregisterEndpointWithEmailToSuppress(to),
      },
      {
        name: "EMAIL",
        content: to,
      },
      {
        name: "NOME_CUPOM",
        content: coupon.name,
      },
      {
        name: "COUPON_UTM_CAMPAIGN",
        content: coupon.utm_compaign,
      },
      {
        name: "PORCENTAGEM_DESCONTO",
        content: coupon.discountPercentage,
      },
      {
        name: "PORCENTAGEM_ACERTOS",
        content: coupon.name,
      },
      {
        name: "TOTAL_ACERTOS",
        content: quizAnswer.hitsNumber,
      },
      {
        name: "TOTAL_QUESTOES",
        content: quizAnswer.totalQuestions,
      },
      {
        name: "PRECO_LEILAO",
        content: pricesQuery.priceLeilao,
      },
      {
        name: "PRECO_VEICULO_BASICO",
        content: pricesQuery.priceVeiculoBasico,
      },
      {
        name: "PRECO_VEICULO_COMPLETA",
        content: pricesQuery.priceVeiculoCompleto,
      },
    ],
    subject: subject,
    text: "",
    to: [
      {
        email: to,
        type: "to",
      },
    ],
  });

  return response;
};

// * Quiz 2
const sendSecondEmailQuiz = async (to, coupon, pricesQuery) => {
  const subject = `QUIZ - Olho no Carro`;
  const response = await tr.sendTemplate({
    templateName: OncTemplateEnum.EMAIL_QUIZ_FIRST,
    margeVars: [
      {
        name: "DEREGISTER_ENDPOINT",
        content: prepareDeregisterEndpointWithEmailToSuppress(to),
      },
      {
        name: "EMAIL",
        content: to,
      },
      {
        name: "NOME_CUPOM",
        content: coupon.name,
      },
      {
        name: "COUPON_UTM_CAMPAIGN",
        content: coupon.utm_compaign,
      },
      {
        name: "PRECO_LEILAO",
        content: pricesQuery.priceLeilao,
      },
      {
        name: "PRECO_VEICULO_BASICO",
        content: pricesQuery.priceVeiculoBasico,
      },
      {
        name: "PRECO_VEICULO_COMPLETA",
        content: pricesQuery.priceVeiculoCompleto,
      },
    ],
    subject: subject,
    text: "",
    to: [
      {
        email: to,
        type: "to",
      },
    ],
  });

  return response;
};

// * Pagamento por pix
const sendBillingEmailByPix = async (email, username, qrCode, qrCodeText) => {
  const subject = "Pague com o Pix e realize sua consulta - Olho no Carro";
  const response = await tr.sendTemplate({
    templateName: OncTemplateEnum.BILLING_BY_PIX,
    margeVars: [
      {
        name: "USERNAME",
        content: username,
      },
      {
        name: "IMG_LINK_PIX",
        content: qrCode,
      },
      {
        name: "PIX_CODE",
        content: qrCodeText,
      },
    ],
    subject: subject,
    text: "",
    to: [
      {
        email: email,
        type: "to",
      },
    ],
  });

  return response;
};

// * Compra no cartão de credito
const sendEmailPendingOrderOfDebts = async (to, username, price) => {
  const subject = `Pedido em aprovação - Olho no Carro`;
  const response = await tr.sendTemplate({
    templateName: OncTemplateEnum.DEBTS_ORDER_PENDING,
    margeVars: [
      {
        name: "USERNAME",
        content: username,
      },
      {
        name: "PRICE",
        content: price,
      },
    ],
    subject: subject,
    text: "",
    to: [
      {
        email: to,
        type: "to",
      },
    ],
  });

  return response;
};

// * Devitos a serem pagos
const sendEmailApprovedOrderOfDebts = async (to, username, protocol) => {
  const subject = `Pedido aprovado - Olho no Carro`;
  const response = await tr.sendTemplate({
    templateName: OncTemplateEnum.DEBTS_ORDER_APPROVED,
    margeVars: [
      {
        name: "USERNAME",
        content: username,
      },
      {
        name: "PROTOCOL",
        content: protocol,
      },
    ],
    text: "",
    subject: subject,
    to: [
      {
        email: to,
        type: "to",
      },
    ],
  });

  return response;
};

// * [ADM] - Creditos Alterados
const sendEmailAdmAlert = async ({
  emailTo,
  assigner,
  assignerId,
  assignerEmail,
  userId,
  userEmail,
  credits,
  funds,
  user,
}) => {
  const subject = "[ADM] - PAINEL OLHONOCARRO - Créditos Alterados";
  const response = await tr.sendText({
    subject: subject,
    text: `
      Administrador que alterou o saldo: ${assigner}
      ID: ${assignerId}
      EMAIL: ${assignerEmail}
      
      Usuario que teve saldo alterado: ${user}
      ID: ${userId}
      EMAIL: ${userEmail}

      Saldo antigo: ${funds}
      Saldo novo: ${credits}
    `,
    to: [
      {
        email: emailTo,
        type: "to",
      },
    ],
  });

  return response;
};

const sendEmailToReactiveUser = async (email, username, link) => {
  const subject = "Cadastre uma nova senha e reative seu acesso!";
  const response = await tr.sendTemplate({
    templateName: OncTemplateEnum.REACTIVE_ACCESS,
    margeVars: [
      {
        name: "USERNAME",
        content: username,
      },
      {
        name: "LINK",
        content: link,
      },
    ],
    text: "",
    subject: subject,
    to: [
      {
        email: email,
        type: "to",
      },
    ],
  });

  return response;
};

const sendEmailToExistingUser = async (email, username, link) => {
  const subject = `${username}, você não precisa realizar um novo cadastro para acessar nosso APP - Olho no Carro`;
  const response = await tr.sendTemplate({
    templateName: "OnUserTryRegisterAppError",
    margeVars: [
      {
        name: "USERNAME",
        content: username,
      },
      {
        name: "LINK",
        content: link,
      },
    ],
    text: "",
    subject: subject,
    to: [
      {
        email: email,
        type: "to",
      },
    ],
  });

  return response;
};

// * Disparos de email sem template
const sendSimpleEmail = async (to, subject, text) => {
  const response = await tr.sendText({
    subject: subject,
    text: text,
    to: [
      {
        email: to,
        type: "to",
      },
    ],
  });

  return response;
};

module.exports = {
  sendWellcomeMailToDefaultClient,
  sendRecoveryPasswordMail,
  sendNewContactMail,
  sendCredistReceivedMail,
  sendMailToOrderDeclinedByCreditCard,
  sendMailToOrderDeclinedByBanking,
  sendMailEnableBankingBillet,
  sendMailCanceledUser,
  sendSubscriptionApprovedMail,
  sendSubscriptionSuspendedMail,
  sendSubscriptionAnalysingMail,
  sendFirstEmailQuiz,
  sendSecondEmailQuiz,
  sendSimpleEmail,
  sendBillingEmailByPix,
  sendEmailPendingOrderOfDebts,
  sendEmailApprovedOrderOfDebts,
  sendEmailAdmAlert,
  sendEmailToReactiveUser,
  sendEmailToExistingUser,
  sendSimpleEmailWithLink: mailModule.send,
};
