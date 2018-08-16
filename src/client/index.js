//import "bootstrap/dist/css/bootstrap.css";
import "./assets/bootstrap3/css/bootstrap.css";
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
let jwt = require('jsonwebtoken');
const axios = require('axios');

//redux stuff
import { Provider } from "react-redux";
import store from "./redux/store";
import {getUserInfo} from './redux/actions';
import {savePublicPolls} from './redux/actions';
import publicUrls from './utils/publicVariables';
var x = location.pathname;
console.log(x);

import App from './App';
  //get all polls from users and store them in redux and localStorage
  const url = 'http://localhost:8080/API/'
  const url2 = 'http://localhost:8080/API/publicPolls/'
  console.log(url, url2);
  axios.get(url)
  .then((resp)=>{
    let usersIdArray = [];
    for(var prop in resp.data){usersIdArray.push(resp.data[prop]._id)}
    console.log(usersIdArray);
    return usersIdArray;
  })
  .then((resp)=>{
    axios.post(url2, { polls : resp}, {headers : {contentType : 'application/json'}})
    .then((resp)=>{store.dispatch(savePublicPolls(resp.data))}) //save public polls to store state

  })
  .catch((err)=>{console.log(err)})

  //
 if(localStorage.token1 && localStorage.token1 != "undefined"){
  let decoded = jwt.decode(localStorage.token1);
  console.log(decoded.userInfo);
  let expir = new Date(decoded.exp * 1000);
  let currTime = new Date();
  let compDates = expir > currTime; //if true, the token is still witihn its live time (one hour);
  if (compDates) {
    //do nothing
    store.dispatch(getUserInfo(decoded));
    console.log(decoded);
  } else {
    //remove all the localStorage user related data
    localStorage.removeItem('token1');localStorage.removeItem('id');
    console.log('local Storage deleted');
  }
} else {console.log("local Storage is : " + localStorage.token1)}
ReactDOM.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('root'));
