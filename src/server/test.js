/*
app.mountpath
The app.mountpath property contains one or more path patterns on which a sub-app was mounted.
http://expressjs.com/es/4x/api.html#app
*/

const express = require('express');
var app = express();
var admin = express();

admin.get('/', function (req, res) {
  console.log(admin.mountpath); // [ '/adm*n', '/manager' ]
  res.send('Admin Homepage');
});

var secret = express();
secret.get('/', function (req, res) {
  console.log(secret.mountpath); // /secr*t
  res.send('Admin Secret');
});

admin.use('/secr*t', secret); // load the 'secret' router on '/secr*t', on the 'admin' sub app
app.use(['/adm*n', '/manager'], admin); // load the 'admin' router on '/adm*n' and '/manager', on the parent app

app.listen(8080, () => console.log('Listening on port 8080!'));
