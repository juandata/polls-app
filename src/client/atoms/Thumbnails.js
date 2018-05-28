import React from 'react';

import { Grid, Row, Col, Thumbnail, Button,  } from 'react-bootstrap';
import thumbnail from '../assets/img/thumbnaildiv.png';
var masInst = [];
export class Masonery extends React.Component {
  constructor(props){
    super(props);
  }

  componentWillMount(){
    let polls = this.props.polls;
    let div = polls / 4, c;
      for(c = 0; div > c; c ++){
        let theRow = (
          <Row>
          <Col xs={6} md={3}>
            <Thumbnail src={thumbnail}  alt="242x200">
              <h3>Thumbnail label</h3>
              <p>Description</p>
              <p>
                <Button bsStyle="primary">Button</Button>&nbsp;
                <Button bsStyle="default">Button</Button>
              </p>
            </Thumbnail>
          </Col>
          <Col xs={6} md={3}>
            <Thumbnail src={thumbnail}  alt="242x200">
              <h3>Thumbnail label</h3>
              <p>Description</p>
              <p>
                <Button bsStyle="primary">Button</Button>&nbsp;
                <Button bsStyle="default">Button</Button>
              </p>
            </Thumbnail>
          </Col>
          <Col xs={6} md={3}>
            <Thumbnail src={thumbnail}  alt="242x200">
              <h3>Thumbnail label</h3>
              <p>Description</p>
              <p>
                <Button bsStyle="primary">Button</Button>&nbsp;
                <Button bsStyle="default">Button</Button>
              </p>
            </Thumbnail>
          </Col>
          <Col xs={6} md={3}>
            <Thumbnail src={thumbnail}  alt="242x200">
              <h3>Thumbnail label</h3>
              <p>Description</p>
              <p>
                <Button bsStyle="primary">Button</Button>&nbsp;
                <Button bsStyle="default">Button</Button>
              </p>
            </Thumbnail>
          </Col>
          </Row>
        );
        masInst.push(theRow)
      }
      console.log(masInst);
  }
  render (){
        return(
          masInst
  )
 }
}

/*
<Grid fluid={true}>
  <Row>
    <Col xs={6} md={3}>
      <Thumbnail src={thumbnail}  alt="242x200">
        <h3>Thumbnail label</h3>
        <p>Description</p>
        <p>
          <Button bsStyle="primary">Button</Button>&nbsp;
          <Button bsStyle="default">Button</Button>
        </p>
      </Thumbnail>
    </Col>
    <Col xs={6} md={3}>
      <Thumbnail src={thumbnail}  alt="242x200">
        <h3>Thumbnail label</h3>
        <p>Description</p>
        <p>
          <Button bsStyle="primary">Button</Button>&nbsp;
          <Button bsStyle="default">Button</Button>
        </p>
      </Thumbnail>
    </Col>
    <Col xs={6} md={3}>
      <Thumbnail src={thumbnail} alt="242x200">
        <h3>Thumbnail label</h3>
        <p>Description</p>
        <p>
          <Button bsStyle="primary">Button</Button>&nbsp;
          <Button bsStyle="default">Button</Button>
        </p>
      </Thumbnail>
    </Col>
    <Col xs={6} md={3}>
      <Thumbnail src={thumbnail} alt="242x200">
        <h3>Thumbnail label</h3>
        <p>Description</p>
        <p>
          <Button bsStyle="primary">Button</Button>&nbsp;
          <Button bsStyle="default">Button</Button>
        </p>
      </Thumbnail>
    </Col>
  </Row>
  <Row>
    <Col xs={6} md={3}>
      <Thumbnail src={thumbnail}  alt="242x200">
        <h3>Thumbnail label</h3>
        <p>Description</p>
        <p>
          <Button bsStyle="primary">Button</Button>&nbsp;
          <Button bsStyle="default">Button</Button>
        </p>
      </Thumbnail>
    </Col>
    <Col xs={6} md={3}>
      <Thumbnail src={thumbnail}  alt="242x200">
        <h3>Thumbnail label</h3>
        <p>Description</p>
        <p>
          <Button bsStyle="primary">Button</Button>&nbsp;
          <Button bsStyle="default">Button</Button>
        </p>
      </Thumbnail>
    </Col>
    <Col xs={6} md={3}>
      <Thumbnail src={thumbnail} alt="242x200">
        <h3>Thumbnail label</h3>
        <p>Description</p>
        <p>
          <Button bsStyle="primary">Button</Button>&nbsp;
          <Button bsStyle="default">Button</Button>
        </p>
      </Thumbnail>
    </Col>
    <Col xs={6} md={3}>
      <Thumbnail src={thumbnail} alt="242x200">
        <h3>Thumbnail label</h3>
        <p>Description</p>
        <p>
          <Button bsStyle="primary">Button</Button>&nbsp;
          <Button bsStyle="default">Button</Button>
        </p>
      </Thumbnail>
    </Col>
  </Row>
  <Row>
    <Col xs={6} md={3}>
      <Thumbnail src={thumbnail}  alt="242x200">
        <h3>Thumbnail label</h3>
        <p>Description</p>
        <p>
          <Button bsStyle="primary">Button</Button>&nbsp;
          <Button bsStyle="default">Button</Button>
        </p>
      </Thumbnail>
    </Col>
    <Col xs={6} md={3}>
      <Thumbnail src={thumbnail}  alt="242x200">
        <h3>Thumbnail label</h3>
        <p>Description</p>
        <p>
          <Button bsStyle="primary">Button</Button>&nbsp;
          <Button bsStyle="default">Button</Button>
        </p>
      </Thumbnail>
    </Col>
    <Col xs={6} md={3}>
      <Thumbnail src={thumbnail} alt="242x200">
        <h3>Thumbnail label</h3>
        <p>Description</p>
        <p>
          <Button bsStyle="primary">Button</Button>&nbsp;
          <Button bsStyle="default">Button</Button>
        </p>
      </Thumbnail>
    </Col>
    <Col xs={6} md={3}>
      <Thumbnail src={thumbnail} alt="242x200">
        <h3>Thumbnail label</h3>
        <p>Description</p>
        <p>
          <Button bsStyle="primary">Button</Button>&nbsp;
          <Button bsStyle="default">Button</Button>
        </p>
      </Thumbnail>
    </Col>
  </Row>
</Grid>
*/
