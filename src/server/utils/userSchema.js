let mongoose = require('mongoose');
let userSquema = mongoose.Schema({
    name  : String,
    lastName : String,
    userName: String,
    email : String,
    pass : String,
    gender :  String,
});
module.exports = mongoose.model("users", userSquema);
