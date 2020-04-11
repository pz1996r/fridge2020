const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

module.exports = function () {
  console.log('trying to run mongo');
  const { db } = process.env;
  mongoose.set('useCreateIndex', true);
  mongoose.set('useNewUrlParser', true);
  mongoose.set('useUnifiedTopology', true);
  mongoose
    .connect(db, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useFindAndModify: true,
      // connectWithNoPrimary: true
    })
    .then(() => console.log(`Connected to ${db}...`))
    .catch(err => console.error(err));
};
