const express = require('express');
const path  = require("path");
const app = express();
/*
app.get('/*', function(req, res) {
  //app.use(express.static('../../dist'));
  res.sendFile(express.static('../../dist'));

})*/
/*
app.get("/", function(req, res){
  //res.send("express working");
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});*/
app.use(express.static('../../dist'));
app.get("/other", function(req, res){
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});
app.get("/signup", function(req, res){
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});
app.get('/api/getUsername', (req, res) => res.send({ username: "Hola soy express" }));
/*app.get('/', (req, res){
  res.send("soy res desde express");
});*/
app.listen(8080, () => console.log('Listening on port 8080!'));
