import React from 'react';
import { Alert, Button, Row, Col, Jumbotron } from "react-bootstrap";

const Box = props => <div className="box">{props.children} </div>;

export function BootstrapTest(props) {
  return (
  <React.Fragment>
    <div>
     <Alert color="primary">
       This is a primary alert — check it out!
     </Alert>
     <Alert color="secondary">
       This is a secondary alert — check it out!
     </Alert>
     <Alert color="success">
       This is a success alert — check it out!
     </Alert>
     <Alert color="danger">
       This is a danger alert — check it out!
     </Alert>
     <Alert color="warning">
       This is a warning alert — check it out!
     </Alert>
     <Alert color="info">
       This is a info alert — check it out!
     </Alert>
     <Alert color="light">
       This is a light alert — check it out!
     </Alert>
     <Alert color="dark">
       This is a dark alert — check it out!
     </Alert>
    </div>

    <div>
       <Row>
         <Col>
           <Box> .col </Box>
         </Col>
       </Row>

       <Row>
         <Col xs="6">
           <Box> .col-6 </Box>
         </Col>

         <Col xs="6">
           <Box> .col-6 </Box>
         </Col>
       </Row>

       <Row>
         <Col xs="4">
           <Box> .col-4 </Box>
         </Col>

         <Col xs="4">
           <Box> .col-4 </Box>
         </Col>

         <Col xs="4">
           <Box> .col-4 </Box>
         </Col>
       </Row>

       <Row>
         <Col>
           <Box> .col </Box>
         </Col>

         <Col>
           <Box> .col </Box>
         </Col>

         <Col>
           <Box> .col </Box>
         </Col>

         <Col>
           <Box> .col </Box>
         </Col>
       </Row>

       <Row>
         <Col xs="3">
           <Box> .col-3 </Box>
         </Col>

         <Col xs="auto">
           <Box> .col-auto with variable content</Box>
         </Col>

         <Col xs="3">
           <Box> .col-3 </Box>
         </Col>
       </Row>

       <Row>
         <Col sm={{ size: 6, order: 2, offset: 1 }}>
           <Box> .col-sm-6 .col-sm-order-2 .col-sm-offset-2 </Box>{" "}
         </Col>
       </Row>
       <Row>
         <Col sm="12" md={{ size: 8, offset: 2 }}>
           <Box> .col-sm-12 .col-md-6 .col-md-offset-3 </Box>
         </Col>
       </Row>
    </div>


     <div className="jumbotron text-center">
  <h1>My First Bootstrap Page</h1>
  <p>Resize this responsive page to see the effect!</p>
</div>

<div className="container">
  <div className="row">
    <div className="col-sm-4">
      <h3>Column 1</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>
    </div>
    <div className="col-sm-4">
      <h3>Column 2</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>
    </div>
    <div className="col-sm-4">
      <h3>Column 3</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>
    </div>
  </div>
</div>

    <div>
      <Jumbotron>
        <h1 className="display-3">Hello, world!</h1>
        <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
        <hr className="my-2" />
        <p>It uses utility classNamees for typgraphy and spacing to space content out within the larger container.</p>
        <p className="lead">
          <Button color="primary">Learn More</Button>
        </p>
      </Jumbotron>
    </div>
  </ React.Fragment>
  );
}
