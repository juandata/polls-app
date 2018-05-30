//Using mongoose

var mongoose = require('mongoose');
const address = "mongodb://pollsapp:Fray2017@ds231740.mlab.com:31740/pollsapp";

mongoose.connect(address);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("we have connecteed to mlab from module!");
  var kittySchema = mongoose.Schema({
  name: String
    });
  kittySchema.methods.speak = function () {
  var greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
   console.log(greeting);
  }

  var Kitten = mongoose.model('Kitten', kittySchema);
  var silence = new Kitten({ name: 'Silence' });
  console.log(silence.name); // 'Silence'
  var fluffy = new Kitten({ name: 'fluffy' });
  fluffy.speak(); // "Meow name is fluffy"

  //saving to mongodb
  fluffy.save(function (err, fluffy) {
    if (err) return console.error(err);
    fluffy.speak();
  });

  //finding documents
  Kitten.find(function (err, kittens) {
  if (err) return console.error(err);
  console.log(kittens);
  })

});
