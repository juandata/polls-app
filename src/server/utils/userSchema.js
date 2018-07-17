let mongoose = require('mongoose');
let userSquema = mongoose.Schema({
    name  : String,
    lastName : String,
    email : String,
    cellphone : String,
    city : String,
    userName: String,
    gender :  String
});
module.exports = mongoose.model("Usuarios", userSquema);
