import React from 'react';
import {Form, FormGroup, Col, ControlLabel, FormControl, Checkbox, Button, PageHeader} from 'react-bootstrap';
let state;
export default class Register extends React.Component{
  constructor(props){
    super(props);
    state = this;
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getValidationState = this.getValidationState.bind(this);
    this.state = {
      value: ''
    };
  }
  componentDidMount(){

  }
  componentDidUpdate(prevProps, prevState, snapshot){

  }
  handleClick(e){
    e.preventDefault();
    console.log("clicked");
    state.getValidationState("all");
  }
  getValidationState(e) {
  if(e == this.state.target){
    let length = this.state.value.length;
    if (length > 0) return 'success';
    else return null;
      }
    else if(e == "all"){
      let formArr = ["Name", "formHorizontalLastName", "formHorizontalUserName",
        "formHorizontalEmail", "formHorizontalPassword"];
        formArr.map(function(el){
        console.log(el);
        state.getValidationState(el);
        });



    }
  }

   handleChange(e) {
   this.setState({ value: e.target.value, target : e.target.id });
      }
  render(){
    return (
      <div className="container">
      <PageHeader className="header-margins">
        Fill the form below to register and create your own polls
      </PageHeader>
      <Form  horizontal>
        <FormGroup controlId="Name" validationState={this.getValidationState("Name")}>
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
            <FormControl type="text" placeholder="Username" onChange={this.handleChange} />
          </Col>
        </FormGroup>
        <FormGroup controlId="formControlsSelect" validationState={this.getValidationState("formControlsSelect")}>
          <Col componentClass={ControlLabel} sm={2}><ControlLabel> Gender</ControlLabel></Col>
          <Col  sm={10}>
          <FormControl componentClass="select" placeholder="select">
            <option value="select">Male</option>
            <option value="other">Female</option>
            <option value="other">Prefer not to specify</option>
          </FormControl></ Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalEmail" validationState={this.getValidationState("formHorizontalEmail")}>
          <Col componentClass={ControlLabel} sm={2}>
            Email
          </Col>
          <Col sm={10}>
            <FormControl type="email" placeholder="Email" onChange={this.handleChange} />
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

}
