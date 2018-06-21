import React from 'react';

import { Grid, Row, Col, Thumbnail, Button,  } from 'react-bootstrap';
import thumbnail from '../assets/img/thumbnaildiv.png';
import {PollsView} from './PollsView';

import store from '../redux/store';
import {connect} from 'react-redux';
import {showPoll} from '../redux/actions';
var masInst = []; var pollCol = [];
 class ThumbnailHOC extends React.Component {
  constructor(props){
    super(props);
    this.changeView = this.changeView.bind(this);
  }
  changeView(e){
    var theid = e.target.id;
    store.dispatch(showPoll(theid));
  }
  componentWillMount(){
    let pollsArr = this.props.pollsInfo.polls;
    /*pollsArr.map(function(el, ind){
    });*/
    let polls = this.props.polls;
    let div = polls / this.props.pollsPerRow, c, division = this.props.pollsPerRow;
    let rowDiv = 12 / division;
          for(polls; 0 != polls; polls --){
            let unitPoll = (
              <Col xs={12} md={rowDiv}>
                  <Thumbnail src={thumbnail}  alt="242x200">
                    <h3>{pollsArr[polls - 1].name}</h3>
                    <p>{pollsArr[polls - 1].description}</p>
                    <p>
                      <Button bsStyle="primary" onClick={this.changeView} id={pollsArr[polls -1]._id}>ver</Button>&nbsp;
                      <Button bsStyle="default">compartir</Button>
                    </p>
                  </Thumbnail>
                </Col>
            );
            pollCol.push(unitPoll);

          }
          let theRow = (
            <Row>
              {pollCol}
            </Row>
          );
          masInst.push(theRow)

  }
  render (){
    console.log(this.props.id);
      if(this.props.showPoll == false){
        return(
          masInst
        )
      } else {
        return <PollsView id={this.props.id} userid={this.props.pollsInfo.id} />;
      }

 }
}

function mapStateToProps(state) {
  return {
    showPoll : state.showPoll.showPoll,
    id : state.showPoll.id
  };
};
export default connect(mapStateToProps)(ThumbnailHOC)
