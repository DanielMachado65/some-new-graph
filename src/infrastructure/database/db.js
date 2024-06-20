"use strict";

const mongoose = require("mongoose");
const mongodb = require("./config/mongodb")();

let connect = async () => {
  let hostname = process.env.NODE_ENV;

  try {
    hostname = mongodb.connection.split('@')[1].split('/')[0];
  } catch (error) { }

  try {
    const _connectionHandler = await mongoose.connect(
      mongodb.connection,
      mongodb.options
    );

    console.log(`Application database => ${hostname}`);
    return _connectionHandler;
  } catch (err) {
    console.log(err)
    return null;
  }
};

module.exports = {
  connect,
};
