// local **************************************************************
const dotenv = require('dotenv');

dotenv.config();
// end local ******************************************************************
const mongoose = require('mongoose');
// const config = require("config");

module.exports = function() {
  // const db = config.get("db");

  const { db } = process.env;
  mongoose.set('useCreateIndex', true);
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log(`Connected to ${db}...`))
    .catch(err => console.error(err));
};
