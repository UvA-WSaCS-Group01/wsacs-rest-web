
module.exports = (app, registerService) => {

    app.post('/service', (req, res) => {
        console.log("Registering " +req);
        const index = registerService.add(req);
        return res.status(201).json(index)
    });
}