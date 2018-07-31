const express = require('express');
const userRouter = express.Router();
const path  = require("path");
var multer = require('multer');
var fs = require('fs');
let User = require('../utils/userSchema');
let Texto = require('../utils/textSchema');
let Image = require('../utils/imagesSchema');

//let getGfs = require('../api_server');
var upload = multer({ dest: __dirname + '/uploads/' });

userRouter
    .get('/', (req,res) => {
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
      //save image file to mongodb
      let newImg = new Image();
      newImg.contentType = ans.mimetype;
      newImg.data = fs.readFileSync(ans.path); //read the file with readFileSync
      //EXPERIMENTOS desde https://steemit.com/utopian-io/@morningtundra/storing-and-retreiving-images-in-mongodb-with-nodejs
      let encodeFileBase64 = newImg.data.toString('base64');
      newImg.save((el)=>{console.log(el)});
      res.send(encodeFileBase64);
      res.end();
      //let file = req.file; console.log(file); res.send("file loaded");
    })
    .get('/images2/', (req, res)=>{
      Image.find({_id : req.query.id}, (err, docs)=>{
        fs.appendFile(path.join(__dirname, '/uploads/'+ docs[0].id + '.mp4'),  docs[0].data, function (err) {
          if (err) throw err;
          console.log('Saved!');
        });

        //let answer = {};
        //let remoteBuffer = docs[0].data;
        //let encodeFileBase64 = remoteBuffer.toString('base64');
        res.send("save success");
      });
    });
module.exports = userRouter
