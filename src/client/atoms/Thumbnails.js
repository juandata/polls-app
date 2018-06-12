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
          <Col xs={12} md={3}>
            <Thumbnail src={thumbnail}  alt="242x200">
              <h3>Thumbnail label</h3>
              <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec hendrerit tempor tellus. Donec pretium posuere tellus. Proin quam nisl, tincidunt et, mattis eget, convallis nec, purus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla posuere.
              </p>
              <p>
                <Button bsStyle="primary">Button</Button>&nbsp;
                <Button bsStyle="default">Button</Button>
              </p>
            </Thumbnail>
          </Col>
          <Col xs={12} md={3}>
            <Thumbnail src={thumbnail}  alt="242x200">
              <h3>Thumbnail label</h3>
              <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec hendrerit tempor tellus. Donec pretium posuere tellus. Proin quam nisl, tincidunt et, mattis eget, convallis nec, purus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla posuere.
              </p>
              <p>
                <Button bsStyle="primary">Button</Button>&nbsp;
                <Button bsStyle="default">Button</Button>
              </p>
            </Thumbnail>
          </Col>
          <Col xs={12} md={3}>
            <Thumbnail src={thumbnail}  alt="242x200">
              <h3>Thumbnail label</h3>
              <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec hendrerit tempor tellus. Donec pretium posuere tellus. Proin quam nisl, tincidunt et, mattis eget, convallis nec, purus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla posuere.
              </p>
              <p>
                <Button bsStyle="primary">Button</Button>&nbsp;
                <Button bsStyle="default">Button</Button>
              </p>
            </Thumbnail>
          </Col>
          <Col xs={12} md={3}>
            <Thumbnail src={thumbnail}  alt="242x200">
              <h3>Thumbnail label</h3>
              <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec hendrerit tempor tellus. Donec pretium posuere tellus. Proin quam nisl, tincidunt et, mattis eget, convallis nec, purus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla posuere.
              </p>
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
  }
  render (){
        return(
          masInst
  )
 }
}
