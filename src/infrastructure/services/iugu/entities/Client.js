"use strict";
const { Address } = require("./Address");
const { Contract } = require("./Contract");

module.exports.Client = class Client extends Contract {
  cpf_cnpj;
  name;
  phone_prefix;
  phone;
  email;
  address;
  custom_variables;

  constructor(
    document,
    name,
    phonePrefix,
    phone,
    email,
    address,
    customVariables = []
  ) {
    super("customers");
    this.cpf_cnpj = document;
    this.name = name;
    this.phone_prefix = phonePrefix;
    this.phone = phone;
    this.email = email;
    this.address = address;
    this.custom_variables = customVariables;
  }

  static Validate(client) {
    if (!(client instanceof Client))
      throw new Error("client object must be a Client Type object");
  }

  static ValidateCustomerId(customerId) {
    if (!customerId) throw new Error("Invalid customer id to user");
  }

  setDocument(value) {
    this.cpf_cnpj = value;
    return this;
  }

  setName(value) {
    this.name = value;
    return this;
  }

  setPhonePrefix(value) {
    this.phone_prefix = value;
    return this;
  }

  setPhone(value) {
    this.phone = value;
    return this;
  }

  setEmail(value) {
    this.email = value;
    return this;
  }

  setAddress(value) {
    Address.Validate(value);
    this.address = value;
    return this;
  }

  setCustomVariables(value) {
    if (!Array.isArray(value))
      throw new Error("Invalid type to custom variables. Must be a array");
    this.custom_variables = value;
    return this;
  }

  toObject() {
    return {
      cpf_cnpj: this.cpf_cnpj,
      name: this.name,
      phone_prefix: this.phone_prefix,
      phone: this.phone,
      email: this.email,
      address: this.address && this.address.toObject(),
      custom_variables: this.custom_variables,
    };
  }

  create = async () => {
    const { address, ...payer } = this.toObject();
    return this.doRequest(this.HTTP_METHODS.POST, null, {
      ...address,
      ...payer,
    });
  };

  update = async (customerId) => {
    const { address, ...payer } = this.toObject();
    return this.doRequest(this.HTTP_METHODS.PUT, `/${customerId}`, {
      ...address,
      ...payer,
    });
  };

  remove = async (customerId) => {
    return this.doRequest(this.HTTP_METHODS.DELETE, `/${customerId}`);
  };

  get = async (customerId) => {
    return this.doRequest(this.HTTP_METHODS.GET, `/${customerId}`);
  };

  list = async () => {
    return this.doRequest(this.HTTP_METHODS.GET);
  };
};
