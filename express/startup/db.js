const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

module.exports = function connectDB() {
  console.log('trying to run mongo');
  const { db } = process.env;
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      // useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => console.log(`Connected to ${db}...`))
    .catch(err => { connectDB(); console.error(err) });
};
