"use strict";

const hideString = (string, index = 5, defaultResponse) => {
  if (!string) {
    return defaultResponse || "Desconhecido";
  }
  const length = string.length;
  const res = string.slice(0, index);
  const hideString = "*".repeat(length - index);
  return `${res}${hideString}`;
};

module.exports = {
  hideString,
};
