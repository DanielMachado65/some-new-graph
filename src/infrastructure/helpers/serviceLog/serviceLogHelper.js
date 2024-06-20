"use strict";

const convertToInt = (data) => {
  return parseInt(data);
};

const quizAnswerErrorHandler = (errorObject) => {
  console.log("Error ==> " + errorObject.error);
  console.log("Data object error ==> " + errorObject.data);

  switch (errorObject.error) {
    case "GET_SERVICES_LOG_BY_MONTH_AND_YEAR_ON_DB_ERROR":
    case "HANDLER_SERVICES_LOG_DATA_ERROR":
      return { error: "GET_SERVICES_LOG_BY_MONTH_AND_YEAR_ERROR" };

    default:
      return errorObject;
  }
};

module.exports = {
  convertToInt,
  quizAnswerErrorHandler,
};
