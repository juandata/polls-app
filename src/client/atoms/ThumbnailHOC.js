import React from 'react';

import { Grid, Row, Col, Thumbnail, Button,  } from 'react-bootstrap';
import thumbnail from '../assets/img/thumbnaildiv.png';
var masInst = []; var pollCol = [];
export class ThumbnailHOC extends React.Component {
  constructor(props){
    super(props);
  }

  componentWillMount(){
    let polls = this.props.polls;
    let div = polls / this.props.pollsPerRow, c, division = this.props.pollsPerRow;
    let rowDiv = 12 / division;
        //entra dos veces para las rows, por vez cuatro y en la segunda uno
        console.log("rows");
          for(polls; 0 != polls; polls --){
            let unitPoll = (
              <Col xs={12} md={rowDiv}>
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
            );
            pollCol.push(unitPoll);
            console.log("polls");
          }
          let theRow = (
            <Row>
              {pollCol}
            </Row>
          );
          masInst.push(theRow)
  }
  render (){
        return(
          masInst
  )
 }
}
