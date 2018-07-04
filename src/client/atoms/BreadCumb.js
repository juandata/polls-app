import React from 'react';
import {Breadcrumb} from 'react-bootstrap';
import '../assets/css/NavBar.css';
import {SearchInput} from './SearchInput';
import logic from '../logic';


export function BreadCumb(props){
  var lastUrl2 = location.pathname;
  let lastPar = decodeURI(lastUrl2.split('/').pop());
  let cv = (
    props.currentPage == "" ?
  <Breadcrumb className="breadCumb">
    <Breadcrumb.Item  href="#"> General Polls</Breadcrumb.Item>
    <Breadcrumb.Item active href="http://getbootstrap.com/components/#breadcrumbs">
      Popular Polls
    </Breadcrumb.Item>
    < SearchInput />
  </Breadcrumb> :

  <Breadcrumb className="breadCumb">
    <Breadcrumb.Item active href="#">{lastPar}</Breadcrumb.Item>
    < SearchInput />
  </Breadcrumb>


  );
  return cv;
}
