let mongoose = require('mongoose');
let textSchema = mongoose.Schema({
    filename  : String,
    contentType : String

});
module.exports = mongoose.model("Texto", textSchema);
