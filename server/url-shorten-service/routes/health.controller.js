const { HealthService } = require('../services/health.service');

const healthService = new HealthService();
module.exports = app => {

    app.get('/health', (req, res) => {
        try {
            const health = healthService.retreiveHealthStatus();
            health ? res.status(200).send(health) : res.status(500).send();
        } catch (error) {
            res.status(500).send(error)
        }
    });


    app.get('/location', (req, res) => {
        try {
            const location = healthService.getLocation();
            location ? res.status(200).send(location) : res.status(500).send();
        } catch (error) {
            res.status(500).send(error)
        }
    });
}