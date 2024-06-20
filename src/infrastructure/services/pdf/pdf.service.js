module.exports.PdfParserService = class PdfParserService {
  constructor(httpClient, baseUrl = "http://localhost:3002/api/v1") {
    this.httpClient = httpClient;
    this.baseUrl = baseUrl;
  }

  async parse(urlToGeneratePdf) {
    try {
      const url = this.baseUrl + "/pdf?url=" + urlToGeneratePdf;
      const httpResponse = await this.httpClient.get(url);
      return httpResponse.status === 200 ? httpResponse.response : null;
    } catch (error) {
      return null;
    }
  }
};
