class ShortenedUrlsRepository extends Array{
    constructor(...items){
        super(...items);
}
    add(urlShorten){
        this.push(urlShorten);
    }
    get(id){
        return this.find(u => u.id === id);
    }

    update(urlShorten){
        const idx = this.findIndex(u => u.id == urlShorten.id);
        if(idx == -1)
            return -1;
        this[idx] = urlShorten;
        return this[idx];
    }
    
    delete(id){
        const idx = this.findIndex(u => u.id == id);
        if(idx === -1)
            return -1;

        return this.splice(idx, 1);
    }

    getAll(){
        return this;
    }
}

module.exports = { ShortenedUrlsRepository };