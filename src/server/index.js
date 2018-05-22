const express = require('express');
const path  = require("path");
const app = express();

app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: "Hola soy express" }));
/*app.get('/', (req, res){
  res.send("soy res desde express");
});*/
app.listen(8080, () => console.log('Listening on port 8080!'));
