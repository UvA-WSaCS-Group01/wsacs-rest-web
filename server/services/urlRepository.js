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
        if(urlShorten === undefined){
            // resource does not exist. Update createdAt field of passed object.
            
            newUrlShorten.createdAt = now;
            this.map.set(newUrlShorten.id, newUrlShorten);
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