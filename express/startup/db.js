const mongoose = require("mongoose");
// const config = require("config");


module.exports = function () {
  // const db = config.get("db");
  // local **************************************************************
  const dotenv = require('dotenv');
  dotenv.config();
  // end local ******************************************************************
  const { jwtPrivateKey, db } = process.env;
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log(`Connected to ${db}...`))
    .catch(err => console.error(err));
};
