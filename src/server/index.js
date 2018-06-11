
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
var userSquema = mongoose.Schema({
    name  : String,
    lastName : String,
    userName: String,
    email : String,
    pass : String,
    gender : String
});
var pollsSquema = mongoose.Schema({
  name: String,
  description : String,
  options : mongoose.Schema.Types.Mixed
});


app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.text()); // for parsing application/json
app.use(bodyParser.json()); // for parsing application/json

app.get('/api/getUsername', (req, res) => res.send({
  username: "Hola soy express"
}));
//let PollCreated = mongoose.model('javier', pollsSquema);
app.post("/mongo", function(req, res){
    /*connectToMongo("created from react wow!!");*/
    var bodyParsed = JSON.parse(req.body);
    let PollCreated = mongoose.model(bodyParsed.user, pollsSquema, bodyParsed.user );
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
        options : bodyParsed.options,
        user : bodyParsed.user
      });
      newPoll.save(function (err, polls) {
        if (err) return console.error(err);
        console.log("Poll saved to mongo");
        res.send(polls);
      });
    });
});
app.post("/getMongo", function(req, res){
  var bodyParsed = JSON.parse(req.body);
  //get the document that belong to the user
  let PollCreated = mongoose.model(bodyParsed.user, pollsSquema, bodyParsed.user);
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
    });
    //filter search, get the document with the id
    PollCreated.find({_id : bodyParsed.id}, function(err, poll){
      res.json(poll)
    });
  })
});
app.post("/voteMongo", function(req, res){
  var bodyParsed = JSON.parse(req.body);
  //get the document that belong to the user
  let PollCreated = mongoose.model(bodyParsed.user, pollsSquema, bodyParsed.user);
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
      //update
      var updVote = {}, voto = bodyParsed.vote;
      updVote[voto] = bodyParsed.voteVal + 1;
      PollCreated.findByIdAndUpdate({_id :bodyParsed.id }, updVote, {new : true}, function(err, upd) {
        if (err) console.log("there was an error!!")
        console.log(upd);
        res.json(upd);
        });
      })
});
app.post("/submitUser", function(req, res){
  var bodyParsed = JSON.parse(req.body);
  //get the document that belong to the user
  let UserCreated = mongoose.model("users", userSquema);
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
  database.once('open', function(resp) {
    /*To find all the documents in the model:
    UserCreated.find(function(err, users){
      if (err) return console.error(err);
      console.log(users);
    });*/
    //filtering the search
  UserCreated.find({
      //userName : bodyParsed.userName, email : bodyParsed.email
       userName : bodyParsed.userName
    },
    function(err, doc){
      if (err) return console.error(err);
      if(!doc.length > 0){
        searchEmail(bodyParsed.email);
      } else {
          console.log("Choose another userName");
          res.send("Username already exists");
    }
    })
  });
  function searchEmail(userEmail){
    UserCreated.find({email : userEmail}, function(err, docs){
      if (err) return console.error(err);
        if(!docs.length > 0){
          let newUser = new UserCreated({
              name  : bodyParsed.name,
              lastName : bodyParsed.lastName,
              userName: bodyParsed.userName,
              email : bodyParsed.email,
              pass : bodyParsed.password,
              gender : bodyParsed.gender
            });
              newUser.save(function (err, user) {
              if (err) return console.error(err);
              console.log("User saved to mongo");
              res.send("Success");
            });
        } else {
          res.send("Email already exists");
        }
    });

  }
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
