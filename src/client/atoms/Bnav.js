import React from 'react';
import { Alert, Button, Nav, NavItem, NavDropdown, MenuItem, Grid, Row, Col } from 'react-bootstrap';

export default function Bnav(props){
  return(
    <React.Fragment>
    <Alert bsStyle="warning">
      <strong>Holy guacamole!</strong> Best check yo self, youre not looking too
      good.
    </Alert>
    < AlertDismissable />
    < NavDropdownExample />
    < BasicGrid  />
    </React.Fragment>
  )
}

class AlertDismissable extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleDismiss = this.handleDismiss.bind(this);
    this.handleShow = this.handleShow.bind(this);

    this.state = {
      show: true
    };
  }

  handleDismiss() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    if (this.state.show) {
      return (
        <Alert bsStyle="danger" onDismiss={this.handleDismiss}>
          <h4>Oh snap! You got an error!</h4>
          <p>
            Change this and that and try again. Duis mollis, est non commodo
            luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
            Cras mattis consectetur purus sit amet fermentum.
          </p>
          <p>
            <Button bsStyle="danger">Take this action</Button>
            <span> or </span>
            <Button onClick={this.handleDismiss}>Hide Alert</Button>
          </p>
        </Alert>
      );
    }

    return <Button onClick={this.handleShow}>Show Alert</Button>;
  }
}

class NavDropdownExample extends React.Component {
  handleSelect(eventKey) {
    event.preventDefault();
    alert(`selected ${eventKey}`);
  }

  render() {
    return (
      <Nav bsStyle="tabs" activeKey="1" onSelect={k => this.handleSelect(k)}>
        <NavItem eventKey="1" href="/home">
          NavItem 1 content
        </NavItem>
        <NavItem eventKey="2" title="Item">
          NavItem 2 content
        </NavItem>
        <NavItem eventKey="3" disabled>
          NavItem 3 content
        </NavItem>
        <NavDropdown eventKey="4" title="Dropdown" id="nav-dropdown">
          <MenuItem eventKey="4.1">Action</MenuItem>
          <MenuItem eventKey="4.2">Another action</MenuItem>
          <MenuItem eventKey="4.3">Something else here</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey="4.4">Separated link</MenuItem>
        </NavDropdown>
      </Nav>
    );
  }
}

function BasicGrid(props){
  return (
    <Grid>
        <Row className="show-grid">
          <Col xs={12} md={8}>
            <code>&lt;{'Col xs={12} md={8}'} /&gt;</code>
          </Col>
          <Col xs={6} md={4}>
            <code>&lt;{'Col xs={6} md={4}'} /&gt;</code>
          </Col>
        </Row>

        <Row className="show-grid">
          <Col xs={6} md={4}>
            <code>&lt;{'Col xs={6} md={4}'} /&gt;</code>
          </Col>
          <Col xs={6} md={4}>
            <code>&lt;{'Col xs={6} md={4}'} /&gt;</code>
          </Col>
          <Col xsHidden md={4}>
            <code>&lt;{'Col xsHidden md={4}'} /&gt;</code>
          </Col>
        </Row>

        <Row className="show-grid">
          <Col xs={6} xsOffset={6}>
            <code>&lt;{'Col xs={6} xsOffset={6}'} /&gt;</code>
          </Col>
        </Row>

        <Row className="show-grid">
          <Col md={6} mdPush={6}>
            <code>&lt;{'Col md={6} mdPush={6}'} /&gt;</code>
          </Col>
          <Col md={6} mdPull={6}>
            <code>&lt;{'Col md={6} mdPull={6}'} /&gt;</code>
          </Col>
        </Row>
     </Grid>
  )
}
