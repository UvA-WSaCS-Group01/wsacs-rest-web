class urlShorten{
    constructor(originalUrl, shortenUrl, id){
        this.originalUrl=originalUrl;
        this.shortenUrl=shortenUrl;
        this.id=id;
        this.createdAt;
        this.updatedAt;
    }
}

module.exports = { urlShorten };