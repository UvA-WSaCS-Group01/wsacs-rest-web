const jwt = require('jsonwebtoken');
const config = require('../config.json');

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, config.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).send("forbidden\n");
            }

            req.user = user;
            next();
        });
    } else{
        return res.status(403).send("forbidden\n");
    }
};


module.exports = {  authenticateJWT }