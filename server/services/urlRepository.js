const { NotFoundError } = require('../models/customErrors');

class ShortenedUrlsRepository{
    constructor(){
        this.map = new Map();
    }

    add(urlShorten){
        const now = Date.now();
        urlShorten.createdAt = now;
        urlShorten.updatedAt = now;
        this.map.set(urlShorten.id, urlShorten);
    }
    get(id){
        const url = this.map.get(id);
        if(url === undefined)
            throw new NotFoundError("error")
        return url;
    }

    update(newUrlShorten){
        const now = Date.now();
        let urlShorten = this.map.get(newUrlShorten.id);
        console.log(urlShorten);
        if(urlShorten === undefined){
            throw new NotFoundError("error");
        } else{
            urlShorten.updatedAt = now;
            urlShorten.originalUrl = newUrlShorten.originalUrl
            this.map.set(urlShorten.id, urlShorten);
        }
        
    }

    delete(id){
        const isDeleted = this.map.delete(id);
        if(!isDeleted)
            throw new NotFoundError("error") 
        return isDeleted;
    }

    getAll(){
        return Array.from(this.map.keys());
    }

    deleteAll(){
        this.map.clear();
    }
}

module.exports = { ShortenedUrlsRepository };