import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import './app.css';

//components

import {SignUp} from './pages/SignUp';
import {Login} from './pages/Login';
import {Error} from './pages/Error';
import {BootstrapTest} from './templates/BootstrapTest';





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
    return (
    <BootstrapTest />
    );
  }
}



export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Greeting} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route component={Error} />
      </Switch>

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
