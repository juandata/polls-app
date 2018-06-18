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
let ans = "na";
function searchMongoDB(email, password){


}
function searchPass(password){

     }

module.exports.searhMongoDB = searchMongoDB;
