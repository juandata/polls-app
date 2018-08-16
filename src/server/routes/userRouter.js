const express = require('express');
const userRouter = express.Router();
const path  = require("path");
var mongoose = require('mongoose');
var multer = require('multer');
var fs = require('fs');
let User = require('../utils/userSchema');
let Texto = require('../utils/textSchema');
let Image = require('../utils/imagesSchema');
//let Polls = require('../utils/pollsSchema');
let pollsSquema = mongoose.Schema({
  name: String,
  description : String,
  options : mongoose.Schema.Types.Mixed,
  image : {
    name : String,
    contentType  : String,
    base64 : String
  }
});
//let getGfs = require('../api_server');
var storage = multer.diskStorage({
    destination :  __dirname + '/uploads/'
  ,
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({storage: storage });

userRouter
    .get('/', (req,res) => {
      console.log("alguien quiere algo en la raiz")
      let src =  path.join(__dirname, '/archivoprueba.txt');
      User.find({}, (err, users) => {
            res.json(users)
        })
    })
    //route test
    .get('/prueba', (req, res)=>{
      console.log("solicitud");
      res.send("ruta funcionando");
    })
    .get('/users/', (req,res) => {
      console.log(req.query);
      User.findById(req.query.id, (err, user) =>{
        res.json(user);
      });
    })
    .post('/users/', (req, res) =>{
            let newUser = new User(req.body);
            newUser.save(function(err, saved){
               if(err) return console.log(err);
               res.send(saved);
         });

    })
    .put('/users/', (req, res)=>{
      let databaseUser = {};
      //get the database item without modifications
      User.findById(req.query.id, (err, user)=>{
        databaseUser = user._doc;
      })
      //update the new database item with modifications
      let userUpdated = {...databaseUser, ...req.body};
      User.findByIdAndUpdate(req.query.id, userUpdated, {new : true}, function(err, updated){
        if(err) return console.log(err);
        res.json(updated);
      });
    })
    .delete('/users/', (req, res)=>{
      User.deleteOne({_id : req.query.id}, function(err, doc){
        if (err) return console.log(err);
        res.send("User " + req.query.id + " erased!")
      });
    })

    //multimedia content
    .post('/images/', upload.single("file-item"), (req, res)=>{

      let ans = req.file;
      let valor = JSON.parse(req.body.otracosa);
      console.log(valor);
      delete mongoose.connection.models[valor.id];
      let PollCreated = mongoose.model(valor.id, pollsSquema);
      var newPoll = new PollCreated({
      name: valor.pollName,
      description : valor.description,
      options : valor.options,
      image : {
        name : valor.image.name,
        contentType  : valor.image.contentType, //obtener tipo
        base64 : fs.readFileSync(ans.path).toString('base64')  //obtener buffer
      }
    });
    newPoll.save(function (err, polls) {
      if (err) return console.error(err);
      console.log("Poll saved to mongo");
      res.send("Encuesta con imagen guardada satisfactoriamente!");
    });

      //save image file to mongodb
      //let newPoll = new Polls();
      //newPoll.image.contentType = valor.;
      //newPoll.data = fs.readFileSync(ans.path); //read the file with readFileSync
      //EXPERIMENTOS desde https://steemit.com/utopian-io/@morningtundra/storing-and-retreiving-images-in-mongodb-with-nodejs
      //newPoll.save((el)=>{console.log(el)});
      //res.send("image saved to mongodb");
      //let file = req.file; console.log(file); res.send("file loaded");
    })

    .post('/uploadContent/', upload.single('file-item'), (req, res)=>{
      let content = req.file;
      console.log(content);
      res.send("You are going to upload content");
    })
    .post('/createaPoll/', upload.single('file-item'), (req, res)=>{
      let ans = req.file;
      console.log(ans);
      res.send("xxxx");
      res.end();
    })
    .get('/images2/', (req, res)=>{
      console.log("request to image2")
      let answer = {};
      Image.find((err, docs)=>{
        //console.log(docs);
        docs.map((el, ind)=>{
          console.log(el);
          answer[ind] =  { base64  : el.data.toString('base64'), id : el._id}
        });
        res.json(answer);
    });
  })
  .post('/publicPolls/', (req, res)=>{
    let polls = req.body.polls;
    var resp = [];
    let totalPolls = 0;
    let inicio = 0;
    for(var prop in polls){
      delete mongoose.connection.models[polls[prop]];
      let PollCreated = mongoose.model(polls[prop], pollsSquema);
        PollCreated.find((err, docs)=>{
        if(err) {console.log(err);}
        totalPolls += docs.length;
        console.log(totalPolls, "  146", inicio)
        docs.map((el, ind)=>{
          resp.push(
            {
            name :  el.name,
            descr :  el.description,
            imageName :  el.image.name,
            imageType :  el.image.contentType,
            imageBase64 :  el.image.base64
            }
          );

        });
        inicio ++;
        let promesa = new Promise((reso, rej)=>{
          if(inicio < polls.length ) {} else {
            reso(resp)
            res.json(resp);
          }
        });
      })
        }

  })
module.exports = userRouter
