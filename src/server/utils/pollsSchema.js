const mongoose = require('mongoose');
const PollsSchema = mongoose.Schema({
    name: String,
    description : String,
    options : mongoose.Schema.Types.Mixed,
    image : {
      name : String,
      contentType  : String,
      data : mongoose.Schema.Types.Mixed
    }
  });

module.exports = mongoose.model('Polls', PollsSchema);
