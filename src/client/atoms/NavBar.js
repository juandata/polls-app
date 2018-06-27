import React from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import '../assets/css/NavBar.css'
import store from '../redux/store';
import {connect} from 'react-redux';
function handleSelect(selectedKey) {
  //alert(`selected ${selectedKey}`);
  switch (selectedKey){
    case  1 :
    localStorage.removeItem('token1'); localStorage.removeItem('id'); //the user logout
    default :
    return null;
  }
}
function Register(props){
  if(!props.login){
    return (
      <NavItem eventKey={2} href="/Register">
        Register
      </NavItem>
    )
  } else {
    return <span></span>
  }

}
function NavBar(props){
  let login = props.login ? "Logout" : "Login";
  return(
  <Navbar inverse collapseOnSelect fluid={true}>
  <Navbar.Header>
    <Navbar.Brand>
      <a href="/">Polls Creation App</a>
    </Navbar.Brand>
    <Navbar.Toggle />
  </Navbar.Header>
  <Navbar.Collapse>
    <Nav onSelect={handleSelect}>
      <NavItem eventKey={1} href={"/" + login} >
          {login}
        </NavItem>
        <Register login={props.login}  />
        <NavDropdown eventKey={3} title="Know more..." id="basic-nav-dropdown">
          <MenuItem eventKey={3.1}>About</MenuItem>
          <MenuItem eventKey={3.2}>Hire me!</MenuItem>
          <MenuItem eventKey={3.3}>Questions?</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey={3.4}>Separated link</MenuItem>
        </NavDropdown>
      </Nav>
      <Nav pullRight>
        <NavItem eventKey={1} href="#">
          Link Right
        </NavItem>
        <NavItem eventKey={2} href="#">
          Link Right
        </NavItem>
      </Nav>
    </Navbar.Collapse>
   </Navbar>
  )
}

function mapStateToProps(state) {
  return {
    login : state.userInfo.isAuthenticated
  };
};
export default connect(mapStateToProps)(NavBar)
