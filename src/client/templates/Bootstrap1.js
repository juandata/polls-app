import React from 'react';

import '../assets/css/bootstrapPractice.css';

const colors = {
  lavender : {backgroundColor : "lavender"},
  lavenderblush : {backgroundColor : "lavenderblush"}
}
export function Bootstrap1(props){
  return (
  <React.Fragment>
    <div className="container">
      <h1>Bootstrap Container</h1>
      <p>This part is inside a .container class.</p>
      <p>The .container class provides a responsive fixed width container.</p>
    </div>

    <div className="container-fluid">
      <h1>Fluid Container</h1>
      <p>This is some text.</p>
    </div>

    <div className="row">
      <div className="col-sm-4" style={colors.lavender}>.col-sm-4</div>
      <div className="col-sm-4" style={colors.lavenderblush}>.col-sm-4</div>
      <div className="col-sm-4" style={colors.lavender}>.col-sm-4</div>
    </div>
    <div className="row">
      <div className="col-md-4" style={colors.lavender}>.col-sm-4</div>
      <div className="col-md-8" style={colors.lavenderblush}>.col-sm-8</div>
    </div>

    <div className="container">
      <h1>Lighter, Secondary Text</h1>
      <p>The small element is used to create a lighter, secondary text in any heading:</p>
      <h1>h1 heading <small>secondary text</small></h1>
      <h2>h2 heading <small>secondary text</small></h2>
      <h3>h3 heading <small>secondary text</small></h3>
      <h4>h4 heading <small>secondary text</small></h4>
      <h5>h5 heading <small>secondary text</small></h5>
      <h6>h6 heading <small>secondary text</small></h6>
      <h1>Highlight Text</h1>
      <p>Use the mark element to <mark>highlight</mark> text.</p>
      <h1>Abbreviations</h1>
      <p>The abbr element is used to mark up an abbreviation or acronym:</p>
      <p>The <abbr title="World Health Organization">WHO</abbr> was founded in 1948.</p>
      <div className="container">
      <h1>Blockquotes</h1>
      <p>The blockquote element is used to present content from another source:</p>
      <blockquote className="blockquote">
        <p>For 50 years, WWF has been protecting the future of nature. The world´s
         leading conservation organization, WWF works in 100 countries and is supported by 1.2 million members in the United States and close to 5 million globally.
         </p>
        <footer className="blockquote-footer">From WWF´s website</footer>
      </blockquote>
      </div>
    </div>

  </ React.Fragment>
  );
}
