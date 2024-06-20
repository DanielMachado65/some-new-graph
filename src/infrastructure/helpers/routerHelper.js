"use strict";

const responseObject = (ctx, status, msg) => {
  ctx.status = status ? status.cod || status : 200;
  ctx.response.body = {
    status: status,
    body: msg,
  };
};

const sendDownloadableResponse = (ctx, buffer, attachmentName) => {
  ctx.response.attachment(attachmentName);
  ctx.body = buffer;
  ctx.status = 200;
};

module.exports = {
  responseObject,
  sendDownloadableResponse,
};
