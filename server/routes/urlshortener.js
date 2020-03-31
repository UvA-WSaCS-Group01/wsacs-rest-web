const { WINDOW_LOCATION_ORIGIN, PORT } = require('../config/constants');

const { urlShorten } = require('../models/urlShorten');
const { ShortenedUrlsRepository } = require('../services/shortenedUrlRepository');
const { validateUrl } = require('../helper/web-url-validation');

var urlRepository = new ShortenedUrlsRepository();
module.exports = app => {
    // TODO: I'm not sure what the PUT function is for. To replace the id with a new id?
    // :id identificator of a URL
    app.put('/id/:id', function (req, res) {
        const shortenedUrl = urlRepository.get(req.params.id);

        //TODO: Check URL by regex and return 400 Error

        const result = urlRepository.update(shortenedUrl);

        if(result === -1){
            return res.status(404).send();
        }

        return res.status(200).send(result);
    })
    
    // :id identificator of a URL
    app.delete('/id/:id', function (req, res) {
        const result = urlRepository.delete(req.params.id);
        if(result === -1){
            return res.status(404).send();
        }
        return res.status(204).send();
    })
    
    // :id identificator of a URL 
    app.get('/id/:id', function (req, res) {
        return res.send(urlRepository.get(req.params.id));
    })

    app.get('/', function (req, res) {
        return res.send(urlRepository.getAll());
    })

    // :url URL to shorten
    app.post('/', function (req, res) {
        const url = req.body['url'];

        //TODO: Check URL by regex and return 400 Error
        if(!validateUrl(url)){
            return res.status(400).send("error");
        }

        const shortenedUrlId = url; //FIXME: Write  URL Shortener Function

        const shortenedUrlObject = new urlShorten(url, WINDOW_LOCATION_ORIGIN + ':' + PORT + '/' + shortenedUrlId, shortenedUrlId);
        urlRepository.push(shortenedUrlObject);
        return res.status(201).send(shortenedUrlObject);
        
    })

    app.delete('/', function(req, res){
        urlRepository = new ShortenedUrlsRepository();
        return res.status(204).send();
    })
}