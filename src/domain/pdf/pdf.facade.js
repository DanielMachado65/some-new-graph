"use strict";

const {
  PdfParserService,
} = require("../../infrastructure/services/pdf/pdf.service");
const {
  HttpClientService,
} = require("../../infrastructure/services/http_client");

const createNewPdfFromHtml = async (urlToGeneratePdf) => {
  const baseUrl = process.env.PDF_PARSER_URL;
  const httpClient = new HttpClientService(
    HttpClientService.strategyBuilder().useAxios()
  );
  const pdfParser = new PdfParserService(httpClient, baseUrl);
  const pdfBase64 = await pdfParser.parse(urlToGeneratePdf);
  return pdfBase64 && Buffer.from(pdfBase64, "base64");
};

module.exports = {
  createNewPdfFromHtml,
};
