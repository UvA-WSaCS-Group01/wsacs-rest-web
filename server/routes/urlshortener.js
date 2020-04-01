const { WINDOW_LOCATION_ORIGIN, PORT } = require('../config/constants');
const { urlShorten } = require('../models/urlShorten');
const { ShortenedUrlsRepository } = require('../services/shortenedUrlRepository');
const { isUri } = require('../helper/web-url-validation');
const { IndexNotFoundError, NotFoundError } = require('../models/customErrors');
const code = require('../helper/code');

var urlRepository = new ShortenedUrlsRepository();

var keys = [];
var getSmallestIndex = () => {
    // TODO: make smarter
    if (keys.length == 0)  return 0;
    keys.sort((a, b) => a - b);
    return keys[keys.length - 1] + 1;
}

module.exports = app => {
    app.get('/', function (req, res) {
        return res.send(urlRepository.getAll());
    })

    // :url (in body) URL to shorten
    app.post('/', function (req, res) {
        const url = req.body['url'];


        try {
            isUri(url);
        } catch (error) {
            return res.status(400).send("error");
        }

        // if an url:
        let index = getSmallestIndex();
        keys.push(index); // TODO: This might be removed

        var shortenedUrlId = code.encode(index);
        const shortBaseUrl = WINDOW_LOCATION_ORIGIN + ':' + PORT;
        let shortenedUrlObject = new urlShorten(url, shortBaseUrl + '/' + shortenedUrlId, shortenedUrlId);
        shortenedUrlObject = urlRepository.add(shortenedUrlObject);

        return res.status(201).json(shortenedUrlId);
    })

    app.delete('/', function (req, res) {
        urlRepository = new ShortenedUrlsRepository();
        return res.status(204).send();
    })

    // :id identificator of a URL and new URL (url in body)
    app.put('/:id', function (req, res) {
        const newUrl = req.body['url'];
        try {
            isUri(newUrl);
            // TODO: validate if key is valid 
            let index = code.decode(req.params.id);
            console.log(index);
            // TODO: Specifiy if PUT is actually Update or Update with create
            const result = urlRepository.update(req.params.id, newUrl);
            return res.status(200).send();
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
    app.delete('/:id', function (req, res) {
        try {
            const result = urlRepository.delete(req.params.id);
            return res.status(204).send();
        } catch (error) {
            return res.status(404).send();
        }
    })

    // :id identificator of a URL 
    app.get('/:id', function (req, res) {
        try {
            var url = urlRepository.get(req.params.id);
            return res.status(301).json(url.originalUrl);
        } catch (error) {
            return res.status(404).send();
        }
    })
}