let  publicUrls = require( './publicVariables');
const axios = require('axios');
const FormData = require('form-data');

let sendData = (pollData) => {
const url = publicUrls.postImages;
let file =  document.getElementById('file-item').files[0];
let data = new FormData();

data.append('file-item', file, file.fileName);
data.append("otracosa", JSON.stringify(pollData));
return axios.post(url, data, {
  headers: {
    'accept': 'application/json',
    'Accept-Language': 'en-US,en;q=0.8',
    'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
  }
})
  .then((response) => {
    console.log(response, "succesfully saved to mongodb and local folder");
    resolve(response);
    return response;
    //handle success
  }).catch((error) => {
    //handle error
  });

}


module.exports = sendData
