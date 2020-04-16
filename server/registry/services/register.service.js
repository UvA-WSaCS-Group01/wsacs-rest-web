// const { NotFoundError } = require('../models/customErrors');

class RegisterService{
    constructor(){
        this.list = new Array();
    }

    add(service){
        this.list[this.list.length] = service;
        return this.list.length - 1;
    }
    
    getAll(){
        return this.list;
    }

}

module.exports = { RegisterService };