//import "bootstrap/dist/css/bootstrap.css";
import "./assets/bootstrap3/css/bootstrap.css";
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
//redux stuff
import { Provider } from "react-redux";
import store from "./redux/store";
import App from './App';


ReactDOM.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('root'));
