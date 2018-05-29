import React from 'react';

import { Grid, Row, Col, ButtonToolbar, DropdownButton, MenuItem, Clearfix, PageHeader} from 'react-bootstrap';

import {Masonery} from '../atoms/Thumbnails';

export function GeneralPolls(props){
  return(
  <div>
    <PageHeader className="header-margins">
      Check All the Public Polls Created by the Users
    </PageHeader>
    < Masonery polls={20} />
    <Grid fluid={true}>
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
    {gridInstance}
  </div>
  )
}
/*
  PRACTICE CONTENT
*/
const BUTTONS = ['Default', 'Primary', 'Success', 'Info', 'Warning', 'Danger'];

function renderDropdownButton(title, i) {
  return (
    <DropdownButton
      bsStyle={title.toLowerCase()}
      title={title}
      key={i}
      id={`dropdown-basic-${i}`}
    >
      <MenuItem eventKey="1">Action</MenuItem>
      <MenuItem eventKey="2">Another action</MenuItem>
      <MenuItem eventKey="3" active>
        Active Item
      </MenuItem>
      <MenuItem divider />
      <MenuItem eventKey="4">Separated link</MenuItem>
    </DropdownButton>
  );
}

const buttonsInstance = (
  <ButtonToolbar>{BUTTONS.map(renderDropdownButton)}</ButtonToolbar>
);

const dummySentences = [
  'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
  'Donec hendrerit tempor tellus.',
  'Donec pretium posuere tellus.',
  'Proin quam nisl, tincidunt et, mattis eget, convallis nec, purus.',
  'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
  'Nulla posuere.',
  'Donec vitae dolor.',
  'Nullam tristique diam non turpis.',
  'Cras placerat accumsan nulla.',
  'Nullam rutrum.',
  'Nam vestibulum accumsan nisl.'
];

const gridInstance = (
  <Grid fluid={true}>
    <Row className="show-grid">
      <Col sm={6} md={3}>
        <code>&lt;{'Col sm={6} md={3}'} /&gt;</code>
        <br />
        {dummySentences.slice(0, 6).join(' ')}
      </Col>
      <Col sm={6} md={3}>
        <code>&lt;{'Col sm={6} md={3}'} /&gt;</code>
        <br />
        {dummySentences.slice(0, 4).join(' ')}
      </Col>
      <Clearfix visibleSmBlock>
        <code>&lt;{'Clearfix visibleSmBlock'} /&gt;</code>
      </Clearfix>
      <Col sm={6} md={3}>
        <code>&lt;{'Col sm={6} md={3}'} /&gt;</code>
        <br />
        {dummySentences.slice(0, 6).join(' ')}
      </Col>
      <Col sm={6} md={3}>
        <code>&lt;{'Col sm={6} md={3}'} /&gt;</code>
        <br />
        {dummySentences.slice(0, 2).join(' ')}
      </Col>
    </Row>
  </Grid>
);
