import React from 'react';
var randomID = require("random-id");
import { Grid, Row, Col, Thumbnail, Button,  } from 'react-bootstrap';
import thumbnail from '../assets/img/thumbnaildiv.png';
import {PollsView} from './PollsView';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';

import store from '../redux/store';
import {connect} from 'react-redux';
import {showPoll} from '../redux/actions';
var masInst = []; var pollCol = [];
 class ThumbnailHOC extends React.Component {
  constructor(props){
    super(props);
    this.sendId = this.sendId.bind(this);
  }
  sendId(e){
    var theid = e.target.id;
    console.log("the state in thumbnail is ", store.getState());
    //var userid = store.getState().userInfo.userInfo.id;
    var userid = localStorage.id;
    console.log(store.getState(), userid);
    store.dispatch(showPoll(theid, userid));
  }
  componentWillMount(){
    masInst = [], pollCol = [];
    let pollsArr = this.props.pollsInfo.polls;
    /*pollsArr.map(function(el, ind){
    });*/
    let polls = this.props.polls;
    let div = polls / this.props.pollsPerRow, c, division = this.props.pollsPerRow;
    let rowDiv = 12 / division;
          for(polls; 0 != polls; polls --){
            let unitPoll = (
              <Col xs={12} md={rowDiv} key={pollsArr[polls -1]._id}>
                  <Thumbnail src={thumbnail}  alt="242x200" >
                    <h3>{pollsArr[polls - 1].name}</h3>
                    <p>{pollsArr[polls - 1].description}</p>
                    <p>
                    <Link to={"/PollsView/" + pollsArr[polls - 1].name} >
                          <Button bsStyle="primary" onClick={this.sendId} id={pollsArr[polls -1]._id}>ver</Button>&nbsp;
                      </Link>
                      <Button bsStyle="default">compartir</Button>
                    </p>
                  </Thumbnail>
                </Col>
            );
            pollCol.push(unitPoll);

          }
          let id = randomID(10);
          let theRow = (
            <Row key={id}>
              {pollCol}
            </Row>
          );
          masInst.push(theRow)

  }
  render (){
    console.log(this.props.id, this.props.userid);
      //if(this.props.showPoll == false){
        return(
          masInst
        )
      //} else {
        //return <PollsView id={this.props.id} userid={this.props.pollsInfo.id} />;
      //}

 }
}

function mapStateToProps(state) {
  return {
    showPoll : state.showPoll.showPoll,
    id : state.showPoll.id,
    userid : state.showPoll.userid

  };
};
export default withRouter(connect(mapStateToProps)(ThumbnailHOC))
