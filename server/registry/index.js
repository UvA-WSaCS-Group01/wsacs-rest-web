const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const constants = require('./config/constants');

const { RegisterService } = require('./services/register.service');
let registerService = new RegisterService();

app.use(bodyParser.json());
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

 require('./routes/register.controller')(app, registerService);
 require('./routes/health.controller')(app, registerService);

 var server = app.listen(constants.PORT, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("Register listening at http://%s:%s", host, port)
 })