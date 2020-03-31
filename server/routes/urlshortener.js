const { WINDOW_LOCATION_ORIGIN, PORT } = require('../config/constants');

const { urlShorten } = require('../models/urlShorten');
const { ShortenedUrlsRepository } = require('../services/shortenedUrlRepository');

var urls = new ShortenedUrlsRepository();
module.exports = app => {
    // :id identificator of a URL
    app.put('/id/:id', function (req, res) {
        console.log("Got a PUT request for /:id");
        console.log(res)
        res.send("res");
    })
    
    // :id identificator of a URL
    app.delete('/id/:id', function (req, res) {
        console.log(req.params.id)
        const result = urls.delete(req.params.id);
        if(result === -1){
            return res.status(404).send();
        }
        return res.status(204).send();
    })
    
    // :id identificator of a URL 
    app.get('/id/:id', function (req, res) {
        return res.send(urls.get(req.params.id));
    })

    app.get('/', function (req, res) {
        return res.send(urls.getAll());
    })

    // :url URL to shorten
    app.post('/:url', function (req, res) {
        const url = req.params['url'];

        //TODO: Check URL by regex and return 400 Error

        const shortenedUrlId = url; //FIXME: Write Short URL Function

        const shortenedUrlObject = new urlShorten(url, WINDOW_LOCATION_ORIGIN + ':' + PORT + '/' + shortenedUrlId, shortenedUrlId);
        urls.push(shortenedUrlObject);
        return res.status(201).send(shortenedUrlObject);
        
    })

    app.delete('/', function(req, res){
        urls = new ShortenedUrlsRepository();
        return res.status(204).send();
    })
}