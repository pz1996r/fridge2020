/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const api = require('../routes.js');
const sendEmail = require('../startup/mailer');

const { jwtEmailKey, jwtVerificationKey } = process.env;
const { router } = api;

router.post('/verifytest', async (req, res) => {
    const token = req.header('x-verification-token');
    if (!token) return res.status(401).send('Access denied. No token provided.');
    const { id } = jwt.verify(token, jwtVerificationKey);
    if (!id) return res.status(401).send('Invalid token.');
    const user = await User.findOne({ _id: id });
    if (!user) return res.status(401).send('Invalid token.');

    const emailToken = user.generateEmailToken();
    const link = `${req.headers.origin + req.baseUrl}/verify/${emailToken}`;
    sendEmail(user.email, user.name, link)
        .then(() => { return res.send('The link has been send, check you mailbox') })
        .catch((err) => { console.log(err); return res.status(400).send(err) })

});

router.get('/verify/:token', async (req, res) => {
    try {
        const { id } = jwt.verify(req.params.token, jwtEmailKey);
        await User.updateOne({ _id: id }, { emailVerified: true });
    } catch (err) {
        res.send('error');
    }
    return res.redirect('/');
});

module.exports = router;
