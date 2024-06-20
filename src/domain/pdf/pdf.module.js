"use strict";

const pdfFacade = require("./pdf.facade");

const createNewPdfFromHtml = async (urlToGeneratePdf) =>
  pdfFacade.createNewPdfFromHtml(urlToGeneratePdf);

module.exports = {
  createNewPdfFromHtml,
};
