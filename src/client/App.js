import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import './assets/css/app.css';

import Header from './atoms/Header';
import Nav from './atoms/Nav';
import Bnav from './atoms/Bnav';



//components

import {SignUp} from './pages/SignUp';
import {Login} from './pages/Login';
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
    return (
      <React.Fragment>
      <Header />
      <Nav />
      <Switch>
        <Route exact path="/" component={Greeting} />
        <Route exact path="/test" component={BootstrapTest} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/template" component={BasicTemplate} />
        <Route path="/Bnav" component={Bnav} />
        <Route component={Error} />
      </Switch>
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
