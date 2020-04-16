
module.exports = (app, registerService) => {

    app.post('/service', (req, res) => {
        console.log("Registering " +req.body.location);
        const index = registerService.add(req.body);
        return res.status(201).json(index)
    });
}