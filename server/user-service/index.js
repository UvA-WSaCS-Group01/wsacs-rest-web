const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const constants = require('./config/constants');
const fetch = require('node-fetch');

app.use(bodyParser.json({
    strict:false
}));
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
})); 

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,x-access-token,X-Key');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});
require('./routes/users.controller')(app);
require('./routes/health.controller')(app);

var server = app.listen(constants.PORT, function () {
    var host = server.address().address
    var port = server.address().port
    
    // Register
    const body = {"location": host+":"+port};
    fetch('http://localhost:8084/service', {
            method: 'post',
            body:    JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        })
        .then(res => res.json())
        .then(json => console.log("Registered as: " +json))
        .catch(err => console.log(err));

    console.log("User Service listening at http://%s:%s", host, port)
})
