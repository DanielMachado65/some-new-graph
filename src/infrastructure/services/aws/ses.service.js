'use strict';

const AWS = require('aws-sdk');
const nodemailer = require('nodemailer');
const config = require('../../config/aws');

const ses = new AWS.SES(config.oncAwsSesCredentials);
const transporter = nodemailer.createTransport({ SES: ses });

const sendEmail = (from, to, subject, text, html, attachment, bcc) => {
    const message = {
        from,
        to,
        bcc,
        subject,
        text,
        html,
        attachments: [
            { path: attachment }
        ]
    };

    return transporter.sendMail(message);
};

module.exports = {
    sendEmail
};