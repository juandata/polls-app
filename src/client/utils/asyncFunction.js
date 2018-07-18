let asyncFunction = (body) =>{
  const xhr = new XMLHttpRequest();
  xhr.open("Post", 'api/photo');
  let promise = xhr.addEventListener('load', function(event) {
    console.log('Yeah! Data sent and response loaded.', event.target.response);
    return event.target.response;
  });
  xhr.onload = () => console.log(xhr.responseText);
  xhr.onerror = () => console.log(xhr.statusText);
  xhr.setRequestHeader('Content-Type','multipart/form-data; boundary=' + 'blob');
  xhr.send(body);

  /*return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", 'api/photo');
    xhr.addEventListener('load', function(event) {
      console.log('Yeah! Data sent and response loaded.', event.target.response);
      return event.target.response;
    });
    xhr.onload = () => resolve(console.log(xhr.responseText));
    xhr.onerror = () => reject(console.log(xhr.statusText));
    xhr.setRequestHeader('Content-Type','multipart/form-data; boundary=' + 'blob');
    xhr.send(body);
  });*/
};
/*
function asyncFunction(body){
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", 'api/photo');
    xhr.addEventListener('load', function(event) {
      console.log('Yeah! Data sent and response loaded.', event.target.response);
      return event.target.response;
    });
    xhr.onload = () => resolve(console.log(xhr.responseText));
    xhr.onerror = () => reject(console.log(xhr.statusText));
    xhr.setRequestHeader('Content-Type','multipart/form-data; boundary=' + 'blob');
    xhr.send(body);
  });
}
*/
module.exports.send = asyncFunction
