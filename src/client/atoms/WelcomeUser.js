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
     //var valor = _.isEmpty(props.info);
     var valor = props.info.hasOwnProperty('userInfo');
     console.log(props.info, valor);
     let name, lastname;
     if(!valor){
       name = props.info.name; lastname = props.info.lastName;
     } else {
        name = props.info.userInfo.name; lastname = props.info.userInfo.lastName;
     }
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
         <h1>Welcome {name} {lastname}</h1>
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
       info : state.userInfo.userInfo
     };
   };
   export default withRouter(connect(mapStateToProps)(WelcomeUser))
