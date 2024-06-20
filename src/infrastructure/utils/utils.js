"use strict";

const validator = require("validator");
const postalCodeService = require("../services/util/postalCodeService");
const moment = require("moment");
const CONSTANTS = require("../constants/constants");
const _ = require("lodash");

const getBrazilianDateFormat = (dt) => {
  let _date = dt ? new Date(dt) : new Date();
  let _currentHours = moment(_date).format("HH:mm:ss");
  let _day = _date.getDate();
  let _month = _date.getMonth() + 1;
  let _year = _date.getFullYear();
  return `${_day.padLeft(2)}/${_month.padLeft(2)}/${_year} ${_currentHours}`;
};

const getUSDateFormat = (_date) => {
  return moment(_date).format("YYYY-MM-DD");
};

const startOfTheDay = (initialDate) => {
  let initDate = new Date(initialDate);
  return new Date(
    initDate.getFullYear(),
    initDate.getMonth(),
    initDate.getDate(),
    0,
    0,
    0
  );
};
const endOfTheDay = (lastDate) => {
  let endDate = new Date(lastDate);
  return new Date(
    endDate.getFullYear(),
    endDate.getMonth(),
    endDate.getDate(),
    23,
    59,
    59
  );
};

const validateJSON = (data) => {
  let _result = false;
  if (typeof data == "string") _result = validator.isJSON(data);
  else {
    try {
      let _r = JSON.stringify(data);
      _result = true;
    } catch (err) {
      _result = false;
    }
  }
  return _result;
};

const tryParseInt = function (str) {
  var retValue = str;
  if (str !== null) {
    if (str.length > 0) {
      if (!isNaN(str)) {
        retValue = parseInt(str);
      }
    }
  }
  return retValue;
};

const getDataAddressByZipcode = async (postalCode) => {
  let result = {
    data: null,
    error: null,
  };
  try {
    result.data = await postalCodeService.getDataAddressByZipcode(postalCode);
  } catch (err) {
    result.error = err.message;
  } finally {
    return result;
  }
};

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getWorkingDaysCount(year, month, fistDay, lastDay) {
  var day, counter, date;
  day = fistDay;
  counter = 0;
  date = new Date(year, month, day);
  while (date.getMonth() === month && day <= lastDay) {
    if (date.getDay() !== 0 && date.getDay() !== 6) {
      counter += 1;
    }
    day += 1;
    date = new Date(year, month, day);
  }
  return counter;
}

const staticHeaderValidation = async (ctx, next) => {
  let hash = ctx.headers.authorization;
  if (hash == CONSTANTS.SECURTY_KEY) {
    await next();
  } else {
    let error = {
      AuthenticationError:
        "Acesso negado. Você não tem permissão para prosseguir com essa solicitação",
      Code: 401,
    };
    ctx.response.type = "json";
    ctx.response.status = 401;
    ctx.response.body = error;
    ctx.response.app.emit("error", error, this);
  }
};

const isObjEmpty = (obj) => {
  return !obj || Object.keys(obj).length === 0;
};

const shallowCopy = (data) => JSON.parse(JSON.stringify(data));

const convertValueCentsToFloat = (valueCents) => {
  return parseFloat((valueCents / 100).toFixed(2));
};

const getEmailTextOvershadowed = (email) => {
  const emailSplitted = email.split("@");

  const firstPart = emailSplitted[0];
  const secondPart = emailSplitted[1];

  const lengthOfFirstPart = firstPart.length;

  const firstTwoLetters = firstPart.substring(0, 2);
  const lastTwoLetters = firstPart.substring(
    lengthOfFirstPart - 2,
    lengthOfFirstPart
  );

  return `${firstTwoLetters}*****${lastTwoLetters}@${secondPart}`;
};

const getRandNumberByDefinedLength = (
  min = 0,
  max = Number.MAX_SAFE_INTEGER
) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

function capitalizeAll(name) {
  return (name && name.split(" ").map(_.capitalize).join(" ")) || name;
}

function isAValidPlate(key) {
  return /(^[a-zA-Z]{3}\d{4}$)|(^[a-zA-Z]{3}[0-9]{1}[a-zA-Z]{1}[0-9]{2}$)/.exec(
    key
  );
}

const calculateDays = (value, type) => {
  return moment().add(value, type).toJSON();
};

function isValidCpf(cpf) {
  try {
    if (
      !cpf ||
      cpf.length !== 11 ||
      cpf === "0".repeat(11) ||
      cpf === "1".repeat(11) ||
      cpf === "2".repeat(11) ||
      cpf === "3".repeat(11) ||
      cpf === "4".repeat(11) ||
      cpf === "5".repeat(11) ||
      cpf === "6".repeat(11) ||
      cpf === "7".repeat(11) ||
      cpf === "8".repeat(11) ||
      cpf === "9".repeat(11)
    )
      return false;

    const firstDigitSum = cpf
      .split("")
      .splice(0, 9)
      .reduce(
        (total, number, index) => total + parseInt(number) * (10 - index),
        0
      );
    const partialFirstDigit = (firstDigitSum * 10) % 11;
    const firstDigit = partialFirstDigit > 9 ? 0 : partialFirstDigit;

    if (parseInt(cpf.charAt(9)) !== firstDigit) return false;

    const secondDigitSum = cpf
      .split("")
      .splice(0, 10)
      .reduce(
        (total, number, index) => total + parseInt(number) * (11 - index),
        0
      );
    const partialSecondDigit = (secondDigitSum * 10) % 11;
    const secondDigit = partialSecondDigit > 9 ? 0 : partialSecondDigit;

    return parseInt(cpf.charAt(10)) === secondDigit;
  } catch (error) {
    return false;
  }
}

function getPositionName(fullName = "", position) {
  if (!position) return fullName;

  const arrayName = fullName.trim().split(" ");
  if (position === "FIRST") return arrayName[0];
  if (position === "LAST") {
    return arrayName.length > 1 ? arrayName[arrayName.length - 1] : "";
  }
  if (typeof position === "number") return arrayName[position];
  return fullName;
}

module.exports = {
  isAValidPlate,
  isValidCpf,
  capitalizeAll,
  validateJSON,
  tryParseInt: (str, defaultValue = null) => {
    return tryParseInt(str, (defaultValue = null));
  },
  getDataAddressByZipcode,
  getBrazilianDateFormat,
  startOfTheDay,
  endOfTheDay,
  getWorkingDaysCount,
  staticHeaderValidation,
  isObjEmpty,
  shallowCopy,
  convertValueCentsToFloat,
  getEmailTextOvershadowed,
  getRandNumberByDefinedLength,
  getUSDateFormat,
  calculateDays,
  getPositionName,
};
