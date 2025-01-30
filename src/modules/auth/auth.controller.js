const autoBind = require("auto-bind");
const authService = require("./auth.service");
const { AuthMessage } = require("./auth.message");
const NodeEnv = require("../../common/constant/env.enum");
const CookieName = require("../../common/constant/cookie.enum");
const CookieNames = require("../../common/constant/cookie.enum");

class AuthController {
    #service;
    constructor(){
        autoBind(this)
        this.#service = authService
    }
    async sendOTP(req ,res , next) {
        try {
            const {mobile} = req.body;
            await this.#service.sendOTP(mobile);
            return res.json({
                message : AuthMessage.SendOtpSuccessfully
            })
            
        } catch (error) {
            next(error)
        }
    }
    async checkOTP(req ,res , next) {
        try {
            const {mobile , code } = req.body;
            const Token = await this.#service.checkOTP(mobile ,code);
            return res.cookie(CookieNames.AccessToken , Token , {
                httpOnly : true,
                secure : process.env.NODE_ENV === NodeEnv.Production 
            }).status(200).json({
                message : AuthMessage.LoginSuccessfully,
            })
            
        } catch (error) {
            next(error)
        }
    }
    async logout(req, res, next) {
        try {
            return res.clearCookie(CookieNames.AccessToken).status(200).json({
                message: AuthMessage.LogoutSuccessfully
            })
        } catch (error) {
            next(error)
        }
    }

}

module.exports = new AuthController()


