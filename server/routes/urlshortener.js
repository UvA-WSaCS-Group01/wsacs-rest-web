const { WINDOW_LOCATION_ORIGIN, PORT } = require('../config/constants');
const { urlShorten } = require('../models/urlShorten');
const { ShortenedUrlsRepository } = require('../services/urlRepository');
const { isUri } = require('../helper/web-url-validation');
const { IndexNotFoundError, NotFoundError } = require('../models/customErrors');
const code = require('../helper/code');

const urlRepository = new ShortenedUrlsRepository();

var numericId = 0;
var getAutoincrementedId = () => {
    let id = code.encode(numericId);
    let keys = urlRepository.getAll();
    while (keys.includes(id)) {
        if (numericId == Number.MAX_SAFE_INTEGER) throw new Error("Reached Id limit");
        numericId++;
        id = code.encode(numericId);
    }
    return id;
}

module.exports = app => {
    app.get('/api/', function (req, res) {
        return res.send(urlRepository.getAll());
    })

    // :url (in body) URL to shorten
    app.post('/api/', function (req, res) {
        const url = req.body['url'];

        try {
            isUri(url);
        } catch (error) {
            return res.status(400).send("error");
        }

        let shortenedUrlId = getAutoincrementedId();
        const shortBaseUrl = WINDOW_LOCATION_ORIGIN + ':' + PORT; // TODO: Why would this be necessary?
        let shortenedUrlObject = new urlShorten(url, shortBaseUrl + '/' + shortenedUrlId, shortenedUrlId);

        shortenedUrlObject = urlRepository.add(shortenedUrlObject);

        return res.status(201).json(shortenedUrlId);
    })

    app.delete('/api/', function (req, res) {
        urlRepository.deleteAll();
        return res.status(204).send();
    })

    // :id identificator of a URL and new URL (url in body)
    app.put('/api/:id', function (req, res) {
        const newUrl = req.body['url'];
        try {
            isUri(newUrl);
            const shortBaseUrl = WINDOW_LOCATION_ORIGIN + ':' + PORT;
            let shortenedUrlObject = new urlShorten(newUrl, shortBaseUrl + '/' + req.params.id, req.params.id);
            urlRepository.update(shortenedUrlObject);
            return res.status(200).send();
        } catch (error) {
            switch (true) {
                case (error instanceof IndexNotFoundError):
                    return res.status(404).send();
                case (error instanceof URIError):
                    return res.status(400).send("error");
                default:
                    return res.status(400).send("error");
            }
        }
    })

    // :id identificator of a URL
    app.delete('/api/:id', function (req, res) {
        try {
            urlRepository.delete(req.params.id);
            return res.status(204).send();
        } catch (error) {
            return res.status(404).send();
        }
    })

    // :id identificator of a URL 
    app.get('/api/:id', function (req, res) {
        try {
            const url = urlRepository.get(req.params.id);
            return res.status(301).json(url.originalUrl);
        } catch (error) {
            return res.status(404).send();
        }
    })
}