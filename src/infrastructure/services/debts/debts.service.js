module.exports.DebtsService = class DebtsService {
  constructor(
    httpClient,
    applicationId,
    baseUrl = "http://localhost:3000/api"
  ) {
    this.httpClient = httpClient;
    this.applicationId = applicationId;
    this.baseUrl = baseUrl;
  }

  async searchDebts(plate) {
    const url = this.baseUrl + "/query/search-debts";
    const body = { applicationId: this.applicationId, vehicle: { plate } };
    const httpResponse = await this.httpClient.post(url, body);
    return httpResponse.response;
  }

  async retrieveDebtsByProtocolAndExternalIds(protocol, debtIds) {
    const url = this.baseUrl + "/debt/retrieve-by-protocol-and-external-ids";
    const body = {
      applicationId: this.applicationId,
      protocol,
      debts: debtIds,
    };
    const httpResponse = await this.httpClient.post(url, body);
    return httpResponse.response;
  }

  async retrieveInstallments(protocol, debtIds) {
    const url = this.baseUrl + "/installment/consult/" + protocol;
    const body = {
      applicationId: this.applicationId,
      protocol,
      debts: debtIds,
    };
    const httpResponse = await this.httpClient.post(url, body);
    return httpResponse.response;
  }

  async executeCheckout(
    customerReference,
    customerDocument,
    protocol,
    debtIds,
    numberOfInstallments,
    debtsCreditCard,
    billingAddress,
    customer
  ) {
    const url = this.baseUrl + "/checkout/by-credit-card";
    const body = {
      applicationId: this.applicationId,
      customerReference,
      protocol,
      debts: debtIds,
      installment: numberOfInstallments,
      customer,
      card: {
        number: debtsCreditCard.number,
        brand: debtsCreditCard.brand,
        holder: debtsCreditCard.holder,
        expirationDate: debtsCreditCard.expirationDate,
        cvv: debtsCreditCard.cvv,
        document: customerDocument,
        billingAddress,
      },
    };
    const httpResponse = await this.httpClient.post(url, body);
    return httpResponse.response;
  }
};
