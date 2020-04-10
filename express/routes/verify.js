const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const api = require('../routes.js');

const { jwtEmailKey } = process.env;
const { router } = api;

router.post('/verify/:token', async (req, res) => {
    try {
        const { id } = jwt.verify(req.params.token, jwtEmailKey);
        await User.update({ confirmed: true }, { where: { _id: id } });
    } catch (err) {
        res.send('error');
    }
    return res.redirect('/');
});

module.exports = router;
