const bcrypt = require('bcryptjs');
const _ = require('lodash');
const { User, validate } = require('../models/user');
const api = require('../routes.js');
// const sendEmail = require('../startup/mailer');

const { router } = api;

router.post('/users', async (req, res) => {

  const { error } = validate(req.body);
  if (error) return res.status(400).send(JSON.stringify(error.details[0].message));
  let user = await User.findOne({ email: req.body.email });
  const name = await User.findOne({ name: req.body.name });
  if (user) return res.status(400).send(JSON.stringify('User with this email already registered'));
  if (name) return res.status(400).send(JSON.stringify('User with this name already registered'));

  user = new User(_.pick({ ...req.body, emailVerified: false }, ['name', 'email', 'password', 'emailVerified']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const emailToken = user.generateEmailToken();
  console.log(`${req.headers.origin + req.baseUrl}/verify/${emailToken}`);
  console.log(req);
  return null;
  // 
  // return sendEmail(req.body.email, req.body.name, emailToken, res)

});

module.exports = router;
