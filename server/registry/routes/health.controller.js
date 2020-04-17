const fetch = require('node-fetch');

module.exports = (app, registerService) => {

    app.get('/health', (req, res) => {
        try {
            const services = registerService.getAll();
            console.log("Amount of registered services: " +services.length);

            let promises = [];
            promises = services.map(service => {
                console.log(service.location);
                return new Promise((resolve, reject) => {
                    fetch(service.location+"/health").then((req) => {
                            resolve(req)
                        }
                    ).catch((err) => {
                        reject(err);
                    })
                })
            });
            console.log(promises);
            Promise.all(promises)
                .then((value) => {
                    console.log("All promises resolved.")
                    res.status(200).send(services);
                })
                .catch(err => {
                    // registerService.remove(getServices(err)) remove inactive service
                    res.status(200).send(err.message);
                })
        } catch (error) {
            res.status(500).send(error)
        }
    });
}