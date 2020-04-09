const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const constants = require('./config/constants');

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

var server = app.listen(constants.PORT, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("User Service listening at http://%s:%s", host, port)
})
