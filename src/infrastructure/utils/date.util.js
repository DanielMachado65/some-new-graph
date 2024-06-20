"use strict";

const moment = require("moment");
const momentTimeZone = require("moment-timezone");

function getRefYearToInvoiceFromDate(refDate = null) {
  const date = refDate || new Date();
  date.setMonth(date.getMonth() - 1);
  return date.getFullYear();
}

function getRefMonthToInvoiceFromDate(refDate = null) {
  const date = refDate || new Date();
  date.setMonth(date.getMonth() - 1);
  return date.getMonth();
}

const getBrazilianDateFormat = (date) => {
  const _date = date ? new Date(date) : new Date();
  const _currentHours = moment(_date).format("HH:mm:ss");
  const _day = _date.getDate();
  const _month = _date.getMonth() + 1;
  const _year = _date.getFullYear();
  return `${_day.padLeft(2)}/${_month.padLeft(2)}/${_year} ${_currentHours}`;
};

const getCurrentYear = () => new Date().getFullYear();

const getLiteralMonth = (key) => {
  switch (key) {
    case 0:
      return "JANEIRO";
    case 1:
      return "FEVEREIRO";
    case 2:
      return "MARÇO";
    case 3:
      return "ABRIL";
    case 4:
      return "MAIO";
    case 5:
      return "JUNHO";
    case 6:
      return "JULHO";
    case 7:
      return "AGOSTO";
    case 8:
      return "SETEMBRO";
    case 9:
      return "OUTUBRO";
    case 10:
      return "NOVEMBRO";
    case 11:
      return "DEZEMBRO";
    default:
      return null;
  }
};

const getValidMonth = (month) => {
  const isValidNumber = typeof month === "number" && month >= 0 && month <= 11;
  const isValidString =
    typeof month === "string" && month.match(/\d\d?/g).length > 0;
  return isValidNumber
    ? month
    : isValidString
    ? Number(month)
    : new Date().getMonth();
};

const getValidYear = (year) => {
  const isValidNumber = typeof year === "number" && year >= 1900;
  const isValidString =
    typeof year === "string" && year.match(/\d\d\d\d/g).length > 0;
  return isValidNumber
    ? year
    : isValidString
    ? Number(year)
    : new Date().getFullYear();
};

const getStartOfMonth = ({ month, year }) => {
  const validMonth = getValidMonth(month);
  const validYear = getValidYear(year);
  return moment()
    .set({ month: validMonth, year: validYear })
    .startOf("month")
    .toDate();
};

const getEndOfMonth = ({ month, year }) => {
  const validMonth = getValidMonth(month);
  const validYear = getValidYear(year);
  return moment()
    .set({ month: validMonth, year: validYear })
    .endOf("month")
    .toDate();
};

function getDateWithSaoPauloTimeZone(date = new Date()) {
  return moment(date).tz("America/Sao_Paulo");
}

const getDateWithCorrectTimeZone = () => {
  return new Date(getDateWithSaoPauloTimeZone().format());
};

const getStringDateFormatIn_AAAA_MM_DD = (date) => {
  return getDateWithSaoPauloTimeZone(date).format("YYYY-MM-DD");
};

const getStringDateFormatIn_MM_DD = (date) => {
  return moment(date).format("MM/DD");
};

const getMonthToCorrectTimeZone = () => getDateWithCorrectTimeZone().getMonth();
const getYearToCorrectTimeZone = () =>
  getDateWithCorrectTimeZone().getFullYear();

const addDaysToDate = (days = 0) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

const getMonthStartEndDateOrDefault = (userMonth, userYear) => {
  const currentDate = new Date();
  const maybeMonth = parseInt(userMonth);
  const maybeYear = parseInt(userYear);
  const month = isNaN(maybeMonth) ? currentDate.getMonth() : maybeMonth;
  const year = isNaN(maybeYear) ? currentDate.getFullYear() : maybeYear;
  const startDate = new Date(year, month, 1, 0, 0, 0, 0);
  const endDate = new Date(year, month + 1, 1, 0, 0, 0, 0);
  return { startDate, endDate };
};

const getStartOfDay = (date) => {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    0,
    0,
    0,
    0
  );
};

const getEndOfDay = (date) => {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    23,
    59,
    59,
    999
  );
};

const toISO = (date) => {
  return new Date(date).toISOString();
};

const getDateFrom3MonthsBefore = () => {
  return moment().subtract(3, "months").toDate();
};

const isSameOrAfter = (date1, date2) => {
  return moment(date1).isSameOrAfter(date2);
};

module.exports = {
  getBrazilianDateFormat,
  getCurrentYear,
  getEndOfMonth,
  getLiteralMonth,
  getRefYearToInvoiceFromDate,
  getRefMonthToInvoiceFromDate,
  getStartOfMonth,
  getDateWithCorrectTimeZone,
  getMonthToCorrectTimeZone,
  getYearToCorrectTimeZone,
  getStringDateFormatIn_AAAA_MM_DD,
  getStringDateFormatIn_MM_DD,
  addDaysToDate,
  getMonthStartEndDateOrDefault,
  getStartOfDay,
  getEndOfDay,
  toISO,
  getDateFrom3MonthsBefore,
  isSameOrAfter,
};
