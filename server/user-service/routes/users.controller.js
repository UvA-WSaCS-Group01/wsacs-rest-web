const jwt = require('jsonwebtoken')
const { UserService } = require('../services/users.service');

// secret to sign JWT token. Should ideally be env variable to inject from a config which is somewhere securely located.
const accessTokenSecret = 'secret'; 

const userService = new UserService();
module.exports = app => {

    app.post('/api/users', (req, res) => {
        userService.register(req.body).then(()=> res.status(200).send())
    });

    app.post('/api/users/login', (req, res) => {
        userService.authenticate(req.body).then(token => {
            token ? res.status(200).json(token) : res.status(403).json("forbidden");
        })
    });

}