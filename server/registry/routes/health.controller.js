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
                .then((ok) => {
                    // Not tested... 
                    console.log("All promises resolved" +ok)
                    res.status(200).send(ok.body);
                })
                .catch(err => console.log(err))
        } catch (error) {
            res.status(500).send(error)
        }
    });
}