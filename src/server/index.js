
const express = require('express');
const path  = require("path");
const app = express();
const bodyParser = require('body-parser');
const routes = [
  "/", "/signup", "/other"
];
const address = "mongodb://pollsapp:Fray2017@ds231740.mlab.com:31740/pollsapp";
//var mongodb = require('mongodb');
//var MongoClient = mongodb.MongoClient;
var mongoose = require('mongoose');
var pollsSquema = mongoose.Schema({
  name: String,
  description : String,
  options : Array
});


app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.text()); // for parsing application/json
app.use(bodyParser.json()); // for parsing application/json

app.get('/api/getUsername', (req, res) => res.send({
  username: "Hola soy express"
}));

app.post("/mongo", function(req, res){
    /*connectToMongo("created from react wow!!");*/
    let PollCreated = mongoose.model('javier', pollsSquema);
    var bodyParsed = JSON.parse(req.body);
    mongoose.connect(address);
    let db = mongoose.connection;
    db.on('error', function() {
      var bodyError = {
        error : "There was a connection error, please try again later or verify your connection"
      }
      console.log("There was a connection error, please try again later or verify your connection");
      res.send(bodyError);
      console.error.bind(console, 'connection error:')

    });
    db.once('open', function() {
        var newPoll = new PollCreated({
        name: bodyParsed.pollName,
        description : bodyParsed.description,
        options : bodyParsed.options
      });
      newPoll.save(function (err, polls) {
        if (err) return console.error(err);
        console.log("Poll saved to mongo");
        res.send(polls);
      });
    });
});
app.post("/getMongo", function(req, res){
  //var bodyParsed = JSON.parse(req.body);
  let PollCreated = mongoose.model('kiarauser', pollsSquema);
  console.log(req.body);
  mongoose.connect(address);
  var database = mongoose.connection;
  database.on('error', function(){
    var bodyError = {
      error : "There was a connection error, please try again later or verify your connection"
    }
    console.log("There was a connection error, please try again later or verify your connection");
    res.send(bodyError);
    console.error.bind(console, 'connection error:')

  });
  database.once('open', function(){
    //get all
    PollCreated.find(function(err, polls){
      if (err) return console.error(err);
      //console.log("connected successfully", polls);
    });
    //filter search
    PollCreated.find({_id : req.body}, function(err, poll){
      console.log("connected successfully", poll);
      res.json(poll)
    });
  })
});
app.use(function(req, res) {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
})
app.listen(8080, () => console.log('Listening on port 8080!'));

function connectToMongo(voto){
MongoClient.connect(address, function(err, db) {
  //(Focus on This Variable)
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
    return "Unable to connect";
  } else {
    console.log('Connection established to mlab.com');
    // do some work here with the database.
    var database = db.db("pollsapp");
    database.createCollection(voto, function(err, res) { //se usa el método createCollection
      if (err) throw err;
      db.close();
      return "Connection established to mlab.com";
    });
  }
});
}
