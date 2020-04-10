const api = require('../routes.js')

const { router } = api;

router.get('/api1', async (req, res) => {
    res.json({
        'hello': 'api'
    })
})

module.exports = router;