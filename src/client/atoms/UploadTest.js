import React from 'react';
let sendData = require('../utils/sendFormData');

export default class UploadTest extends React.Component {
  constructor(props) {
  super(props);
  this.handleFormClick = this.handleFormClick.bind(this);
  }
  handleFormClick(e){
    e.preventDefault();
    //let resp = sendData.send();
    let resp = sendData.send();
    console.log(resp);
  }
  render(){
    return (
    <div>
      <form method="Post"  encType="multipart/form-data">
        <input type="file" name="file-item" id="file-item" />
        <input type="submit"   onClick={this.handleFormClick} />
      </form>
    </div>
    )
  }
}
