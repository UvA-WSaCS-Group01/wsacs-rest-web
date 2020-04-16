module.exports = (app, registerService) => {

    app.get('/health', (req, res) => {
        try {
            const services = registerService.getAll();
            console.log(services);
            
            // TODO implement
            // health ? res.status(200).send(health) : res.status(500).send();
        } catch (error) {
            res.status(500).send(error)
        }
    });
}