let array = [1,54,67,4,3,12,3,45,6];

function multiMax(first, ...remaining){
 //Rest parameters create an array from arguments that weren’t matched to parameters:
  console.log(first, remaining);
}
function useDefault(param, action = "respira"){
  //Default parameters specify default parameter values that are used if no value is supplied during invocation:
  console.log(param + " " + action);
}
let promise = new Promise((res, rej)=>{
  setTimeout(function () {
    res("Async task finished!");
      }, 10000);
});
promise.then((ans)=>{console.log("resolved and ans is " + ans)}, (err)=>{console.log("there was an error : " + err);})

//functional programing practice



//calls
multiMax(1,2,3,4,5);
useDefault("Él");
let sorted = array.sort((el, el2)=>{return el - el2});
console.log(sorted);
