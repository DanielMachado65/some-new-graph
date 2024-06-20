module.exports.ConsentService = class ConsentService {
  constructor(httpClient, baseUrl = "http://localhost:3011/api") {
    this.httpClient = httpClient;
    this.baseUrl = baseUrl;
  }

  async getUserConsents(userId, applicationId) {
    try {
      const url = `${this.baseUrl}/consent/by-user/${applicationId}/${userId}`;
      const httpResponse = await this.httpClient.get(url);
      return httpResponse.status === 200 &&
        httpResponse.response &&
        Array.isArray(httpResponse.response.data)
        ? httpResponse.response.data
        : [];
    } catch (error) {
      return [];
    }
  }

  async createUserConsentBatch(userId, applicationId, consentVariations) {
    try {
      const url = this.baseUrl + "/consent/batch";
      const body = { userId, applicationId, consentVariations };
      const httpResponse = await this.httpClient.post(url, body);
      return httpResponse.status === 201 &&
        httpResponse.response &&
        Array.isArray(httpResponse.response.data)
        ? httpResponse.response.data
        : [];
    } catch (error) {
      return [];
    }
  }

  async updateUserConsent(consentId, hasGivenConsent) {
    try {
      const url = this.baseUrl + "/consent/" + consentId;
      const body = { hasGivenConsent };
      const httpResponse = await this.httpClient.put(url, body);
      return httpResponse.status === 200 &&
        httpResponse.response &&
        httpResponse.response.data
        ? httpResponse.response.data
        : null;
    } catch (error) {
      return null;
    }
  }

  async updateUserConsentByIndex(
    userId,
    applicationId,
    consentType,
    channelType,
    hasGivenConsent
  ) {
    try {
      const url = this.baseUrl + "/consent/by-index";
      const body = {
        externalUserId: userId,
        externalApplicationId: applicationId,
        consentType:
          consentType.trim().toLowerCase() === "novidades, ofertas e descontos"
            ? "news"
            : null,
        channelType,
        hasGivenConsent,
      };
      const httpResponse = await this.httpClient.put(url, body);
      return httpResponse.status === 200 &&
        httpResponse.response &&
        httpResponse.response.data
        ? httpResponse.response.data
        : null;
    } catch (error) {
      return null;
    }
  }
};


