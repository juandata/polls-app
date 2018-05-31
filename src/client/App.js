import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import logic from './logic';

import './assets/css/app.css';

import Header from './atoms/Header';
import Nav from './atoms/Nav';
import NavBar from './atoms/NavBar';
import Footer from './atoms/Footer';
import Login from './atoms/Login';
import Register from './atoms/Register';
import CreatePoll from './atoms/CreatePoll';



//components
import {GeneralPolls} from './templates/GeneralPolls';
import {BreadCumb} from './atoms/BreadCumb';
import {Barchart} from './atoms/d3practice';

import {PollsView} from './atoms/PollsView';
import {SignUp} from './pages/SignUp';
//import {Login} from './pages/Login';
import {Error} from './pages/Error';
import {BootstrapTest} from './templates/BootstrapTest';
import {Bootstrap1} from './templates/Bootstrap1';
import {BasicTemplate} from './templates/Bootstrap4';

class Greeting extends Component {
  constructor(props) {
    super(props);
    this.state = { username: null };
  }
  componentDidMount() {
    fetch('/api/getUsername')
    .then(res => res.json())
    .then(user => this.setState({ username: user.username }));
  }
  render(){
    return <Bootstrap1 />;
  }
}

 export default class App extends Component {
  render() {
    let lastUrl = logic.getUrl;
    return (
      <React.Fragment>
      <Header />
      <NavBar />
      <BreadCumb currentPage={lastUrl} />
      <div className="body">
      <Switch>
        <Route exact path="/" component={GeneralPolls} />
        <Route path="/GeneralPolls" component={GeneralPolls} />
        <Route path="/Login" component={Login} />
        <Route path="/Register" component={Register} />
        <Route path="/PollsView"render={()=> < PollsView title="Polls Title" /> } />
        <Route path="/CreatePoll" component={CreatePoll} />
        <Route path="/d3" component= {Barchart} />

        //Pruebas abajo
        <Route exact path="/test" component={BootstrapTest} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/template" component={BasicTemplate} />
        <Route path="/NavBar" component={NavBar} />
        <Route component={Error} />
      </Switch>
      <Footer />
      </div>
      </React.Fragment>

    );
  }
}
/*
<div>
  {this.state.username ? (
    <div>
    <h1>Hello {this.state.username}</h1>
    <SignUp/>
    </div>
  ) : (
    <h1>Loading.. please wait!</h1>
  )}
</div>*/
