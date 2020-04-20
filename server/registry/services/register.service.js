class RegisterService{
    constructor(){
        this.list = new Array();
    }

    add(serviceLocation){
        this.list[this.list.length] = serviceLocation;
        return this.list.length - 1;
    }
    
    getAll(){
        return this.list;
    }

}

module.exports = { RegisterService };