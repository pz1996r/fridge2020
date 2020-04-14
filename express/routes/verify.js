const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const api = require('../routes.js');

const { jwtEmailKey } = process.env;
const { router } = api;

router.get('/verify/:token', async (req, res) => {
    try {
        const { id } = jwt.verify(req.params.token, jwtEmailKey);
        console.log('work', id);
        // await User.update({ emailVerified: true }, { where: { _id: id } });
        await User.updateOne({ _id: id }, { emailVerified: true });
    } catch (err) {
        res.send('error');
    }
    console.log('testy')
    return res.redirect('/');
});

module.exports = router;
