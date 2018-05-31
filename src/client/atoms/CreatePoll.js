import React from 'react';
import {Form, FormGroup, Col, ControlLabel, FormControl, Checkbox, Button, PageHeader} from 'react-bootstrap';

var elemento = < Options value="No options added yet"  />;
export default class CreatePoll extends React.Component{
  constructor(props){
    super(props);
    this.getOptions = this.getOptions.bind(this);
    this.submitOptions = this.submitOptions.bind(this);
    this.clearOptions = this.clearOptions.bind(this);
    this.state = {options : ["No options added yet"], change : false}
  }
  getOptions(e){
    var op = e.target.value;
    var splited = op.split(/[\n\r]/g)
    this.setState({
      options : splited
    });
  }
  submitOptions(e){
    e.preventDefault();
    elemento =
    this.state.options.map(function(x, i) {
      if(x == "No options added yet" ){
        return (
          < Options value="No options added yet"  />
        )
      }
      if(x == ""){
        return ;
      }
      else return (
        < Options index={i + 1} options={x} key={i + 1} />
      )
    })
    this.setState({change : !this.state.change});
  }
  clearOptions(e){
    e.preventDefault();
    this.setState({
      options : ["No options added yet"]
    });
    elemento = < Options value="No options added yet"  />
    document.getElementById("text-area").value = "";
  }
  render(){
    return (
      <div className="container">
      <PageHeader className="header-margins">
        Create your poll
      </PageHeader>
      <Form  horizontal>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            Name
          </Col>
          <Col sm={10}>
            <FormControl type="text" placeholder="Name" />
          </Col>
        </FormGroup>

        <FormGroup >
          <Col componentClass={ControlLabel} sm={2}>
          <ControlLabel>Description</ControlLabel>
          </Col>
          <Col sm={10}>
          <FormControl componentClass="textarea" placeholder="Description" />
          </Col >
        </FormGroup>

        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
          <ControlLabel>Options</ControlLabel>
          </Col>
          <Col sm={6}>
          <FormControl componentClass="textarea" id="text-area" placeholder="separate each option with enter"
          onChange={this.getOptions}
          />
          </Col >
          <Col sm={2}>
            <Button type="submit" onClick={this.submitOptions}>Add options</Button><br/><br/>
            <Button type="submit" onClick={this.clearOptions}>Clear</Button>
          </Col>
          <Col sm={2}>
          { elemento }
          </Col>
        </FormGroup>
      </Form>
      </div>
    )
  }

}

function Options(props){

    if(props.value == "No options added yet"){
      return (<h6>Your poll options will appear here once approved</h6>)
    }
    else {
      return ( <h6>{props.index} : {props.options}</h6> )
    }


}
