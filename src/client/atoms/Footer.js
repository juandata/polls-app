import React from 'react';

import '../assets/css/Footer.css'

import mongo from '../assets/img/mongodb.png';
import express from '../assets/img/express.png';
import react from '../assets/img/reactjs.png';
import node from '../assets/img/nodejs.png';
import webpack from '../assets/img/webpack.svg';

export default function Footer(props){
  return (
    <footer>
    <div className="jumbotron text-center">
    <h4>Powered by</h4>
    <div className="logo-container">
     <img src={mongo} className="rounded logo" alt="MongoDB" />
     <img src={express} className="rounded logo" alt="Express" />
     <img src={react} className="rounded logo" alt="ReactJS" />
     <img src={node} className="rounded logo" alt="NodeJS" />
     <img src={webpack} className="rounded logo" alt="Webpack" />
     </div>
    </div>
    </footer>
  )
}
