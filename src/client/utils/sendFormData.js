const axios = require('axios');
const FormData = require('form-data');

let sendData = (el) => {
const url = 'http://localhost:3000/API/images/';
let file =  document.getElementById('file-item').files[0];
let data = new FormData();
data.append('file-item', file, file.fileName);
axios.post(url, data, {
  headers: {
    'accept': 'application/json',
    'Accept-Language': 'en-US,en;q=0.8',
    'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
  }
})
  .then((response) => {
    console.log("succesfully saved to mongodb and local folder");
    return response;
    //handle success
  }).catch((error) => {
    //handle error
  });

}

module.exports.send = sendData
