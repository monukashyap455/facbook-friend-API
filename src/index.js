const dotenv = require("dotenv");  
dotenv.config();
const express = require("express");
const app = express();
const errHandler = require('./middleware/errorHandler');  // error handler file require 
const response = require('./helper/response')  // error dynamic response file require 

const autoCall = require("./database/mongoDb"); //database file require
const mainRoute = require("./routes/mainRoute"); // main route require

app.use(express.json())

autoCall()  //database function call
app.use(mainRoute)  //main routes call

// url error handler
app.use((req, res, next) => {
    next(response.pageNotFound());
});

app.use(errHandler); // custom and globel error handler 

const port = process.env.PORT // server start 
app.listen(port, () => console.log(`Server Start on port ${port}`));




