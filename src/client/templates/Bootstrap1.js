import React from 'react';
/*
Grid Structure Bootstrap 4
    .col- (extra small devices - screen width less than 576px)
    .col-sm- (small devices - screen width equal to or greater than 576px)
    .col-md- (medium devices - screen width equal to or greater than 768px)
    .col-lg- (large devices - screen width equal to or greater than 992px)
    .col-xl- (xlarge devices - screen width equal to or greater than 1200px)
*/
const colors = {
  lavender : {backgroundColor : "lavender"},
  lavenderblush : {backgroundColor : "lavenderblush"}
}
export function Bootstrap1(props){
  return (
  <React.Fragment>
    <div className="container">
      <h1>Bootstrap</h1>
      <p>This part is inside a .container className.</p>
      <p>The .container className provides a responsive fixed width container.</p>
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
      <div className="col-md-4" style={colors.lavender}>.col-md-4</div>
      <div className="col-md-8" style={colors.lavenderblush}>.col-md-8</div>
    </div>
    <div className="row">
      <div className="col-4" style={colors.lavender}>.col-4</div>
      <div className="col-8" style={colors.lavenderblush}>.col-8</div>
    </div>
    <div className="row">
      <div className="col" style={colors.lavender}>.col eq</div>
      <div className="col" style={colors.lavenderblush}>.col eq</div>
      <div className="col" style={colors.lavenderblush}>.col eq</div>

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

    <div className="container">
      <h1>Display Headings</h1>
      <p>Display headings are used to stand out more than normal headings (larger font-size and lighter font-weight):</p>
      <h1 className="display-1">Display 1</h1>
      <h1 className="display-2">Display 2</h1>
      <h1 className="display-3">Display 3</h1>
      <h1 className="display-4">Display 4</h1>
    </div>

    <div className="container">
      <h2>Basic Table</h2>
      <p>The .table className adds basic styling (light padding and horizontal dividers) to a table:</p>
      <table className="table table-striped table-bordered table-hover">
        <thead className="thead-light">
          <tr>
            <th>First</th>
            <th>Last</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
          </tr>
          <tr>
            <td>Mary</td>
            <td>Moe</td>
            <td>mary@example.com</td>
          </tr>
          <tr>
            <td>July</td>
            <td>Dooley</td>
            <td>july@example.com</td>
          </tr>
        </tbody>
      </table>
     </div>

     <div className="container">
      <h2>Alerts</h2>
      <p>The button with className="close" and data-dismiss="alert" is used to close the alert box.</p>
      <p>The alert-dismissible className adds some extra padding to the close button.</p>
      <div className="alert alert-success alert-dismissible">
        <button type="button" className="close" data-dismiss="alert">&times;</button>
        <strong>Success!</strong> This alert box could indicate a successful or positive action.
      </div>
      <div className="alert alert-info alert-dismissible">
        <button type="button" className="close" data-dismiss="alert">&times;</button>
        <strong>Info!</strong> This alert box could indicate a neutral informative change or action.
      </div>
      <div className="alert alert-warning alert-dismissible">
        <button type="button" className="close" data-dismiss="alert">&times;</button>
        <strong>Warning!</strong> This alert box could indicate a warning that might need attention.
      </div>
      <div className="alert alert-danger alert-dismissible">
        <button type="button" className="close" data-dismiss="alert">&times;</button>
        <strong>Danger!</strong> This alert box could indicate a dangerous or potentially negative action.
      </div>
      <div className="alert alert-primary alert-dismissible">
        <button type="button" className="close" data-dismiss="alert">&times;</button>
        <strong>Primary!</strong> Indicates an important action.
      </div>
      <div className="alert alert-secondary alert-dismissible">
        <button type="button" className="close" data-dismiss="alert">&times;</button>
        <strong>Secondary!</strong> Indicates a slightly less important action.
      </div>
      <div className="alert alert-dark alert-dismissible">
        <button type="button" className="close" data-dismiss="alert">&times;</button>
        <strong>Dark!</strong> Dark grey alert.
      </div>
      <div className="alert alert-light alert-dismissible">
        <button type="button" className="close" data-dismiss="alert">&times;</button>
        <strong>Light!</strong> Light grey alert.
      </div>
    </div>
    <div className="container">
      <h2>Button Outline</h2>
      <button type="button" className="btn btn-outline-primary">Primary</button>
      <button type="button" className="btn btn-outline-secondary">Secondary</button>
      <button type="button" className="btn btn-outline-success">Success</button>
      <button type="button" className="btn btn-outline-info">Info</button>
      <button type="button" className="btn btn-outline-warning">Warning</button>
      <button type="button" className="btn btn-outline-danger">Danger</button>
      <button type="button" className="btn btn-outline-dark">Dark</button>
      <button type="button" className="btn btn-outline-light text-dark">Light</button>
    </div>

    <div className="container">
      <h2>Dropdowns</h2>
      <p>The .dropdown className is used to indicate a dropdown menu.</p>
      <p>Use the .dropdown-menu className to actually build the dropdown menu.</p>
      <p>To open the dropdown menu, use a button or a link with a className of .dropdown-toggle and data-toggle="dropdown".</p>
      <div className="dropdown">
        <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
          Dropdown button
        </button>
        <div className="dropdown-menu">
          <a className="dropdown-item" href="#">Link 1</a>
          <a className="dropdown-item" href="#">Link 2</a>
          <a className="dropdown-item" href="#">Link 3</a>
        </div>
      </div>
    </div>

    <div className="container">
      <h2>Animated Progress Bar</h2>
      <p>Add the .progress-bar-animated class to animate the progress bar:</p>
      <div className="progress">
        <div className="progress-bar progress-bar-striped progress-bar-animated" style={{width : "40%"}}></div>
      </div>
    </div>


    <div className="container">
      <h2>Simple Collapsible</h2>
      <p>Click on the button to toggle between showing and hiding content.</p>
      <button type="button" className="btn btn-primary" data-toggle="collapse" data-target="#demo">Simple collapsible</button>
      <div id="demo" className="collapse">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </div>
    </div>

  </ React.Fragment>
  );
}
