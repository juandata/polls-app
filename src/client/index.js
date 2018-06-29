//import "bootstrap/dist/css/bootstrap.css";
import "./assets/bootstrap3/css/bootstrap.css";
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
let jwt = require('jsonwebtoken');
//redux stuff
import { Provider } from "react-redux";
import store from "./redux/store";
import {getUserInfo} from './redux/actions';

var x = location.pathname;
console.log(x);

import App from './App';
 if(localStorage.token1){
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
}
ReactDOM.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('root'));
