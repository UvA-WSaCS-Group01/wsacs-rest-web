const { UserRepository } = require('../dal/users.repository');
const userRepository = new UserRepository();

class UserService{
    constructor(){

    }

    async authenticate({username, password}){

    }

    async register(user){

    }

    async find(userName){

    }
}

module.exports = {
    UserService
}