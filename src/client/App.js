import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import './app.css';

//components

import {SignUp} from './pages/SignUp';

function Diff(props) {
  return <h1>Diff component</h1>;
}

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
      <div>
        <h1>hello</h1>
        <SignUp />
      </div>
    );
  }
}



export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Greeting} />
        <Route path="/signup" component={SignUp} />
        <Route path="/other" component={Diff} />
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
