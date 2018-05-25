import React from 'react';
import '../assets/css/Nav.css';
import MenuHover from 'react-icons/lib/md/menu';
var myLogModule = require('../logic.js');

var hideMenu = (
    <ul >
      <li><a href="default.asp">Login</a></li>
      <li><a href="news.asp">Signup</a></li>
      <li><a href="contact.asp">Contact</a></li>
      <li><a href="about.asp">About</a></li>
    </ul>
)
export default class Nav extends React.Component {
    constructor(props){
      super(props);
      this.hidemenu = this.hidemenu.bind(this);
      this.state = { cd: "no dimentions yet", hm: true};
    }
    hidemenu(){
     this.setState({ hm: !this.state.hm});
   }
   componentWillMount(){
      this.setState({
        cd : myLogModule.first
      })
    }

    render() {
      const panel = this.state.hm ? (
        <nav className="panel">
          {hideMenu}
        </nav>
      ) : (
        <nav className="panel display">
          {hideMenu}
        </nav>
      )

    return (
      <React.Fragment>
      <nav className="navigation">
        <ul className="spa-nav">
          <li><a href="default.asp">Login</a></li>
          <li><a href="news.asp">Signup</a></li>
          <li><a href="contact.asp">Contact</a></li>
          <li><a href="about.asp">About</a></li>
        </ul>
        <MenuHover className="menu-hover" onClick={this.hidemenu} />
        <div className="social-links">{this.state.cd}</div>
      </nav>
      {panel}
      </ React.Fragment>
    )
  }
}
/*
border: solid red;
    height: 140px;
    position: absolute;
    left: 0px;
    width: 140px;
*/
