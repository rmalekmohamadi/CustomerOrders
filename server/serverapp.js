const express = require("express")
const bodyParser = require("body-parser")
const fs = require('fs');
var cors = require('cors');
// create our express app
const app = express()
const fileUpload = require('express-fileupload');
var delay = require('express-delay');

// Delay all responses for 1 second
app.use(delay(0));

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

// middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static', express.static('static'))
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));

// route
const routes = require('./routes/Routes')
app.use('/', routes)
//start server
app.listen(3001, ()=>{
    console.log("listeniing at port:3001")
}) 