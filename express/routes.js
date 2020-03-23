// const express = __non_webpack_require__('express');
// local *******************************************************************************************************
const dotenv = require('dotenv');

dotenv.config();
// end local *****************************************************************************************************
const { jwtPrivateKey, db } = process.env;
const express = require('express');
const serverless = require('serverless-http');

const app = express();
const router = express.Router();

const cors = require('cors');
const error = require('./middelwears/error');

exports.router = router;

require('./startup/prod')(app);
require('./startup/db')();

// routy:
require('./routes/api1');
require('./routes/api2');
require('./routes/auth');
require('./routes/fridge');
require('./routes/logged_in');
require('./routes/products');
require('./routes/recipes');
require('./routes/shoppingList');
require('./routes/users');

app.use(error);
app.use(express.json());
// przekazywanie JWT w headerze, aby był widoczny z perpspektywy fetcha
app.use(
  cors({
    exposedHeaders: ['x-auth-token'],
  }),
);

if (!jwtPrivateKey) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

router.get('/', (req, res) => {
  res.json({
    db_env: db,
    token_env: jwtPrivateKey,
  });
});

app.use('/.netlify/functions/routes', router);
module.exports.handler = serverless(app);
