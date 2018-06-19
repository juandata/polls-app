import React from 'react';

//redux stuff
import {getUserInfo} from '../redux/actions';
import store from '../redux/store';
//import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

 export default function WelcomeUser(props) {
    return (
      <div>
        <h1>Welcome {props.name} {props.lastName} </h1>
        <h2>Your polls are :</h2>
        <ul>

        </ul>
      </div>
    );
}
