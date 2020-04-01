const { WINDOW_LOCATION_ORIGIN, PORT } = require('../config/constants');

const { urlShorten } = require('../models/urlShorten');
const { ShortenedUrlsRepository } = require('../services/shortenedUrlRepository');
const { isUri } = require('../helper/web-url-validation');
const { IndexNotFoundError, NotFoundError } = require('../models/customErrors')

var urlRepository = new ShortenedUrlsRepository();
module.exports = app => {
    // TODO: I'm not sure what the PUT function is for. To replace the id with a new id?
    // :id identificator of a URL
    app.put('/id/:id', function (req, res) {
        try {
            const shortenedUrl = urlRepository.get(req.params.id);
            const result = urlRepository.update(shortenedUrl);

            
            //TODO: Check URL by regex and return 400 Error

            return res.status(200).send(result);
        } catch (error) {
            switch (true) {
                case (error instanceof NotFoundError):
                    return res.status(404).send();
                    break;
                case (error instanceof IndexNotFoundError):
                    return res.status(404).send();
                    break;
            
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
            return res.status(301).send(urlRepository.get(req.params.id));
        } catch (error) {
            return res.status(404).send();
        }
    })

    app.get('/', function (req, res) {
        return res.send(urlRepository.getAll());
    })

    // :url URL to shorten
    app.post('/', function (req, res) {
        const url = req.body['url'];

        //TODO: Check URL by regex and return 400 Error
        try {
            isUri(url);
            const shortenedUrlId = url; //FIXME: Write  URL Shortener Function
            const shortBaseUrl = WINDOW_LOCATION_ORIGIN + ':' + PORT;
            const shortenedUrlObject = new urlShorten(url, shortBaseUrl + '/' + shortenedUrlId, shortenedUrlId);
            urlRepository.push(shortenedUrlObject);
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