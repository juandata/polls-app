
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
var PollCreated = mongoose.model('Polls', pollsSquema);
console.log("do i get started???");

app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.text()); // for parsing application/json
app.use(bodyParser.json()); // for parsing application/json

app.get('/api/getUsername', (req, res) => res.send({
  username: "Hola soy express"
}));

app.post("/mongo", function(req, res){
    /*connectToMongo("created from react wow!!");*/
    var bodyParsed = JSON.parse(req.body);
    mongoose.connect(address);
    var db = mongoose.connection;
    db.on('error', function() {
      console.error.bind(console, 'connection error:')
      res.send("There was a connection error, please try again later or verify your connection")
    });
    db.once('open', function() {
        var newPoll = new PollCreated({
        name: bodyParsed.pollName,
        description : bodyParsed.description,
        options : bodyParsed.options
      });
      newPoll.save(function (err, fluffy) {
        if (err) return console.error(err);
        console.log("Poll saved to mongo");
      });
    });
    /*
    Kitten.find(function (err, kittens) {
      if (err) return console.error(err);
      console.log(kittens);
    })
    Kitten.find({ name: /^fluff/ },function (err, kittens) {
      if (err) return console.error(err);
      console.log(kittens);
    })*/

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
