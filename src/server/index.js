const express = require('express');
const app = express();

app.use(express.static('dist'));
app.get("/other", function(req, res){
  //res.sendFile("../dist/index.html");
  res.send("hello soy other");
});
app.get('/api/getUsername', (req, res) => res.send({ username: "Hola soy express" }));
app.listen(8080, () => console.log('Listening on port 8080!'));
