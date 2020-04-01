const { IndexNotFoundError, NotFoundError } = require('../models/customErrors')

class ShortenedUrlsRepository extends Array{
    constructor(...items){
        super(...items);
}
    add(urlShorten){
        this.push(urlShorten);
    }
    get(id){
        const shortenedUrl = this.find(u => u.id === id);
        if(shortenedUrl == undefined)
            throw new NotFoundError("error")
    }

    update(urlShorten){
        const idx = _findIndex(urlShorten.id);

        this[idx] = urlShorten;
        return this[idx];
    }

    delete(id){
        const idx = _findIndex(id);

        return this.splice(idx, 1);
    }

    getAll(){
        return this;
    }

    _findIndex(urlId){
        const idx = this.findIndex(u => u.id == urlId);
        if(idx == -1)
            throw new IndexNotFoundError("error");
        
        return idx;
    }
}

module.exports = { ShortenedUrlsRepository };