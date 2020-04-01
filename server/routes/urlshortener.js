const { WINDOW_LOCATION_ORIGIN, PORT } = require('../config/constants');

const { urlShorten } = require('../models/urlShorten');
const { ShortenedUrlsRepository } = require('../services/shortenedUrlRepository');
const { isUri } = require('../helper/web-url-validation');
const { generate } = require('../middleware/shortid');
const { IndexNotFoundError, NotFoundError } = require('../models/customErrors');

var urlRepository = new ShortenedUrlsRepository();
module.exports = app => {
    // :id identificator of a URL and new URL (url in body)
    app.put('/id/:id', function (req, res) {
        const newUrl = req.body['url'];
        try {
            isUri(newUrl);
            const result = urlRepository.update(req.params.id, newUrl);
            return res.status(200).send(result);
        } catch (error) {
            switch (true) {
                case (error instanceof IndexNotFoundError):
                    return res.status(404).send();
                case (error instanceof URIError):
                    return res.status(400).send("error");
                default:
                    break;
            }
        }
    })
    
    // :id identificator of a URL
    app.delete('/id/:id', function (req, res) {
        try {
            const result = urlRepository.delete(req.params.id);
            return res.status(204).send();       
        } catch (error) {
            return res.status(404).send();
        }
    })
    
    // :id identificator of a URL 
    app.get('/id/:id', function (req, res) {
        try {
            var url = urlRepository.get(req.params.id);
            return res.status(301).send(url);
        } catch (error) {
            return res.status(404).send();
        }
    })

    app.get('/', function (req, res) {
        return res.send(urlRepository.getAll());
    })

    // :url (in body) URL to shorten
    app.post('/', function (req, res) {
        const url = req.body['url'];

        try {
            isUri(url);
            const shortenedUrlId = generate(); 
            const shortBaseUrl = WINDOW_LOCATION_ORIGIN + ':' + PORT;
            let shortenedUrlObject = new urlShorten(url, shortBaseUrl + '/' + shortenedUrlId, shortenedUrlId);
            shortenedUrlObject = urlRepository.add(shortenedUrlObject);
            return res.status(201).send(shortenedUrlObject);
        } catch (error) {
            return res.status(400).send("error");
        }        
    })

    app.delete('/', function(req, res){
        urlRepository = new ShortenedUrlsRepository();
        return res.status(204).send();
    })
}