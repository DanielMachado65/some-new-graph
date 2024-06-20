"use strict";

const mailGunService = require("../../infrastructure/services/mail_gun/mailGunService");
const sesService = require("../../infrastructure/services/aws/ses.service");

const SuppressionEmailFacade = require("../support/email_suppression/emailSuppression.facade");

const { isEmail } = require("validator");

const getEmails = (to) =>
  to
    .split(",")
    .map((email) => email.trim())
    .filter((email) => isEmail(email))
    .join(",");

const getEmailServices = (to) => {
  const domainsToAvoidMailgun = ["@yahoo"];
  const hasToAvoidMailgun = domainsToAvoidMailgun.reduce(
    (acc, domainToAvoid) => acc || to.includes(domainToAvoid),
    false
  );

  return hasToAvoidMailgun
    ? {
        defaultService: sesService.sendEmail,
        fallbackService: mailGunService.sendMailByMailgun,
      }
    : {
        defaultService: mailGunService.sendMailByMailgun,
        fallbackService: sesService.sendEmail,
      };
};

const dispatchEmail = async ({
  services,
  from,
  to,
  subject,
  text,
  html,
  attachment,
  bcc,
}) => {
  const { defaultService, fallbackService } = services;

  try {
    return await defaultService(from, to, subject, text, html, attachment, bcc);
  } catch (defaultServiceError) {
    console.log(defaultServiceError);
    try {
      return await fallbackService(
        from,
        to,
        subject,
        text,
        html,
        attachment,
        bcc
      );
    } catch (fallbackServiceError) {
      console.log(fallbackServiceError);
    }
  }

  return { err: "Não foi possível enviar o e-mail" };
};

async function filterEmailsToSent(stringEmails) {
  const emails = stringEmails.split(",").map((email) => email.trim());
  const emailsAvailable = [];
  for (const email of emails) {
    const isSuppressed = await SuppressionEmailFacade.isSuppressedEmail(email);
    if (!isSuppressed) emailsAvailable.push(email);
  }
  return emailsAvailable.join(",");
}

const send = async (to, subject, text, html, attach, bcc) => {
  try {
    const emailsAvailable = await filterEmailsToSent(to);
    const cleanedTo = getEmails(emailsAvailable);
    return !cleanedTo.length
      ? { err: "E-mail inválido" }
      : dispatchEmail({
          services: getEmailServices(cleanedTo),
          from: "noreply@olhonocarro.com.br",
          to: cleanedTo,
          subject,
          text,
          html,
          attachment: attach,
          bcc,
        });
  } catch (e) {
    return e.message;
  }
};

module.exports = {
  send,
};
