const express = require('express');
const path  = require("path");
const app = express();
const routes = [
  "/", "/signup", "/other"
];
app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: "Hola soy express" }));
app.use(function(req, res) {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
})
app.listen(8080, () => console.log('Listening on port 8080!'));
