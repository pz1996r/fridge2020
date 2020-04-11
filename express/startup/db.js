const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

module.exports = function () {
  const { db } = process.env;
  mongoose.set('useCreateIndex', true);
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      // useUnifiedTopology: true,
    })
    .then(() => console.log(`Connected to ${db}...`))
    .catch(err => console.error(err));
};
