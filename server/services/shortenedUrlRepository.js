const { IndexNotFoundError, NotFoundError } = require('../models/customErrors')

class ShortenedUrlsRepository extends Array{
    constructor(...items){
        super(...items);
}
    add(urlShorten){
        urlShorten.createdAt = Date.now();
        urlShorten.updatedAt = Date.now();
        this.push(urlShorten);
        return urlShorten;
    }
    get(id){
        const shortenedUrl = this.find(u => u.id === id);
        if(shortenedUrl == undefined)
            throw new NotFoundError("error")

        return shortenedUrl;
    }

    update(urlId, newUrl){
        const idx = this._findIndex(urlId);

        this[idx].originalUrl = newUrl;
        this[idx].updatedAt = Date.now();
        return this[idx];
    }

    delete(id){
        const idx = this._findIndex(id);

        return this.splice(idx, 1);
    }

    getAll(){
        return Object.keys(this);
    }

    _findIndex(urlId){
        const idx = this.findIndex(u => u.id == urlId);
        if(idx == -1)
            throw new IndexNotFoundError("error");
        
        return idx;
    }
}

module.exports = { ShortenedUrlsRepository };