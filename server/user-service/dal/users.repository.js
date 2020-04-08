class UserRepository{
    constructor(){
        this.users = new Array();
    }

    find(userName, password){
        return this.users.find(u => u.userName === userName && u.password === password);
    }

    create(user){
        this.users.push(user);
    }
}


module.exports = { UserRepository };