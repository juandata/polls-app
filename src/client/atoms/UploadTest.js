import React from 'react';
import '../assets/css/UploadTest.css';
let sendData = require('../utils/sendFormData');
let estado;
let image = document.createElement('img');
let EmptyImg = (props)=>{
return  (
    <img className="empty-img" src={props.src} alt={props.alt}></img>
  )
}



export default class UploadTest extends React.Component {
  constructor(props) {
  super(props);
  estado = this;
  this.state = {change : false, imgReceived : false}
  this.handleFormClick = this.handleFormClick.bind(this);
  this.handleChange = this.handleChange.bind(this);
  }
  handleFormClick(e){
    e.preventDefault();

    var p1 = new Promise( (resolve, reject) => {
          resolve('Success!');
          let resp = sendData.send();

          // or
          // reject ("Error!");
        } );

        p1.then( value => {
          console.log(value); // Success!
        }, reason => {
          console.log(reason); // Error!
        } );

    //let resp = sendData.send();
    estado.setState({imgReceived : !estado.state.imgReceived})

  }
  handleChange(){
    let file = document.getElementById('file-item').files[0];
    image.classList.add("obj");
    image.file = file;
    document.getElementById('preview').appendChild(image);
    var reader = new FileReader();
    reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(image);
    reader.readAsDataURL(file);
  }
  render(){
    let imgView = !this.state.imgReceived ?
    < EmptyImg src="https://raw.githubusercontent.com/juandata/medios/master/12-2-television-png-pic.png"
    alt="Alternativo"/> :
    < EmptyImg src="https://raw.githubusercontent.com/juandata/medios/master/12-2-television-png-pic.png"
    alt="Alternativo"/>;

    return (
    <div>
      <form method="Post"  encType="multipart/form-data">
        <input type="file" name="file-item" id="file-item" onChange={this.handleChange}/>
        <input type="submit"   onClick={this.handleFormClick} />
      </form>
      <div id="preview"></div>
      {imgView}
    </div>
    )
  }
}
