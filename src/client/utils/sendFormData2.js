let asyncFunction = require('./asyncFunction');


let sendData = (el) => {
  /*return new Promise((res, rej) => {
    const xhr = new XMLHttpRequest;
    let body = createBodyandHeaders;
    console.log(body);

  });*/
  var file = {
    dom : document.getElementById('contenido'),
    binary : null
  };
  let reader = new FileReader();
  reader.addEventListener("load", function () {
    file.binary = reader.result;
  });
  // At page load, if a file is already selected, read it.
  if(file.dom.files[0]) {
    reader.readAsBinaryString(file.dom.files[0]);
  }
  console.log(file);
  let body = createBodyandHeaders();
  //send image to server
  asyncFunction.send(body);

  return body;
};
let createBodyandHeaders = () => {
  var file = {
    dom : document.getElementById('file-item'),
    binary : null
  };
  let boundary = "blob";
  // Store our body request in a string.
  let data = "";
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
  return data;
};

/*function asyncFunction(body){
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", 'api/photo');
    xhr.onload = () => resolve(console.log(xhr.responseText));
    xhr.onerror = () => reject(console.log(xhr.statusText));
    xhr.setRequestHeader('Content-Type','multipart/form-data; boundary=' + 'blob');
    xhr.send(body);
  });
}*
/*let asyncFunction = (body)=>{
 return new Promise((resolve, reject) => {
     const xhr = new XMLHttpRequest();
     xhr.open('POST', 'api/photo');
     xhr.onload = () => resolve(console.log(xhr.responseText));
     xhr.onerror = () => reject(console.log(xhr.statusText));
     xhr.setRequestHeader('Content-Type','multipart/form-data; boundary=' + 'blob');
     xhr.send(body);
      });
};*/
module.exports.send = sendData;
