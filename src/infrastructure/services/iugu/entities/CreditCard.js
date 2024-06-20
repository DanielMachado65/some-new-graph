"use strict";

module.exports.CreditCard = class CreditCard {
  number;
  verification_value;
  first_name;
  last_name;
  month;
  year;

  constructor(number, verificationValue, firstName, lastName, month, year) {
    this.number = number;
    this.verification_value = verificationValue;
    this.first_name = firstName;
    this.last_name = lastName;
    this.month = month;
    this.year = year;
  }

  setNumber(value) {
    this.number = value;
    return this;
  }

  setVerificationValue(value) {
    this.verification_value = value;
    return this;
  }

  setFirstName(value) {
    this.first_name = value;
    return this;
  }

  setLastName(value) {
    this.last_name = value;
    return this;
  }

  setMonth(value) {
    this.month = value;
    return this;
  }

  setYear(value) {
    this.year = value;
    return this;
  }

  toObject() {
    return {
      number: this.number,
      verification_value: this.verification_value,
      first_name: this.first_name,
      last_name: this.last_name,
      month: this.month,
      year: this.year,
    };
  }

  static ValidateCreditCard(creditCard) {
    if (!(creditCard instanceof CreditCard))
      throw new Error("Invalid credit card object. Must be a CreditCard type");
  }
};
