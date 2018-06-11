import React from 'react';
import '../assets/css/CreatePoll.css'
import { PageHeader, Button} from 'react-bootstrap';

export default function UserRegistered(props){
  return (
  <div className="container text-center">
    <PageHeader className="header-margins">
      Congratulations {props.options[0] + " " + props.options[1]}
      , you have registered!
    </PageHeader>
    <h2>Please check your email to validate it. </h2>
    <h2>Once you validate your email you will be able to login with your <br/> username/email:
    <strong> {props.options[2] + " / " + props.options[3]}</strong> <br/> and password</h2>
    <h2>Did not received the email? Click below to resend the confirmation email</h2>
    <Button className="register" type="submit" bsStyle="primary" bsSize="large" block
    >Resend confirmation email</Button>
  </div>
  )
}
