var mongoose = require('mongoose');
const address = "mongodb://pollsapp:Fray2017@ds231740.mlab.com:31740/pollsapp";
var userSquema = mongoose.Schema({
    name  : String,
    lastName : String,
    userName: String,
    email : String,
    pass : String,
    gender : String
});
let UserCreated = mongoose.model("users", userSquema);

function searchMongoDB(email, password){
      let ans = "nada";
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
        UserCreated.find({
              email
          },
          function(err, doc){
            if (err) return console.error(err);
            if(!doc.length > 0){
                console.log("Email does not exist");
                ans = "Email does not exist";
              }
            else {
              //email exists in the database, lets search for the Password
              //this should be encrypted
               searchPass(password);
          }
        });
      })
}
function searchPass(password){
       UserCreated.find({pass : password}, function(err, docs){
         if (err) return console.error(err);
           if(!docs.length > 0){
             console.log("Password is wrong");
           } else {
             console.log("Hello User");
             //res.send("Email already exists");
           }
       });
     }

module.exports.searhMongoDB = searchMongoDB;
