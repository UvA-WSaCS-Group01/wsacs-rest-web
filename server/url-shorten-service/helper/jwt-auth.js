const jwt = require('jsonwebtoken');
const config = require('../../config.json');

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, config.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).send("forbidden");
            }

            req.user = user;
            next();
        });
    } 
};


module.exports = {  authenticateJWT }