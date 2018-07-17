const express = require('express');
const userRouter = express.Router();
const path  = require("path");
var fs = require('fs');
let User = require('../utils/userSchema');
let Texto = require('../utils/textSchema');

userRouter
    .get('/', (req,res) => {
      let src =  path.join(__dirname, '/archivoprueba.txt');
      /* fs.createReadStream(src),
    function(error, createdFile){
      console.log("file created", createdFile);
  });

   fs.readFile(src, function(err, data){
        console.log(data);
      });*/
      //
      User.find({}, (err, users) => {
            res.json(users)
        })
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
module.exports = userRouter