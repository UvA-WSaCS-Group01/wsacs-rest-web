class UserRepository{
    constructor(){
        this.users = new Array();
    }

    find(username, password){
        return this.users.find(u => u.username === username && u.password === password);
    }

    findByUserName(username){
        return this.users.find(u => u.username === username);
    }

    create(user){
        this.users.push(user);
    }
}


module.exports = { UserRepository };