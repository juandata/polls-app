const userRouter = require('./routes/userRouter');
const express = require('express');
const address = require('./mongodb.config.js');
let Grid = require('gridfs-stream');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
let User = require('./utils/userSchema');
let bodyError = {
  error : "There was a connection error, please try again later or verify your connection"
}
//connect to mongodb
mongoose.connect(address.url);
let db = mongoose.connection;

//Grifd
Grid.mongo = mongoose.mongo;
let gfs = Grid(db);



const app = express();
const port = process.env.PORT || 8081;
app.use(express.static('dist'));
app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use('/api/', userRouter);
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})

module.exports.metod = gfs
