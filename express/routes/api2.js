const api = require('../routes.js')
const mongoConnection = require('../startup/db');

const { router } = api;

router.get('/api2', async (req, res) => {
    console.log('API2 refreshing mongo');
    mongoConnection();
    console.log('API2 finish refreshing mongo');
    res.json({
        'hello': 'api2'
    })
})

module.exports = router;