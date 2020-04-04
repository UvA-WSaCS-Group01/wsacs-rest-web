import axios from 'axios'

export default class Api {

    _http
    constructor (url) {
        this._http = axios.create({
            baseURL: url,
            headers: { 'Content-Type': 'application/json' }
        })
    }   

    get_by_id(id) {
        id =  encodeURIComponent(id);
        return this._http.get(`/${id}`)
    }

    async put_by_id(id, url) {
        id =  encodeURIComponent(id);
        return await this._http.put(`/${id}`, {
            url: url
          });
    }

    async delete_by_id(id) {
        id =  encodeURIComponent(id);
        return await this._http.delete(`/${id}`)
    }

    async get() {
        return await this._http.get("/");
    }

    async post(url) {
        return await this._http.post("/", {
            url: url
          });
    }

    async delete() {
        return await this._http.delete("/");
    }
    
}