"use strict";

module.exports.Address = class Address {
  street;
  number;
  district;
  city;
  state;
  zip_code;
  complement;

  constructor(street, number, district, city, state, zipCode, complement) {
    this.street = street;
    this.number = number;
    this.district = district;
    this.city = city;
    this.state = state;
    this.zip_code = zipCode;
    this.complement = complement;
  }

  static Validate(address) {
    if (!(address instanceof Address))
      throw new Error("address object must be a Address Type object");
  }

  setStreet(value) {
    this.street = "" + value;
    return this;
  }
  setNumber(value) {
    this.number = "" + value;
    return this;
  }

  setDistrict(value) {
    this.district = "" + value;
    return this;
  }

  setCity(value) {
    this.city = "" + value;
    return this;
  }

  setState(value) {
    this.state = "" + value;
    return this;
  }

  setZipCode(value) {
    this.zip_code = "" + value;
    return this;
  }

  setComplement(value) {
    this.complement = "" + value;
    return this;
  }

  toObject() {
    return {
      street: this.street,
      number: this.number,
      district: this.district,
      city: this.city,
      state: this.state,
      zip_code: this.zip_code,
      complement: this.complement,
    };
  }
};
