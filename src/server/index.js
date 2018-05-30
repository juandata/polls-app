
const express = require('express');
const path  = require("path");
const app = express();
const routes = [
  "/", "/signup", "/other"
];
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
const address = "mongodb://pollsapp:Fray2017@ds231740.mlab.com:31740/pollsapp";

app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({
  username: "Hola soy express"
}));
app.get("/mongo", function(req, res){
    connectToMongo("created from react wow!!");
    res.send("it was easy to made the request!")

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
