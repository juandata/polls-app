import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from "d3";
import { Grid, Row, Col, Thumbnail, Button, Media, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import {Barchart} from './d3practice';
import logic from '../logic';
import Login from './Login';
import thumbnail from '../assets/img/thumbnaildiv.png';

//redux stuff
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import store from '../redux/store';

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
}, headers: {
'Accept': 'application/json',
'Content-Type': 'application/json'
}, theuserid;
class PollsView extends React.Component {
        constructor(props){
          super(props);
          this.state = {poll : pollTemplate, vote : "you have not voted yet" };
          this.upd = this.upd.bind(this);
        }
        componentWillMount(){
          if(localStorage.token1){
            var polls = store.getState().userInfo.userInfo.polls;
            theuserid = store.getState().userInfo.userInfo.userInfo._id;
            var theid = this.props.id;
          }
          if(polls != undefined){
            const url = decodeURI(logic.getUrl);
            console.log(theuserid, theid);
            const bodyReq = {
              id : theid,
              userid : theuserid
            }
            if(bodyReq.id == ""){
              for (var i = 0; i < polls.length; i ++){
                if(polls[i].name == url ) {
                  bodyReq.id = polls[i]._id;
                  bodyReq.userid = theuserid;
                }
              }
            }
            console.log(bodyReq);
            fetch('/getMongo', {
              headers,
              method: "POST",
              body: JSON.stringify(bodyReq)
            })
            .then(function(response) {
                return response.json();
              })
            .then(function(json){
              console.log(json);
                return json
              })
            .then( resp => this.setState({poll: resp } ) )
          }

        }
        upd(e){
          let currVal = this.state.poll.options[e.target.value];
          let voto = e.target.value;
          const bodyReq = {
            userid : theuserid,
            id : this.state.poll._id,
            vote : "options." + e.target.value,
            voteVal : currVal
          }
          console.log(bodyReq);
          fetch('/voteMongo', {
            headers,
            method : "POST",
            body : JSON.stringify(bodyReq)
          })
          .then(function(response){
            return response.json();
          }).
          then(resp => this.setState({poll: resp, vote : voto } ) );
        }
  render (){
        if(localStorage.token1){
          return(
          <Grid fluid={true} >
            <Row className="show-grid">
              <Col xs={12} md={4}>
              <h1>Welcome to <strong> {this.state.poll.name} </strong> Poll</h1>
              <FormGroup controlId="formControlsSelect">
                <ControlLabel>Your vote matters</ControlLabel>
                <FormControl componentClass="select" placeholder="select"  onChange={this.upd}>
                <option >I´d like to vote for...</option>
                {
                  Object.entries(this.state.poll.options).map(function(el, ind){
                    return <option value={el[0]} key={ind}> {el[0]}</option>;
                  })

                }
                </FormControl>
              </FormGroup>
              < SmallThumbnail title={this.state.poll.name} descr={this.state.poll.description}/>
              </Col>
              <Col xs={12} md={8} style={{textAlign : "center"}}>
                Graph Area <br/>
                <Barchart data={this.state.poll.options} />
                <h1>You voted for : {this.state.vote}</h1>
                <h2>The voting count is: </h2>
                <ul>
                {Object.entries(this.state.poll.options).map(function(el, ind){
                  return <li key={ind}>{el[0]} : {el[1]}</li>;
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
        else {
          return < Login />
        }
 }
}
function mapStateToProps(state) {
  return {
    showPoll : state.showPoll.showPoll,
    id : state.showPoll.id,
    userid : state.showPoll.userid

  };
};
export default withRouter(connect(mapStateToProps)(PollsView))
