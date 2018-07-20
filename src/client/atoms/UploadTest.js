import React from 'react';
let sendData = require('../utils/sendFormData');
let estado;
let image = document.createElement('img');
export default class UploadTest extends React.Component {
  constructor(props) {
  super(props);
  estado = this;
  this.state = {change : false}
  this.handleFormClick = this.handleFormClick.bind(this);
  this.handleChange = this.handleChange.bind(this);
  }
  handleFormClick(e){
    e.preventDefault();
    //let resp = sendData.send();
    let resp = sendData.send();
    console.log(resp);
  }
  handleChange(){
    console.log("changed");
    let file = document.getElementById('file-item').files[0];
    image.classList.add("obj");
    image.file = file;
    document.getElementById('preview').appendChild(image);
    var reader = new FileReader();
    reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(image);
    reader.readAsDataURL(file);
    //estado.setState({change : !estado.state.change})
  }
  render(){
    return (
    <div>
      <form method="Post"  encType="multipart/form-data">
        <input type="file" name="file-item" id="file-item" onChange={this.handleChange}/>
        <input type="submit"   onClick={this.handleFormClick} />
      </form>
      <div id="preview"></div>
    </div>
    )
  }
}
