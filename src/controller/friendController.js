const response = require("../helper/response");
const lang = require("../helper/lang");

const user = require("../model/userModel");
const friend = require("../model/friendModel");
const { isObjectIdOrHexString } = require("mongoose");


exports.allUsers = async (req, res, next) => {
    try {
        const loginUser = req.user
        let users = []
        const userFind = await user.find({ _id: { $nin: loginUser._id } });
        userFind.forEach(element => {
            const data = {
                name: element.firstname + " " + element.lastname,
                _id: element._id,
                email: element.email,
            }
            users.push(data)

        });
        res.status(200).json({
            "status": "success",
            "users": users
        })

    } catch (error) {
        next(response.customError(error.message, 403));

    }

}

exports.sendRequest = async (req, res, next) => {
    try {

        const _id = req.params.id;
        const me = req.user

        const x = []
        const data = await user.findOne({ _id: me._id })
        data.friends.forEach(element => {
            if (element._id == _id) {
                x.push(element)
            }
        });
        if (x.length == 1) {
            return res.status(402).json({
                "status": "error",
                "message": "you have already sent friend request"
            })
        }

        const userDB = await user.findOne({ _id: _id })
        await user.updateOne({ _id: _id }, {
            $push: {
                friends: {
                    _id: me._id,
                    name: me.firstname,
                    status: "pending",
                    sentByMe: false,
                    inbox: []
                }
            }
        });
        await user.updateOne({ _id: me._id }, {
            $push: {
                friends: {
                    _id: userDB._id,
                    name: userDB.firstname,
                    status: "pending",
                    sentByMe: true,
                    inbox: []
                }
            }
        });
        res.status(200).json({
            "status": "success",
            "message": "Friend request has been sent"
        })

    } catch (error) {
        next(response.customError(error.message, 403));
    }

}

exports.accpectRequest = async (req, res, next) => {
    try {
        const _id = req.params.id;
        const me = req.user

        const x = []
        me.friends.forEach(element => {
            if (element._id == _id && element.status == 'pending') {
                x.push(element)
            }
        });
        if (x.length == 0) {
            return res.status(402).json({
                "status": "error",
                "message": "user has been already your friend"
            })
        }

        const userDB = await user.findOne({ _id: _id })

        await user.updateOne({ _id: _id }, {
            $push: {
                notification: {
                    type: "friend request accpected",
                    content: me.firstname + " " + "accpect your friend request ",
                    createdAt: Date.now()
                }
            }
        });
        let update1 = await user.updateOne({
            $and: [{
                "_id": _id
            }, {
                "friends._id": me._id
            }]
        }, {
            $set: {
                'friends.$.status': "Accpected"
            }
        })
        let update2 = await user.updateOne({
            $and: [{
                "_id": me._id
            }, {
                "friends._id": userDB._id
            }]
        }, {
            $set: {
                'friends.$.status': "Accpected"
            }
        })
        res.status(200).json({
            "status": "success",
            "message": "Friend request has been accpected"
        })
    } catch (error) {
        next(response.customError(error.message, 403));
    }

}

exports.getAllFriendRequest = async (req, res, next) => {
    try {

        const currentUser = req.user
        let request = []
        let requestFind = await user.findOne({ _id: currentUser._id })
        requestFind.friends.forEach(element => {
            if (element.status == "pending" && element.sentByMe == false) {
                request.push(element)
            }
        });
        res.status(200).json({
            "status": "success",
            "friend request": request
        })

    } catch (error) {
        next(response.customError(error.message, 403));

    }
}

exports.getAllFriend = async (req, res, next) => {
    try {

        const currentUser = req.user
        let friends = []
        currentUser.friends.forEach(element => {
            if (element.status == "Accpected") {
                friends.push(element)
            }
        });
        if (friends == null) return res.send("your friend list is empty")
        res.status(200).json({
            "status": "success",
            "Friends": friends
        })

    } catch (error) {
        next(response.customError(error.message, 403));

    }
}


exports.unfriend = async (req, res, next) => {
    try {
        unfriendId = req.params.id
        currentUser = req.user

        unfriendUser = await user.findOne({ _id: unfriendId })

        currentUser.friends = currentUser.friends.filter(element => {
            let data = element._id != unfriendId;
            return data;
        });
        
        await currentUser.save();
        unfriendUser.friends = unfriendUser.friends.filter(element => {
            let data = element._id == currentUser._id;
            return data;
           
        });
        await unfriendUser.save();

        res.status(200).json({
            "status": "success",
            "message": "user has been unfriend"
        })


    } catch (error) {
        next(response.customError(error.message, 403));
    }
}




