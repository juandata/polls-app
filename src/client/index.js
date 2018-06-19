//import "bootstrap/dist/css/bootstrap.css";
import "./assets/bootstrap3/css/bootstrap.css";
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
let jwt = require('jsonwebtoken');
//redux stuff
import { Provider } from "react-redux";
import store from "./redux/store";

import App from './App';
 if(localStorage.token1){
  let decoded = jwt.decode(localStorage.token1);
  let expir = new Date(decoded.exp * 1000);
  let currTime = new Date();
  let compDates = expir > currTime; //if true, the token is still witihn its live time (one hour);
  if (compDates) {
    //do nothing
  } else {
    localStorage.removeItem('token1');
  }
}
ReactDOM.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('root'));
