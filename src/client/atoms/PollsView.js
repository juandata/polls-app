import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from "d3";
import { Grid, Row, Col, Thumbnail, Button, Media, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import thumbnail from '../assets/img/thumbnaildiv.png';

function SmallThumbnail(props){
  return (
    <Media>
    <Media.Left>
      <img width={64} height={64} src={thumbnail} alt="thumbnail" />
    </Media.Left>
    <Media.Body>
      <Media.Heading>Media Heading is {props.title} </Media.Heading>
      <p>
        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
        ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at,
        tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate
        fringilla. Donec lacinia congue felis in faucibus.
      </p>
    </Media.Body>
  </Media>
  )
}

export class PollsView extends React.Component {
  constructor(props){
    super(props);
    this.state = {n : "You have not voted yet"};
    this.upd = this.upd.bind(this);
  }
  upd(e){
    const sel = e.target.value;
    this.setState({
      n : "You voted for " + sel
    });
    console.log(sel);
  }
  render (){
        return(
        <Grid fluid={true} >
          <Row className="show-grid">
            <Col xs={12} md={4}>
            <h1>Welcome to ´{this.props.title}´</h1>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Your vote matters</ControlLabel>
              <FormControl componentClass="select" placeholder="select"  onChange={this.upd}>
                <option value="select"  >I´d like to vote for...</option>
                <option value="james">James Rodriguez</option>
                <option value="cuadrado">Juan Guillermo Cuadrado</option>
                <option value="falcao">Radamel Falcao</option>
                <option value="cardona">Edwin Cardona</option>
                <option value="wilmar">Wilmar Barrios</option>
                <option value="muriel">Muriel</option>
                <option value="bacca">Bacca</option>
              </FormControl>
            </FormGroup>
            < SmallThumbnail title={this.props.title} />
            </Col>
            <Col xs={12} md={8}>
              Graph Area <br/>
              {this.state.n}
            </Col>
          </Row>
        </Grid>
  )
 }
}
/*
<Thumbnail src={thumbnail}  alt="242x200">
  <h3>Thumbnail label</h3>
  <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec hendrerit tempor tellus. Donec pretium posuere tellus. Proin quam nisl, tincidunt et, mattis eget, convallis nec, purus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla posuere.
  </p>
  <p>
    <Button bsStyle="primary">Button</Button>&nbsp;
    <Button bsStyle="default">Button</Button>
  </p>
</Thumbnail>
*/
