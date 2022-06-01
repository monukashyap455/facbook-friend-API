require('dotenv').config();
const mongoose = require('mongoose');
const user = require("../model/userModel");
const bcrypt = require("bcrypt");


module.exports = async (req, res) => {

  try {

    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected");

    // const userData = user({
    //   firstname: "Monu ",
    //   lastname: "Kashyap",
    //   email: "monu@yopmail.com",
    //   mobile: "1234567892",
    //   gender: "male",
    //   age: 22,
    //   username: "Monu Kashyap",
    //   password: await bcrypt.hash("Monu@123", 10),
    //   userImage: "Monu.jpg",
    //   isAdmin: true,
    //   status: true
    // })
    // const adminFind = await user.findOne({ email: "monu@yopmail.com" })
    // if (!adminFind) {
    //   await userData.save()
    // }

  } catch (error) {
    console.log(error);
  }
}
