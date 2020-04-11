const Joi = require('joi');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const { User } = require('../models/user');
const api = require('../routes.js');

const { router } = api;

function validate(req) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required(),
  };
  return Joi.validate(req, schema);
}

router.post('/auth', async (req, res) => {
  console.log('test auth work');
  const { error } = validate(req.body);
  if (error) return res.status(400).send(JSON.stringify(error.details[0].message));

  const user = await User.findOne({ name: req.body.name });
  if (!user) return res.status(400).send(JSON.stringify('Invalid email or password.'));

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send(JSON.stringify('Invalid email or password.'));

  const token = await user.generateAuthToken();
  if (token === undefined) {
    return res.status(404).send(JSON.stringify('Server Connection problem'));
  }
  console.log(user, token, req);
  return res.header('x-auth-token', token).send(_.pick(user, ['name', 'email']));
});

module.exports = router;
