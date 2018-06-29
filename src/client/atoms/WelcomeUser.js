import React from 'react';
import { Grid, Row, Col, Jumbotron, Button} from 'react-bootstrap';
import Login from './Login';
import ShowUserPolls from './ShowUserPolls';
import AppMediumMessage from './AppMediumMessage';
import store from '../redux/store';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom'
var _= require('lodash/lang');

   function WelcomeUser(props) {
     console.log(props.info);
     console.log(props.fullinfo);
   if(localStorage.token1){
     let answer = props.info.polls.length == 0 ?
     <AppMediumMessage />
     :
     (  <React.Fragment>
          <AppMediumMessage created={true} />
          <ShowUserPolls polls={props.info.polls.length} pollsInfo={props.info}/>
        </React.Fragment>
     )
     return (
       <Grid>
       <Jumbotron>
         <h1>Welcome {props.info.userInfo.name} {props.info.userInfo.lastName}</h1>
         <p>
           I am glad you are back. This is a free service where you can create, edit and share custom polls with the world. <br/>
           If you like this app you can share it with your friends.
         </p>
         <p>
           <Button bsStyle="primary">Share it!</Button>
         </p>
       </Jumbotron>
       {  answer }
       </Grid>
     );
   }
   else {
     //return <Login />;
     return <Login />;
   }
   }


   function mapStateToProps(state) {
     return {
       info : state.userInfo.userInfo,
       fullinfo : state.userInfo
     };
   };
   export default withRouter(connect(mapStateToProps)(WelcomeUser))
