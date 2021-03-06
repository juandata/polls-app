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
const address = require('./mongodb.config.js');
const userRouter = require('./routes/userRouter');
var mongoose = require('mongoose');
//images api
var fs = require('fs');
var Schema = mongoose.Schema;
var multer = require('multer');
var upload = multer({ dest: __dirname + '/uploads/' });
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
  options : mongoose.Schema.Types.Mixed,
  image : {
    name : String,
    contentType  : String,
    data : mongoose.Schema.Types.Mixed
  }
});
var databaseSquema = mongoose.Schema({
      _id : mongoose.Schema.Types.ObjectId,
      name : String,
      description : String,
      options : mongoose.Schema.Types.Mixed,
      image : {
        name : String,
        contentType  : String,
        data : Buffer
      },
      _v : Number
    });
let puerto = process.env.PORT || 8080;
function createAccessToken(userInfo, polls) {
  return jwt.sign({
    iss: config.issuer,
    aud: config.audience,
    exp: Math.floor(Date.now() / 1000) + (60 * 15),
    scope: 'full_access',
    sub: "the subject",
    userInfo,
    polls,
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
    delete mongoose.connection.models[bodyParsed.id];
    let PollCreated = mongoose.model(bodyParsed.id, pollsSquema);
    mongoose.connect(address.url);
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
        user : bodyParsed.user,
        image : {
          name : "String",
          contentType  : "String", //obtener tipo
          data : {id : "value"} //obtener buffer
        }
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
  delete mongoose.connection.models[bodyParsed.userid];
  let PollsSet = mongoose.model(bodyParsed.userid, databaseSquema);
  mongoose.connect(address.url);
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
  delete mongoose.connection.models[bodyParsed.userid];
  let PollVoted = mongoose.model(bodyParsed.userid, databaseSquema);
  mongoose.connect(address.url);
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
      console.log(bodyParsed);
      /*PollVoted.find(function(err, docs){
        if (err) return console.error(err);
        console.log(docs);
      });*/
       PollVoted.findByIdAndUpdate({_id : bodyParsed.id }, updVote, {new : true}, function(err, upd) {
        if (err) console.log("there was an error!!")
        console.log("the updated is ", upd);
        res.json(upd);
      });
    })

      });
app.post("/submitUser", function(req, res){
  var bodyParsed = JSON.parse(req.body);
  delete mongoose.connection.models["users"];
  let UserCreated = mongoose.model("users", userSquema);
  //get the document that belong to the user
  mongoose.connect(address.url);
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
  //get email and password from user
  var bodyParsed = JSON.parse(req.body);
  mongoose.connect(address.url);
  let database = mongoose.connection;
  delete mongoose.connection.models["users"];
  database.on('error', function(){
    var bodyError = {
      error : "There was a connection error, please try again later or verify your connection"
    }
    console.log("There was a connection error, please try again later or verify your connection");
    res.send(bodyError);
    console.error.bind(console, 'connection error:')
  });
  database.once('open', function(resp){
    let UserCreated = mongoose.model("users", userSquema);
    //if we get here is because the user has been authenticated with credentials.
    //Search for the email in the users collection

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
                  delete mongoose.connection.models["" + doc[0]._id + ""];
                  let DatabaseData = mongoose.model("" + doc[0]._id + "",databaseSquema);
                  DatabaseData.find(function(err, polls){
                    if (err) console.log("the error is ", err);
                    //I create a token to be decoded later by the app
                    let token = createAccessToken(doc[0], polls);
                    resjson = {}; resjson.token = token;
                    let decoded = jwt.decode(token);
                    resjson.decoded = decoded;
                    res.json(resjson)
                  });
                } else {
                  resjson = { token : "Password is wrong"}
                  res.json(resjson)
                }
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
app.post("/UpdateToken", function(req, res){
  console.log("UPDATED TOKEN?");
  var bodyParsed = JSON.parse(req.body);
  let token = createAccessToken(bodyParsed.userInfo, bodyParsed.polls);
  console.log("UPDATED TOKEN?");
  resjson = {}; resjson.token = token;
  console.log(token);
  res.json(resjson)
})
app.get("/rutaprueba", (req, res)=>{
  let puerto = app.listen().address().port;
  console.log(puerto);
  res.send("Servidor Express funcionando!");
})
app.use("/API", (req, res, next)=>{
  mongoose.connect(address.url);
  next();
},userRouter);
app.use(function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
})
app.listen(puerto, () => console.log('Listening on port 8080! the environment is:', app.listen().address().port));
