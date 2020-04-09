const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('../../config.json');
const { UserRepository } = require('../dal/users.repository');
const { User } = require('../models/user');
const userRepository = new UserRepository();

class UserService{
    constructor(){}

    authenticate(credentials){
        const user = userRepository.findByUserName(credentials.username);
        if(user && bcrypt.compareSync(credentials.password, user.hashedPassword)){
            return jwt.sign({sub: user.username}, config.JWT_SECRET, 
                // { expiresIn: '20min'}
            );
        }
    }

    register(credentials){
        const user = userRepository.findByUserName(credentials.username);
        if (user !== undefined)
            throw "Username " + credentials.username + " is already taken";
    
        const newUser = new User(credentials.username);
        if(credentials.password !== undefined){
            newUser.hashedPassword = bcrypt.hashSync(credentials.password, 10); // Auto-gen a salt and hash:
            userRepository.create(newUser);
            return newUser;
        }
    }
}

module.exports = {
    UserService
}