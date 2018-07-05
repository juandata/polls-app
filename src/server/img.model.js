const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema({
    contentType  : String,
    data : Buffer
  });

module.exports = mongoose.model('Images', ImageSchema);
