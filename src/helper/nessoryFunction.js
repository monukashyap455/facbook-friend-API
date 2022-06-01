const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// generate token for  jwt authentication
module.exports.tokenGenrate = (_id, expiresIn) => {
    const token = jwt.sign({ _id }, process.env.TOKENKEY, { expiresIn: expiresIn });
    return token;
};
// verify token for jwt authentication
module.exports.verifyToken = (token) => {
    return jwt.verify(token, process.env.TOKENKEY);
}
// bcrypt password
module.exports.hashPassword = async (password) => {
    const bcryptpassword = await bcrypt.hash(password, 10);
    return bcryptpassword;
};
// compare password
module.exports.comparePassword = async (password, userPassword) => {
    return await bcrypt.compare(password, userPassword);
};
// email address validation
module.exports.emailValidation = (email) => {
    const emailValidation = /^[a-z0-9._-]+@[a-z0-9.-]+.[a-z]+.[a-z0-9]{2,}$/;
    const emailValcheck = emailValidation.test(email);
    return emailValcheck;
}
// mobile number validation
module.exports.mobileValidation = (mobile) => {
    const mobileValidation = /^[0-9]{10,12}$/;
    const mobilevalcheck = mobileValidation.test(mobile)
    return mobilevalcheck;
}
// password validation
module.exports.passwordValidate = (password) => {
    const passwordValidate = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$\/\!#%*^?&])[a-zA-Z0-9\d@$\/\!#^%*?&]{8,}/;
    const passwordvalcheck = passwordValidate.test(password);
    return passwordvalcheck;
}



