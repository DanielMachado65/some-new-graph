class CorvetteService {
  baseUrl = process.env.CORVETTE_BASE_URL;

  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  async getReprocessQuery(queryId = "") {
    try {
      const url = `${this.baseUrl}/reprocess/${queryId}`;
      const { response } = await this.httpClient.get(url);
      return {
        status: response.status,
        executionTurn: response.executionTurn,
      };
    } catch (error) {
      return {};
    }
  }

  async cancelAutoReprocess(queryId) {
    try {
      const url = `${this.baseUrl}/reprocess/${queryId}`;
      return await this.httpClient.delete(url);
    } catch (error) {}
  }
}

module.exports.CorvetteService = CorvetteService;
