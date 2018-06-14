var express = require('express'),
    _       = require('lodash'),
    //config  = require('./config'),
    jwt     = require('jsonwebtoken');

app.post('/users', function(req, res){
  res.send("Authenticate route");
});
