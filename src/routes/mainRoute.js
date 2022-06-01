const express = require("express");
const router = (express.Router());

const userRoute  = require("../routes/userRoute");
const friend = require("../routes/friendRoute");


router.use(userRoute)
router.use(friend)


module.exports = router;