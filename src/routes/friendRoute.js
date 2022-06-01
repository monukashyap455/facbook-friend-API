const express = require("express");
const router = (express.Router());
const friendController = require("../controller/friendController");
const jwtAuth = require("../middleware/jwtAuth");


router.get('/users', jwtAuth.verifyToken, friendController.allUsers);
router.post('/request/:id', jwtAuth.verifyToken, friendController.sendRequest);
router.post('/accpect/:id', jwtAuth.verifyToken, friendController.accpectRequest);
router.get('/request', jwtAuth.verifyToken, friendController.getAllFriendRequest);
router.get('/friends', jwtAuth.verifyToken, friendController.getAllFriend);
router.post('/unfriend/:id', jwtAuth.verifyToken, friendController.unfriend);


module.exports = router;