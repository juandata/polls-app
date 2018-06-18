import React from 'react';

//redux stuff
import {getUserInfo} from '../redux/actions';
import store from '../redux/store';
//import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

 class WelcomeUser extends React.Component {
  componentWillMount(){
  store.dispatch(getUserInfo());
  }

  render() {
    return (
      <div>
        <h1>Welcome {this.props.user} </h1>
        <h2>Your polls are :</h2>
        <ul>

        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps)(WelcomeUser)
