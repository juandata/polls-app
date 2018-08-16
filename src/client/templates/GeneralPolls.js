import React from 'react';

import { Grid, Row, Col, ButtonToolbar, DropdownButton, MenuItem, Clearfix, PageHeader} from 'react-bootstrap';
import ThumbnailHOC2 from '../atoms/ThumbnailHOC2';
import {Masonery} from '../atoms/Thumbnails';
import store from "../redux/store";
import {connect} from 'react-redux';


let encuestasPublicas = <h1>Cargando...</h1>;
let componente;
 class GeneralPolls extends React.Component {
  constructor(props){
    super(props);
    componente = this;
  }
  componentDidUpdate() {
    console.log("componentDidUpdate");
    console.log(this.props.lasencuestas);
    encuestasPublicas = <h1>el componente cambio</h1>
  }

  componentWillMount(){
    console.log("componentwillmount")
  }
  componentDidMount(){
    console.log("componentdidmount");
  }
  render(){
    console.log(componente.props.lasencuestas.length);
    if(componente.props.lasencuestas.length){
      return (
      <React.Fragment>
        <h2 style={{textAlign: "center"}}>Public Polls</h2>
       < ThumbnailHOC2 polls={this.props.lasencuestas.length} pollsPerRow={4} pollsInfo={this.props.lasencuestas}/>
      </React.Fragment >
      )
    } else {
      return (
        encuestasPublicas
      )
    }


  }
}
const mapStateToProps = (state) => {
    return {
      lasencuestas : state.publicPolls.lasencuestaspublicas,
      error : state.sendErrorReducer.error
    }
}
//wrap App in connect and pass in mapStateToProps
export default connect(mapStateToProps)(GeneralPolls)
