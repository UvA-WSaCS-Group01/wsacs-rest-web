const { WINDOW_LOCATION_ORIGIN, PORT } = require('../config/constants');
const { urlShorten } = require('../models/urlShorten');
const { ShortenedUrlsRepository } = require('../services/urlRepository');
const { isUri } = require('../helper/web-url-validation');
const { NotFoundError } = require('../models/customErrors');
const { Code } = require('../helper/code');
const { authenticateJWT } = require('../helper/jwt-auth');

const urlRepository = new ShortenedUrlsRepository();
const code = new Code();

module.exports = app => {
    app.get('/', authenticateJWT, function (req, res) {
        return res.send(urlRepository.getAll());
    })

    // :url (in body) URL to shorten
    app.post('/', authenticateJWT, function (req, res) {
        const url = req.body['url'];

        try {
            isUri(url);
        } catch (error) {
            return res.status(400).send("error\n");
        }

        let shortenedUrlId = code.getAutoincrementedId(urlRepository.getAll());
        const shortBaseUrl = WINDOW_LOCATION_ORIGIN + ':' + PORT; // TODO: Why would this be necessary?
        let shortenedUrlObject = new urlShorten(url, shortBaseUrl + '/' + shortenedUrlId, shortenedUrlId);

        shortenedUrlObject = urlRepository.add(shortenedUrlObject);

        return res.status(201).json(shortenedUrlId +"\n");
    })

    app.delete('/', authenticateJWT, function (req, res) {
        urlRepository.deleteAll();
        return res.status(204).send();
    })

    // :id identificator of a URL and new URL (url in body)
    app.put('/:id', authenticateJWT, function (req, res) {
        const newUrl = req.body['url'];
        try {
            isUri(newUrl);
            const shortBaseUrl = WINDOW_LOCATION_ORIGIN + ':' + PORT;
            let shortenedUrlObject = new urlShorten(newUrl, shortBaseUrl + '/' + req.params.id, req.params.id);
            urlRepository.update(shortenedUrlObject);
            return res.status(200).send();
        } catch (error) {
            switch (true) {
                case (error instanceof NotFoundError):
                    return res.status(404).send();
                case (error instanceof URIError):
                    return res.status(400).send("error\n");
                default:
                    return res.status(400).send("error\n");
            }
        }
    })

    // :id identificator of a URL
    app.delete('/:id', authenticateJWT, function (req, res) {
        try {
            urlRepository.delete(req.params.id);
            return res.status(204).send();
        } catch (error) {
            return res.status(404).send();
        }
    })

    // :id identificator of a URL 
    app.get('/:id', function (req, res) {
        try {
            const url = urlRepository.get(req.params.id);
            return res.status(301).json(url.originalUrl + "\n");
        } catch (error) {
            return res.status(404).send();
        }
    })
}