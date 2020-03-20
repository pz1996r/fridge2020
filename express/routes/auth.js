const Joi = require('joi');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const { User } = require('../models/user');
// const mongoose = require('mongoose');
const api = require('../routes.js')
const router = api.router;

router.post('/auth', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(JSON.stringify(error.details[0].message));

  let user = await User.findOne({ name: req.body.name });
  if (!user) return res.status(400).send(JSON.stringify('Invalid email or password.'));

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send(JSON.stringify('Invalid email or password.'));

  const token = user.generateAuthToken();
  // najlepiej by było wysyłać token w headerze natomiast jako body proponował bym login usera ...
  // console.log(user);
  res.header('x-auth-token', token).send(_.pick(user, ['name', 'email']));
  // res.send(JSON.stringify(token));
});

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

module.exports = router;