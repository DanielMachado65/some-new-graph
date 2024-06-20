module.exports.QueryParserService = class QueryParserService {
  constructor(httpClient, baseUrl = "http://localhost:3000/api/v1") {
    this.httpClient = httpClient;
    this.baseUrl = baseUrl;
  }

  async parse(queryCode, client, responseJson, templateVersion = 0) {
    try {
      const url = this.baseUrl + "/query/parse?client=" + client;
      const code = queryCode;
      const version = templateVersion;
      const body = { code, responseJson, version };
      const httpResponse = await this.httpClient.post(url, body);
      return httpResponse.status === 201 ? httpResponse.response : null;
    } catch (error) {
      return null;
    }
  }
};
