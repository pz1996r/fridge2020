const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();


module.exports = function auth(req, res, next) {
    const { jwtPrivateKey } = process.env;
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided.')

    try {
        const decoded = jwt.verify(token, jwtPrivateKey);
        req.user = decoded;
        next();
        return null;
    }
    catch{
        return res.status(400).send('Invalid token.')
    }
}


// sposób użycia: w routach importujemy (const auth = require('../middleware/auth'), a następnie przakazujemyy jako parametr do metod router dzięki czemu funkcja wykona się automatycznie jako middleweare)