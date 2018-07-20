const axios = require('axios');


let sendData = (el) => {
const url = 'http://localhost:8081/api/images/';
let file =  document.getElementById('file-item').files[0];
axios({
  method: 'post',
  url: url,
  data: {
    file
  }
});

/*  let file = {
    dom : document.getElementById('file-item'),
    binary : null
  };
  let reader = new FileReader();
  //reader.readAsBinaryString(file.dom.files[0]);
 reader.addEventListener('load', function(){
    console.log("reader finished and result is", reader.result);
    file.binary = reader.result;
    // To construct our multipart form data request,
    // We need an XMLHttpRequest instance
    var XHR = new XMLHttpRequest();

    // We need a separator to define each part of the request
    var boundary = "blob";
    // Store our body request in a string.
    var data = "";
    // Start a new part in our body's request
      data += "--" + boundary + "\r\n";

      // Describe it as form data
      data += 'content-disposition: form-data; '
      // Define the name of the form data
            + 'name="'         + file.dom.name          + '"; '
      // Provide the real name of the file
            + 'filename="'     + file.dom.files[0].name + '"\r\n';
      // And the MIME type of the file
      data += 'Content-Type: ' + file.dom.files[0].type + '\r\n';

      // There's a blank line between the metadata and the data
      data += '\r\n';

      // Append the binary data to our body's request
      data += file.binary + '\r\n';
      // Once we are done, "close" the body's request
      data += "--" + boundary + "--";

          // Define what happens on successful data submission
       XHR.addEventListener('load', function(event) {
         alert('Yeah! Data sent and response loaded.');
       });

       // Define what happens in case of error
       XHR.addEventListener('error', function(event) {
         alert('Oops! Something went wrong.');
       });

       // Set up our request
       XHR.open('POST', 'http://localhost:8081/api/images/');

       // Add the required HTTP header to handle a multipart form data POST request
       XHR.setRequestHeader('Content-Type','multipart/form-data; boundary=' + boundary);

       // And finally, send our data.
       XHR.send(data);
       console.log(data);
  });
  if(file.dom.files[0]){ reader.readAsBinaryString(file.dom.files[0]);}

  console.log("otra cosa");*/
};

module.exports.send = sendData
