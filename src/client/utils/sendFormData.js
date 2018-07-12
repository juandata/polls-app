let sendData = (el) => {
  let file = {
    dom : document.getElementById('file-item'),
    binary : null
  };
  let reader = new FileReader();
  // Because FileReader is asynchronous, store its
  // result when it finishes to read the file
  reader.addEventListener("load", function () {
    file.binary = reader.result;
  });
  // At page load, if a file is already selected, read it.
  if(file.dom.files[0]) {
    reader.readAsBinaryString(file.dom.files[0]);
  }
  // If not, read the file once the user selects it.
  file.dom.addEventListener("change", function () {
    if(reader.readyState === FileReader.LOADING) {
      reader.abort();
    }

    reader.readAsBinaryString(file.dom.files[0]);
  });
//sendFormData
// To construct our multipart form data request,
  // We need an XMLHttpRequest instance
  var XHR = new XMLHttpRequest();
  // We need a separator to define each part of the request
  var boundary = "blob";
  // Store our body request in a string.
  var data = "";
  // So, if the user has selected a file
 if (file.dom.files[0]) {
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
   /*
   //send the data with fetch api
   let headers = {
     'Accept': 'image/png',
     'Content-Type': 'image/png'
   };
   fetch('/api/photo',{headers, method :"Post", body : data} )
   .then(function(el){
     el.text();
   })
   .then(function(el){console.log(el)})
   */
   // Define what happens on successful data submission
   XHR.addEventListener('load', function(event) {
     console.log('Yeah! Data sent and response loaded.', event.target.response);
     return event.target.response;
   });

   // Define what happens in case of error
   XHR.addEventListener('error', function(event) {
     console.log('Oops! Something went wrong.');
   });

   // Set up our request
   XHR.open('POST', 'api/photo');

   // Add the required HTTP header to handle a multipart form data POST request
   XHR.setRequestHeader('Content-Type','multipart/form-data; boundary=' + boundary);
    XHR.send(data);
 }
};

module.exports.send = sendData
