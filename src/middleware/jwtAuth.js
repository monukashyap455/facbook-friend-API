const jwt = require('jsonwebtoken');
const user = require("../model/userModel");

const verifyToken = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            token = req.headers.authorization.split(' ')[1];
        }
        if (token == null) {
            return res.status(403).json("token is require for this route");
        }
        const verifyUser = jwt.verify(token, process.env.TOKENKEY);

        const userFind = await user.findById({ _id: verifyUser._id });
        if (!userFind) {
            return res.status(404).json({ message: "Invalid token please try again later"})
        }
        req.user = userFind
        next()
    } catch (error) {
        res.send(error)
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user._id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            res.status(403).json("you are  not allowed in this routes")
        }
    });
};

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next()
        } else {
            res.status(403).json("this route only admin access")
        }
    });
};


module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
}