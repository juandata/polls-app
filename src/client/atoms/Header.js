import React from 'react';
import '../assets/css/Header.css'
import fork from '../assets/img/fork.png';

export default function Header(props){
  return (
    <header>
      <div className="jumbotron text-center">
        <a href="https://github.com/juandata/polls-app" target="_blank"><img className="fork" src={fork} alt="Fork Me"/></a>
        <h1 className="header">POLLS CREATION APP</h1>
        <p>Created by <a href="http://juandavidarce.co/" target="_blank"><span className="badge badge-secondary">Juan David Tabares Arce</span></a></p>
      </div>
    </header>
  )
}
