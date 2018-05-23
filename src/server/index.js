const express = require('express');
const path  = require("path");
const app = express();

app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: "Hola soy express" }));
app.get('/*', function(req, res) {
  //app.use(express.static('../../dist'));
  res.sendFile(path.join(__dirname, '../../dist/index.html'));

})
app.listen(8080, () => console.log('Listening on port 8080!'));
