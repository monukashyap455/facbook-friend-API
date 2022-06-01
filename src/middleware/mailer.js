const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
        user: "monukashyaptest@gmail.com",
        pass: "monutest",
    },
})

module.exports = transporter;