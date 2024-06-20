"use strict";

const connection = process.env.DB_CONNECTION_STRING;

const options = {};

module.exports = () => ({
  connection,
  options,
});
