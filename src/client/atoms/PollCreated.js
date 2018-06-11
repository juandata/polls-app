import React from 'react';
import '../assets/css/CreatePoll.css'
import { PageHeader, Button} from 'react-bootstrap';

export default function PollCreated(props){
  return (
  <div className="container text-center">
    <PageHeader className="header-margins">
      Poll Created!
    </PageHeader>
    <h2>Click below to share the poll with your friends</h2>
    <Button className="register" type="submit" bsStyle="primary" bsSize="large" block
    >Share your poll</Button>
    <h2>You can edit your poll going to <a href="#">edit your poll</a></h2>
  </div>
  )
}
