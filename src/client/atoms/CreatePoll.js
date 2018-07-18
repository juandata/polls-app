import React from 'react';
import Textarea from "react-textarea-autosize";
import '../assets/css/CreatePoll.css'
import {Form, FormGroup, Col, ControlLabel, FormControl, Checkbox, Button, PageHeader} from 'react-bootstrap';
import PollCreated from './PollCreated';
import Login from './Login';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
let sendData = require('../utils/sendFormData');
let sendData2 = require('../utils/sendFormData2');
//redux stuff
import {getUserInfo} from '../redux/actions';
import store from '../redux/store';
//import {bindActionCreators} from 'redux';
//import {connect} from 'react-redux';


var elemento = < Options value="No options added yet"  />;
var boton = <Button className="register" type="submit" bsStyle="primary" bsSize="large" block disabled
>Create Poll</Button>;
let estado = null, nameMessage = "Name", theState;
export default class CreatePoll extends React.Component{
  constructor(props){
    super(props);
    theState = this;
    this.getOptions = this.getOptions.bind(this);
    this.submitOptions = this.submitOptions.bind(this);
    this.clearOptions = this.clearOptions.bind(this);
    this.sendPoll = this.sendPoll.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleFormClick = this.handleFormClick.bind(this);
    //this.uploadImage = this.uploadImage.bind(this);
    this.state = {options : ["No options added yet" ], change : false, disabled : true, valor : "", view :"Form"};
  }
  handleChange(e) {
   this.setState({ valor: e.target.value });
   }
  handleFocus(){
   const longi = this.state.valor.length;
   if (longi > 0) estado = 'success';
   else  estado = 'error';
   this.setState({change : !this.state.change});
  }
  getOptions(e){
    var op = e.target.value;
    var splited = op.split(/[\n\r]/g)
    this.setState({
      options : splited
    });
  }
  submitOptions(e){
    e.preventDefault();
    elemento =
    this.state.options.map(function(x, i) {
      if(x == "No options added yet" ){

        return (
          < Options value="No options added yet" key={i + 1}  />
        )
      }
      if(x == ""){
        return ;
      }
      else
      return (
        < Options index={i + 1} options={x} key={i + 1} />
      )
    })
    this.setState({change : !this.state.change});
    if(this.state.options[0] == "No options added yet"){
      this.setState({disabled : true})
    }
    else {
      this.setState({disabled : false})
    }
    const length = this.state.valor.length;
    if (length > 0) estado = 'success';
    else  estado = 'error'; nameMessage = "Please add a Name for your Poll";

  }
  clearOptions(e){
    e.preventDefault();
    this.setState({
      options : ["No options added yet"], change : !this.state.change
    });
    elemento = < Options value="No options added yet"  />
    document.getElementById("text-area").value = "";
    document.getElementById("description").value = "";
    document.getElementById("pollName").value = "";
    this.setState({disabled : true, valor : ""})
    estado = null;
  }
  sendPoll(){
    var theuserid = store.getState().userInfo.userInfo.userInfo._id;
    let name = document.getElementById("pollName").value;
    var descr = document.getElementById("description").value;
    var jsonOpt = {};
     this.state.options.map(function(el, ind){
       return jsonOpt[el] = 0;
    });
    var pollInfo = {
      pollName : name,
      description : descr,
      options : jsonOpt,
      id : theuserid,
      //image : imgUrl
    }
    console.log(pollInfo);
    var headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
      }
    fetch('/mongo', {
      headers,
      method: "POST",
      body: JSON.stringify(pollInfo)
    })
      .then(function(response) {
        console.log(response);
          return response.json();
        })
      .then(function(jsonr){
          console.log(jsonr);
          //update state with new poll created
          let updUserInfo = store.getState().userInfo.userInfo;
          updUserInfo.polls[updUserInfo.polls.length] = jsonr;
          console.log(updUserInfo);
          //console.log(updUserInfo);
          store.dispatch(getUserInfo(updUserInfo))
          var respuesta = jsonr.hasOwnProperty('error');
          console.log(respuesta);
          if(respuesta){
            theState.setState({view : "Error"})
          } else {
              theState.setState({view : "Created"})
          }
          return jsonr;
        }).then(function(updToken){
            let userInfoAgain = store.getState().userInfo.userInfo.userInfo;
            let pollsUpdated = store.getState().userInfo.userInfo.polls;
            let bodyReq = {
              userInfo : userInfoAgain,
              polls : pollsUpdated
            }
            fetch('/UpdateToken', {
              headers, method : 'POST', body : JSON.stringify(bodyReq)
            }).then(function(finalResp){
              return finalResp.json();
            }).then(function(finalRespJson){
              console.log(finalRespJson);
              localStorage.token1 = finalRespJson.token;
              //window.location.href = "/PollCreated";
              theState.setState({view : "changeView"})
            })
        })
  }
  handleFormClick(e){
    e.preventDefault();
    //let resp = sendData.send();
    let resp = sendData.send();
    console.log(resp);
  }
  render(){
    if(localStorage.token1){
      boton = !this.state.disabled ?
      <Button className="register" type="submit" bsStyle="primary" bsSize="large" block
      onClick={this.sendPoll}>Create Poll</Button>:
      <Button className="register" type="submit" bsStyle="primary" bsSize="large" block disabled
      >Create Poll</Button>;
      if(this.state.view == "Form"){
        return (
          <div className="container">
            <PageHeader className="header-margins">
              Create your poll
            </PageHeader>
            <Form  horizontal>
              <FormGroup controlId="pollName" validationState={estado} onChange={this.handleChange}>
                <Col componentClass={ControlLabel} sm={2} >
                  Name
                </Col>
                <Col sm={10}>
                  <FormControl type="text" placeholder={nameMessage} />
                </Col>
              </FormGroup>

              <FormGroup controlId="description" onFocus={this.handleFocus}>
                <Col componentClass={ControlLabel} sm={2}>
                <ControlLabel>Description</ControlLabel>
                </Col>
                <Col sm={10}>
                <FormControl componentClass="textarea" placeholder="Description" />
                </Col >
              </FormGroup>

              <FormGroup >
                <Col componentClass={ControlLabel} sm={2}>
                <ControlLabel>Options</ControlLabel>
                </Col>
                <Col sm={6}>
                <Textarea placeholder="separate each option with enter" minRows={3} style={{minWidth: "100%"}}
                useCacheForDOMMeasurements value={this.state.value} onChange={this.getOptions} id="text-area"/>
                </Col >
                <Col sm={2}>
                  <Button type="submit" onClick={this.submitOptions}>Add options</Button><br/><br/>
                  <Button type="submit" onClick={this.clearOptions}>Clear</Button>
                </Col>
                <Col sm={2}>
                { elemento }
                </Col>
              </FormGroup>
            </Form>
            {boton}
            <form id="image-form" method="post" encType="multipart/form-data">
            <input id="file-item" type="file" name="photos" />
            <input type="submit" onClick={this.handleFormClick} />
            </ form>
          </div>
        )
      }
      else if (this.state.view == "changeView"){
        return (
          <Redirect push to="/PollCreated" />
        )
      }
      else {
        return <h1>There was a connection error, please try again later or verify your connection</h1>;
      }
    }
    else {
      return < Login />;
    }
    }

}
function Options(props){
    if(props.value == "No options added yet"){
      return (<h6>Your poll options will appear here once added, confirm pressing the button below: Create Poll </h6>)
    }
    else {
      return ( <h6>{props.index} : {props.options}</h6> )
    }
}
/*
 enctype="multipart/form-data"
<input type="file" name="pic" accept="image/*" />*/
