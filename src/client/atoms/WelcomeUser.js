import React from 'react';
import { Grid, Row, Col, Jumbotron, Button} from 'react-bootstrap';
import Login from './Login';
import ShowUserPolls from './ShowUserPolls';

 export default function WelcomeUser(props) {
   if(localStorage.token1){
     return (
       <Grid>
       <Jumbotron>
         <h1>Welcome {props.info.name} {props.info.lastName}</h1>
         <p>
           I am glad you are back. This is a free service where you can create, edit and share custom polls with the world. <br/>
           If you like this app you can share it with your friends.
         </p>
         <p>
           <Button bsStyle="primary">Share it!</Button>
         </p>
       </Jumbotron>
       <ShowUserPolls  />
       </Grid>
     );
   }
   else {
     return <Login />;
   }
   }
