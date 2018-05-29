import React from 'react';
import {Form, FormGroup, Col, ControlLabel, FormControl, Checkbox, Button, PageHeader} from 'react-bootstrap';

export default class Login extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className="container">
      <PageHeader className="header-margins">
        Please login with your username and password
      </PageHeader>
      <Form  horizontal>
        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={2}>
            Email
          </Col>
          <Col sm={10}>
            <FormControl type="email" placeholder="Email" />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={2}>
            Password
          </Col>
          <Col sm={10}>
            <FormControl type="password" placeholder="Password" />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Checkbox>Remember me</Checkbox>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button type="submit">Sign in</Button>
          </Col>
        </FormGroup>
      </Form>
      <PageHeader className="header-margins">
        Not a user? You can register for free!
      </PageHeader>
      <Button className="register" href="/Register" bsStyle="primary" bsSize="large" block>Register</Button>
      </div>
    )
  }

}
