//Crypto node
const crypto = require('crypto');

const secret = 'abcdefg';
const hash = crypto.createHmac('sha256', secret)
                   .update('I love cupcakes')
                   .digest('hex');
console.log(hash);

import React from 'react';
import {Form, FormGroup, Col, ControlLabel, FormControl, Checkbox, Button, PageHeader} from 'react-bootstrap';
let state;
import UserRegistered from './UserRegistered';

//redux stuff
import {changeView, userErrorMessage, emailErrorMessage} from '../redux/actions';
import store from '../redux/store';
//import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';


export  class Register extends React.Component{
  constructor(props){
    super(props);
    state = this;
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getValidationState = this.getValidationState.bind(this);
    this.state = {
      value: '', options : []
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot){

  }
  handleClick(e){
    e.preventDefault();
    let formArr = ["formHorizontalName", "formHorizontalLastName", "formHorizontalUserName",
      "formHorizontalEmail", "formHorizontalPassword"], info = [], inputValues = 0;
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

      if(inputValues == 0){
        var userInfo = {
          name : info[0],
          lastName : info[1],
          userName : info[2],
          email : info[3],
          password : info[4],
          gender : document.getElementById("formControlsSelect").value
        };
        var headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
          };
        fetch('/submitUser', {
          headers,
          method: "POST",
          body: JSON.stringify(userInfo)
          })
          .then(function(response) {
            return response.text();
            })
          .then(function(txt){
            if(txt === "Success" ) {
              state.setState({view : "Success", options : info})
              store.dispatch(changeView());
            }
            else if (txt === "Username already exists"){
              //state.setState({userMessage : "The user already exists, please choose another one."})
              let userName = document.getElementById("formHorizontalUserName");
              userName.value = "";
              userName.parentNode.parentNode.setAttribute('class', 'form-group has-error');
              store.dispatch(userErrorMessage());
            }
            else if (txt === "Email already exists"){
              //state.setState({emailMessage : "The Email already exists, please add another one."})
              let userName = document.getElementById("formHorizontalEmail");
              userName.value = "";
              userName.parentNode.parentNode.setAttribute('class', 'form-group has-error');
              store.dispatch(emailErrorMessage());
            }
          })
      }
  }
  getValidationState(e) {
    if(e == this.state.target){
    let length = this.state.value.length;
    if (length > 0) return 'success';
    else return null;
      }
    }
   handleChange(e) {
   this.setState({ value: e.target.value, target : e.target.id });
      }
  render(){
    console.log(store.getState());
    if(this.props.view === "Form"){
      return (
        <div className="container">
        <PageHeader className="header-margins">
          Fill the form below to register and create your own polls
        </PageHeader>
        <Form  horizontal>
          <FormGroup controlId="formHorizontalName" validationState={this.getValidationState("formHorizontalName")}>
            <Col componentClass={ControlLabel} sm={2}>
              Name
            </Col>
            <Col sm={10}>
              <FormControl type="text" placeholder="Name" onChange={this.handleChange} />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalLastName" validationState={this.getValidationState("formHorizontalLastName")}>
            <Col componentClass={ControlLabel} sm={2}>
              Last Name
            </Col>
            <Col sm={10}>
              <FormControl type="text" placeholder="Last Name" onChange={this.handleChange} />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalUserName" validationState={this.getValidationState("formHorizontalUserName")}>
            <Col componentClass={ControlLabel} sm={2}>
              Username
            </Col>
            <Col sm={10}>
              <FormControl type="text" placeholder={this.props.userMessage} onChange={this.handleChange} />
            </Col>
          </FormGroup>
          <FormGroup controlId="formControlsSelect" validationState={this.getValidationState("formControlsSelect")}>
            <Col componentClass={ControlLabel} sm={2}><ControlLabel> Gender</ControlLabel></Col>
            <Col  sm={10}>
            <FormControl componentClass="select" placeholder="select">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Prefer not to specify</option>
            </FormControl></ Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalEmail" validationState={this.getValidationState("formHorizontalEmail")}>
            <Col componentClass={ControlLabel} sm={2}>
              Email
            </Col>
            <Col sm={10}>
              <FormControl type="email" placeholder={this.props.emailMessage} onChange={this.handleChange} />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalPassword" validationState={this.getValidationState("formHorizontalPassword")}>
            <Col componentClass={ControlLabel} sm={2}>
              Password
            </Col>
            <Col sm={10}>
              <FormControl type="password" placeholder="Password" onChange={this.handleChange} />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Checkbox>Remember me</Checkbox>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit" onClick={this.handleClick}>Sign in</Button>
            </Col>
          </FormGroup>
        </Form>
        <PageHeader className="header-margins">
          It is free!
        </PageHeader>
        </div>
      )
    }
    else {
      return <UserRegistered options={this.state.options} />;
    }

  }

}

function mapStateToProps(state) {
  return {
    view : state.changeView.view,
    userMessage : state.errorMessage.userMessage,
    emailMessage: state.errorMessage.emailMessage
  };
};

export default connect(mapStateToProps)(Register)
