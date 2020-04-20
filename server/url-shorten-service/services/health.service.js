const os = require('os');
const util = require('util');

class HealthService{
    constructor(){}

    retreiveHealthStatus(){
        return util.inspect(process.memoryUsage());
    }

    getLocation(){
        return os.hostname() +" " +os.platform;
    }
}

module.exports = {
    HealthService
}