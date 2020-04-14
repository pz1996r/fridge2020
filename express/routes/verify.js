const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const api = require('../routes.js');

const { jwtEmailKey } = process.env;
const { router } = api;

router.get('/verify/:token', async (req, res) => {
    // console.log(req);
    // console.log(req.headers['x-forwarded-host'] + req.baseUrl);
    // res.json({
    //     'hello': 'ddd',
    // })
    try {
        const { id } = jwt.verify(req.params.token, jwtEmailKey);
        console.log('work', id);
        // await User.update({ emailVerified: true }, { where: { _id: id } });
        await User.updateOne({ _id: id }, { emailVerified: true });
    } catch (err) {
        res.send('error');
    }
    console.log('testy')
    // return res.redirect('/');
});

router.post('/verify/:token', async (req, res) => {
    // console.log(req.headers['x-forwarded-host'] + req.baseUrl);
    console.log('trying to verify');
    try {
        const { id } = jwt.verify(req.params.token, jwtEmailKey);
        await User.updateOne({ _id: id }, { emailVerified: true });
        res.redirect('/login');
    } catch (err) {
        res.send('error');
    }
    return res.redirect('/login');
});

module.exports = router;
