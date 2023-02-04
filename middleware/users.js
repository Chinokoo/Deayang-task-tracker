//modules.
const config = require('config');
const jwt = require('jsonwebtoken');

//globalisation.
module.exports = function (req, res, next) {
    token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access Denied! no token available.');
    try {
        const decoded = jwt.verify(token, config.get('task-trackerPrivateKey'));
        req.user = decoded;
        next();
    }
    catch (ex) {
        res.status(400).send('Invalid Token.');
    }
}
