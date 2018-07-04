import React from 'react';
import {Form, FormGroup, Col, ControlLabel, FormControl, Checkbox, Button, PageHeader, OverlayTrigger, Tooltip} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {setAuth} from '../utils/setAuthorizationHeader';
import isEmpty from 'lodash/isEmpty';
let jwt = require('jsonwebtoken');
let theHeader,estado;
//redux stuff
import {getUserInfo, getTokenInfo, wrongPassMessage, resetTooltip, changeLayout} from '../redux/actions';
import store from '../redux/store';
//import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import WelcomeUser from './WelcomeUser';

function Atooltip(props){
  return (
    <Tooltip placement="bottom" id="tooltip-bottom" style={{opacity : props.opacity, right : "50%"}}>
      <strong>Wrong Password</strong> Please verify.
    </Tooltip>
  )
}
export class Login extends React.Component{
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.getValidationState = this.getValidationState.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.state = {value : ''};
    estado = this;
  }
  handleFocus(){
    store.dispatch(resetTooltip());
  }
  handleClick(e){
    //e.preventDefault();
    let formArr = ["formHorizontalEmail", "formHorizontalPassword"],info = [], inputValues = 0;
      formArr.map(function(el, ind){
        let elem = document.getElementById(el);
        info.push(elem.value);
        if(elem.value.length < 1) {
        let  parElem = elem.parentNode.parentNode;
        parElem.setAttribute('class', 'form-group has-error');
        }
      });
      info.map(function(el, ind){
        if(el.length == 0){
          inputValues += 1;
        }
      });
      //only send request if both inputs have values.
      if(inputValues == 0){
        var userInfo = {
          email : info[0],
          password : info[1]
        };
        var headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
          };
        fetch('/LoginUser', {
          headers,
          method: "POST",
          body: JSON.stringify(userInfo)
          })
          .then(function(response) {
            return response.json();
            })
          .then(function(json){
            console.log(json);
            if(json.token == "Email does not exist" ){
              let email = document.getElementById("formHorizontalEmail");
              email.value = "The email you provided is not linked to any account";
              email.parentNode.parentNode.setAttribute('class', 'form-group has-error');
              //store.dispatch(userErrorMessage());
            }
            else if ( json.token == "Password is wrong") {
              let password = document.getElementById("formHorizontalPassword");
              password.parentNode.parentNode.setAttribute('class', 'form-group has-error');
               store.dispatch(wrongPassMessage());
            }
            else {
              localStorage.setItem('token1',json.token);
              console.log(json);
              const userName = json.decoded.userInfo.userName, route = '/WelcomeUser/' + userName;
              //Send the userInfo to the store
                store.dispatch(getUserInfo(json.decoded));            
                estado.props.history.push(route)
            }
          })// send auth header to private route


      }
  }
    getValidationState(e) {
      if(e == this.state.target){
      let length = this.state.value.length;
      if (length > 0) return 'success';
      else return null;
        }
      }
  render(){
    //if (isEmpty(this.props.tokenInfo))
    return (
      <div className="container">
      <PageHeader className="header-margins">
        Please login with your username and password
      </PageHeader>
      <Form  horizontal>
        <FormGroup controlId="formHorizontalEmail" validationState={this.getValidationState("formHorizontalEmail")}>
          <Col componentClass={ControlLabel} sm={2}>
            Email
          </Col>
          <Col sm={10}>
            <FormControl type="email" placeholder="Email" />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword" validationState={this.getValidationState("formHorizontalPassword")}>
          <Col componentClass={ControlLabel} sm={2}>
            Password
          </Col>
          <Col sm={10}>
            <FormControl type="password" placeholder="Password" onFocus={this.handleFocus} />
            <Atooltip opacity={this.props.tooltipOpacity} />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Checkbox>Remember me</Checkbox>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Link to="#" onClick={this.handleClick}>
                <Button bsStyle="primary" >Sign in</Button>
            </Link>
          </Col>
        </FormGroup>
      </Form>
      <PageHeader className="header-margins">
        Not a user? You can register for free!
      </PageHeader>
      <Button className="register" href="/Register" bsStyle="primary" bsSize="large" block>Register</Button>
      </div>
    )
    /*else {

    <Button bsStyle="primary" onClick={this.props.history.push('/path')}> some stuff </Button>
    return(<WelcomeUser info={this.props.userInfo} />)
    <Link to=" " onClick={this.handleClick}>
        <Button bsStyle="primary" >Sign in</Button>
    </Link>
      <Button bsStyle="primary" onClick={this.handleClick} >Sign in</Button>
  }*/
  }

}
function mapStateToProps(state) {
  return {
    isAuthenticated : state.userInfo.isAuthenticated,
    userInfo: state.userInfo.userInfo,
    tooltipOpacity : state.errorMessage.passMessage,
    tokenInfo : state.tokenInfo.tokenInfo,
    login : state.changeLayout.login
  };
};
export default connect(mapStateToProps)(Login)
