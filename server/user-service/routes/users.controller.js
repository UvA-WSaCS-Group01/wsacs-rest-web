const { UserService } = require('../services/users.service');

const userService = new UserService();
module.exports = app => {

    app.post('/users', (req, res) => {
        try {
            const user = userService.register(req.body);
            user ? res.status(200).send() : res.status(500).send();
        } catch (error) {
            res.status(500).send(error)
        }
    });

    app.post('/users/login', (req, res) => {
        const token = userService.authenticate(req.body)
        token ? res.status(200).send(token) : res.status(403).send("forbidden");   
    });

}