const api = require('../routes.js')
const router = api.router;

router.get('/api2', async (req, res) => {
    res.json({
        'hello': 'api2'
    })
})

module.exports = router;