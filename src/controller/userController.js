const user = require("../model/userModel");
const nessoryFunction = require("../helper/nessoryFunction");
const lang = require("../helper/lang");
const response = require("../helper/response");

exports.userSignup = async (req, res) => {
    try {
        const { firstname, lastname, email, mobile, gender, age, username, userImage, password, conformPassword, } = req.body
        if (!(firstname && lastname && email && mobile && gender && age && username && userImage && password && conformPassword))
            return response.response(res, lang.ALLFIELD)

        if (!(nessoryFunction.emailValidation(email))) {
            return response.response(res, lang.INVALIDEMAIL)
        };
        const emailFind = await user.findOne({ email: email })
        if (emailFind != null) return response.response(res, lang.EMAILUSED)

        if (!(password == conformPassword)) {
            return response.response(res, lang.CONFORMPASSWORD)
        }
        if (!nessoryFunction.passwordValidate(password)) {
            return response.response(res, lang.STRONGPASS)
        };

        const hashedPassword = await nessoryFunction.hashPassword(password)

        const userData = new user({
            firstname,
            lastname,
            email,
            mobile,
            gender,
            age,
            username,
            userImage,
            password: hashedPassword,
        })
        await userData.save();
        response.response(res, lang.REGISTER)
    } catch (error) {
        console.log(error);
    }
}

module.exports.userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body
        if (!(email && password)) {
            return next(response.customError(lang.ALLFIELD));
        }

        const userDb = await user.findOne({ email: email });
        if (!userDb) {
            return next(response.customError(lang.INVALIDEMAIL));
        }
        const PasswordCompare = await nessoryFunction.comparePassword(password, userDb.password)
        if (!PasswordCompare) {
            return next(response.customError(lang.INVALIDPASSWORD));
        }
        const token = nessoryFunction.tokenGenrate(userDb._id, "1h")
        if(token == null){
            return next(response.customError(lang.TOKENREQUIRE))
        }

        response.successDataResponse(res, lang.LOGIN, token)
        
    } catch (error) {
        next(response.customError(error.message, 403));
    }
}