const auth = require('../middelwears/auth');
const api = require('../routes.js')
const router = api.router;

router.get('/logged_in', auth, async (req, res) => {
    res.status(200).send(JSON.stringify('Valid Token'))
});

module.exports = router;