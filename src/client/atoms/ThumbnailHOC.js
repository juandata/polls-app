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
    var userid = store.getState().userInfo._id;
    console.log(store.getState(), userid);
    store.dispatch(showPoll(theid, userid));
  }
  componentWillMount(){
    masInst = [], pollCol = [];
    console.log(this.props);
    let pollsArr = this.props.pollsInfo.polls;
    let polls = this.props.polls;
    polls = polls == undefined ? 1 : this.props.polls;
    let division = this.props.pollsPerRow, div = polls / division;
    const rowsQuantity = Math.ceil(div);
    //check how many polls are available for correct output of polls and columns
    switch(pollsArr.length) {
          case 1:
              division = 1;
              break;
          case 2:
              division = 2;
              break;
          case 3:
              division = 3;
              break;
          case 4:
              division = 4;
          default:
              division = this.props.pollsPerRow;
      }
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
          /*Adding rows*/
          let theRows = [], finalRows = [], indice = 0;
          for(let cero = 0; cero < rowsQuantity; cero ++){
            // ENTRO TRES VECES
            let columnPerRow = [];
            for(let cero = 0; cero < division; cero ++){
              if(indice < pollsArr.length ){
                columnPerRow.push(pollCol[indice]);
                indice ++;
                //la cantidad de encuestas por row
              }
            }
            let id = randomID(10);
            //theRows.push(columnPerRow);//the individual rows
            //console.log(theRows);
            let theRow = (
              <Row key={id}>
                {columnPerRow}
              </Row>
            );
            finalRows.push(theRow);
          }
          console.log(finalRows);
          masInst.push(finalRows)

  }
  render (){
        return(
          masInst
        )
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
