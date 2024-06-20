"use strict";

const pdfModule = require("../../../domain/pdf/pdf.module");
const weakValidator = require("../../../infrastructure/utils/weakValidator.util");
const HttpCodes = require("../../../infrastructure/enumerators/httpCode.enum");
const {
  responseObject,
} = require("../../../infrastructure/helpers/routerHelper");

const mount = require("koa-mount");
const Router = require("koa-router");
const PdfRoutes = new Router();

PdfRoutes.get("/from-html", createNewPdfFromHtml);
async function createNewPdfFromHtml(ctx) {
  try {
    const { base64Url, fileName } = ctx.request.query;
    weakValidator.weakValidation(base64Url, fileName);
    const pdfBuffer = await pdfModule.createNewPdfFromHtml(base64Url);
    if (pdfBuffer) {
      ctx.attachment(fileName);
      ctx.type = "application/pdf";
      ctx.body = pdfBuffer;
    } else {
      responseObject(
        ctx,
        HttpCodes.GONE_ERROR,
        "Não foi possível criar o PDF para a url informada!"
      );
    }
  } catch (e) {
    return responseObject(
      ctx,
      (e.response && e.response.status) || HttpCodes.GONE_ERROR,
      e.response && e.response.statusText
    );
  }
}

module.exports = mount("/api/pdf", PdfRoutes.routes());
