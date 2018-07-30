const axios = require('axios');
let promise;
 exports.sendGet = function(id){
   let theid = arguments[0];
  return  promise = new Promise(function(resolve, reject) {
    const url = 'http://localhost:3000/API/images2/' + '?id=' + theid;
          let elem =  axios.get(url, {
              headers: {
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': 'application/json',
              }
            })
              .then((response) => {
                console.log(response, "file succesfully fletched from mongodb database");
                return response;
                //handle success
              }).catch((error) => {
                //handle error
              });
          elem.then(function(el){resolve(el);})

          });
  promise.then(
    function(result) {
      console.log("promise resolved and the value is ", result.data);
      return result.data;
  },
    function(error) { console.log("promise rejected and the value is ", error);}
  );
}
