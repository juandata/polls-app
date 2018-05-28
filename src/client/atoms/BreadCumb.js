import React from 'react';
import {Breadcrumb} from 'react-bootstrap';
import '../assets/css/NavBar.css';


export function BreadCumb(props){
  let cv = (
    props.currentPage == "" ?
  <Breadcrumb>
    <Breadcrumb.Item  href="#"> General Polls</Breadcrumb.Item>
    <Breadcrumb.Item active href="http://getbootstrap.com/components/#breadcrumbs">
      Popular Polls
    </Breadcrumb.Item>
  </Breadcrumb> :
  <Breadcrumb>
    <Breadcrumb.Item active href="#">{props.currentPage}</Breadcrumb.Item>
  </Breadcrumb>
  );
  return cv;
}
