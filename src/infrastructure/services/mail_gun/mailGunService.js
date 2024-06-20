'use strict';

const api_key = 'key-6baeacaa68ca71ed0d90a9426584af1f';
const domain = 'mg.olhonocarro.com.br';
//const USER = 'diego@olhonocarro.com.br';
//const PASS = '1q2w3e4r!@#$';

const mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });

const sendMailByMailgun = async (
    from,
    to,
    subject,
    text,
    html,
    attach,
    bcc,
) => {
    let data = {
        from: from,
        to: to,
        subject: subject,
        html: html ? html : String(),
        text: text ? text : String(),
        attachment: attach ? attach : String(),
    };

    if (bcc) {
        data = {
            ...data,
            bcc,
        };
    }
    return new Promise((res, rej) => {
        mailgun.messages().send(data, function (error, body) {
            return error ? rej(error) : res(body);
        });
    });
};

module.exports = {
    sendMailByMailgun,
};
