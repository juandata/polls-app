const userRouter = require('./routes/userRouter');
const express = require('express');
const address = require('./mongodb.config.js');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
let User = require('./utils/userSchema');
let bodyError = {
  error : "There was a connection error, please try again later or verify your connection"
}
//connect to mongodb
mongoose.connect(address.url);
let db = mongoose.connection;

const app = express();
const port = process.env.PORT || 8080;
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use('/api/', userRouter);
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})
