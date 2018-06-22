import React from 'react';
import {Link} from 'react-router-dom';
import { Grid, Row, Col, Jumbotron, Button} from 'react-bootstrap';
import '../assets/css/AppMediumMessage.css';

 export default function AppMediumMessage(props) {
   let message = props.created ? <h3>Below you can see your polls, you can also create a new one pressing the button below</h3> :
    <h3>You have not created any poll yet, press the button below to create your first poll.</h3>;
   console.log(props.router);
     return (
       <Grid>
          <Row className="show-grid center-text">
            <Col>
              {message}
            </Col>
          </Row>
          <Row className="show-grid center-text">
            <Col>
              <Link to="/CreatePoll"><Button bsStyle="primary" className="margin-bottom-1em">Create Poll</Button></Link>
            </Col>
          </Row>
        </Grid>
     );
   }
