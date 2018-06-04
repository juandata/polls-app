import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from "d3";
import { Grid, Row, Col, Thumbnail, Button, Media, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import {Barchart} from './d3practice';
import logic from '../logic';

import thumbnail from '../assets/img/thumbnaildiv.png';

function SmallThumbnail(props){
  return (
    <Media>
    <Media.Left>
      <img width={64} height={64} src={thumbnail} alt="thumbnail" />
    </Media.Left>
    <Media.Body>
      <Media.Heading>{props.title} </Media.Heading>
      <p>
        {props.descr}
      </p>
    </Media.Body>
  </Media>
  )
}
var el;
let pollTemplate = {
  name : "No Poll Found",
  description : "Description of the Poll",
  options : ["1", "2", "3"]
}
export class PollsView extends React.Component {
  constructor(props){
    super(props);
    this.state = {poll : pollTemplate, vote : "you have not voted yet", id : "5b15c2463a52ea006c3a8b27" };
    this.upd = this.upd.bind(this);
  }
  componentWillMount(){
    const url = logic.getUrl;
    const id = this.state.id;
    var headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    };
    fetch('/getMongo', {
      headers,
      method: "POST",
      body: id
    })
    .then(function(response) {
        return response.json();
      })
    .then(function(json){
        return json
      })
    .then( resp => this.setState({poll: resp[0] } ) )
  }
  upd(e){
    this.setState({vote : e.target.value});
  }
  render (){
        return(
        <Grid fluid={true} >
          <Row className="show-grid">
            <Col xs={12} md={4}>
            <h1>Welcome to <strong> {this.state.poll.name} </strong> Poll</h1>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Your vote matters</ControlLabel>
              <FormControl componentClass="select" placeholder="select"  onChange={this.upd}>
              <option value="select"  >I´d like to vote for...</option>
                {this.state.poll.options.map(function(el, ind){
                   return <option value={el[0]} key={ind}>{el[0]}</option>
                })}
              </FormControl>
            </FormGroup>
            < SmallThumbnail title={this.state.poll.name} descr={this.state.poll.description}/>
            </Col>
            <Col xs={12} md={8}>
              Graph Area <br/>
              <Barchart data="data"/>
              <h1>You voted for : {this.state.vote}</h1>
              <h2>The voting count is: </h2>
              <ul>
                {
                  this.state.poll.options.map(function(el, ind){
                    return <li key={ind}>{el[0]} : {el[1]}</li>
                  })
                }
              </ul>
              <h2>the id is: </h2>
              {this.state.poll._id}
            </Col>
          </Row>
        </Grid>
  )
 }
}
