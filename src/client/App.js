import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import './app.css';

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
        {this.state.username ? (
          <h1>Hello {this.state.username}</h1>
        ) : (
          <h1>Loading.. please wait!</h1>
        )}
      </div>
    );
  }
}

function OtherComp(props){
  return <h1>This is other component</h1>;
}

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Greeting} />
        <Route path="/other" component={OtherComp} />
      </Switch>

    );
  }
}
