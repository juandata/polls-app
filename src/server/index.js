//let searchMongo = require('./utils/searchMongo');
//let theModule = require('./utils/searchMongo');
const express = require('express');
const path  = require("path");
const app = express();
var _   = require('lodash'), config  = require('./config'), jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const routes = [
  "/", "/signup", "/other"
];
var ObjectId = require('mongodb').ObjectID;
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
var databaseSquema = mongoose.Schema({
  _id : String,
  name : String,
  options : mongoose.Schema.Types.Mixed,
  _v : Number

});
let UserCreated = mongoose.model("users", userSquema);

function createAccessToken() {
  return jwt.sign({
    iss: config.issuer,
    aud: config.audience,
    exp: Math.floor(Date.now() / 1000) + (60 * 15),
    scope: 'full_access',
    sub: "the subject",
    alg: 'HS256'
  }, config.secret);
}

app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.text()); // for parsing application/json
app.use(bodyParser.json()); // for parsing application/json
app.post("/mongo", function(req, res){
    /*connectToMongo("created from react wow!!");*/
    var bodyParsed = JSON.parse(req.body);
    let PollCreated = mongoose.model(bodyParsed.id, pollsSquema, bodyParsed.id );
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
  let PollsSet = mongoose.model(bodyParsed.userid, databaseSquema);
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
      /*PollsSet.find(function(err, polls){
      if (err) return console.error(err);
      console.log(polls);
    });*/
      /*PollsSet.find({ "_id.$oid" : "5b2abd911eecb41c2c67c1c5"}, function(err, docs){
      if (err) return console.error(err);
      console.log(docs);
    });*/
    //var fileId = mongoose.Types.ObjectId("5b2abd911eecb41c2c67c1c5");
    PollsSet.find(function(err, docs){
    if (err) return console.error(err);

      docs.map(function(el, ind){
        if(el._id == bodyParsed.id){
          res.json(el);
        }
      });
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
          console.log("Add another Email");
          res.send("Email already exists");
        }
    });
  }
});//receive the email and password to create a jwt and send it to the client.
app.post("/LoginUser", function(req, res){
  var bodyParsed = JSON.parse(req.body);
  mongoose.connect(address);
  let database = mongoose.connection;
  database.on('error', function(){
    var bodyError = {
      error : "There was a connection error, please try again later or verify your connection"
    }
    console.log("There was a connection error, please try again later or verify your connection");
    res.send(bodyError);
    console.error.bind(console, 'connection error:')
  });
  database.once('open', function(resp){
    //if we get here is because the user has been authenticated with credentials.
    //search for polls database of userid

     UserCreated.find({
          email : bodyParsed.email
      },
         function(err, doc){
              if (err) { console.error(err); return ans = "error";}
              if(!doc.length > 0){
                  resjson = { token : "Email does not exist"}
                  res.json(resjson)
                }
              else {
                if(doc[0].pass == bodyParsed.password){
                  let DatabaseData = mongoose.model("" + doc[0]._id + "",databaseSquema);
                  DatabaseData.find(function(err, polls){
                    if (err) console.log("the error is ", err);
                    let token = createAccessToken();
                    resjson = {}; resjson.token = token;
                    resjson.name = doc[0].name;
                    resjson.lastName = doc[0].lastName;
                    resjson.userName = doc[0].userName;
                    resjson.email = doc[0].email;
                    resjson.id = doc[0]._id;
                    resjson.polls = polls;
                    res.json(resjson)
                  });
                } else {
                  resjson = { token : "Password is wrong"}
                  res.json(resjson)
                }
          //email exists in the database, lets search for the Password
          //this should be encrypted
          /*UserCreated.find({pass : bodyParsed.password}, function(err, docs){
            if (err) return console.error(err);
              if(!docs.length > 0){
                resjson = { token : "Password is wrong"}
                res.json(resjson)
              } else {
                //here I create the auth token, this only happens if the user sends the correct email with the Password
                //the password should be encrypted!
                let token = createAccessToken();
                resjson = {}; resjson.token = token;
                console.log(docs);
                res.json(resjson)
              }
          });*/
      }

    });
  })
})
app.post("/PrivateRoute", function(req, res){
  //THIS SHOULD BE AUTHENTICATED
  var bodyParsed = JSON.parse(req.body);
  let decoded = jwt.decode(bodyParsed.token);
  res.json(decoded);
})
app.use(function(req, res) {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
})
app.listen(8080, () => console.log('Listening on port 8080!'));
