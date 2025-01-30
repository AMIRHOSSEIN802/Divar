const autoBind = require("auto-bind");
const UserModel = require("./user.model");
const {randomInt} = require("crypto");
const createHttpError = require("http-errors");
const { AuthMessage } = require("./user.message");
const jwt = require("jsonwebtoken")

class userService {
    #model;
    constructor(){
        autoBind(this);
        this.#model = UserModel
    }

}
module.exports = new userService()