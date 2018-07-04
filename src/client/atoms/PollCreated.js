import React from 'react';
import '../assets/css/CreatePoll.css'
import { PageHeader, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

//redux stuff
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import store from '../redux/store';
let info, last, redUrl, sendId;
class PollCreated extends React.Component {
  constructor(props){
    super(props);
    this.state = {change : false}
  }

  componentWillMount(){
     info = this.props.pollsInfo;
    console.log(info, info.length);
     last = info[info.length - 1];
     redUrl = "/PollsView/" + last.name;
      sendId = () => {
       let theId = last._id;
       let userid = this.props.userinfo._id;
       store.dispatch(showPoll(theid, userid));
       this.setState({ change : !this.state.change});
     }
  }
  render(){
    return (
    <div className="container text-center">
      <PageHeader className="header-margins">
        <span className="highlighted-text">{last.name}</span> Poll Created!
      </PageHeader>
      <h2>Click below to share the poll with your friends</h2>
      <Button className="register" type="submit" bsStyle="primary" bsSize="large" block
      >Share your poll</Button>
      <h2>You can edit your poll going to <Link to={redUrl} onClick={sendId}>edit your poll</Link></h2>
    </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    pollsInfo: state.userInfo.userInfo.polls,
    userinfo : state.userInfo.userInfo.userInfo
  };
};
export default withRouter(connect(mapStateToProps)(PollCreated))

/*
function PollCreated(props){
  let info = props.pollsInfo;
  console.log(info);
  let last = info.slice(-1);
  let redUrl = "/PollsView/" + last[0].name;
  let sendId = () => {
    let theId = last[0]._id;
    let userid = userinfo._id;
    store.dispatch(showPoll(theid, userid));
  }
  return (
  <div className="container text-center">
    <PageHeader className="header-margins">
      <span className="highlighted-text">{last[0].name}</span> Poll Created!
    </PageHeader>
    <h2>Click below to share the poll with your friends</h2>
    <Button className="register" type="submit" bsStyle="primary" bsSize="large" block
    >Share your poll</Button>
    <h2>You can edit your poll going to <Link to={redUrl} onClick={sendId}>edit your poll</Link></h2>
  </div>
  )
}
*/
