import React from 'react';
const axios = require('axios');
const FormData = require('form-data');
import video from '../../server/routes/uploads/video1.mp4';
import staticImg from '../../server/routes/uploads/certificado.png';
import '../assets/css/UploadTest.css';
let sendData = require('../utils/sendFormData');
let axiosPromise = require('../utils/axiosPromise');
let estado;
let image = document.createElement('img'), image2 = document.createElement('img');
let EmptyImg = (props)=>{
return  (
    <div>
      <h4>Videos</h4>
      <img className="empty-img" src={props.src} alt={props.alt}>
      </img>
    </div>
  )
}

let RenderSpace = (props) => {
  return (
    <React.Fragment>
      <hr/>
      <h4>{props.title}</h4>
      <div>
        <img src={props.src} alt={props.alt} style={{width: '350px'}}></img>
      </div>
      <hr/>
    </React.Fragment>
  )
}
let RenderVideo = (props)=>{
  return(
    <React.Fragment>
      <video width="320" height="240" autoPlay>
        <source src={props.src}  type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </React.Fragment>
  )
}

export default class UploadTest extends React.Component {
  constructor(props) {
  super(props);
  estado = this;
  this.state = {change : false, imgReceived : false, src : 'https://raw.githubusercontent.com/juandata/medios/master/12-2-television-png-pic.png',
  src2 : ""
}
  this.handleFormClick = this.handleFormClick.bind(this);
  this.handleChange = this.handleChange.bind(this);
  this.getRemoteImage = this.getRemoteImage.bind(this);
  }
  componentWillMount(){
    let promesa = new Promise(function(resolve, reject){
      resolve(axiosPromise.sendGet("5b5f9be5afb990438c666432"));
    });
    promesa.then(function(ans){
    estado.setState({imgReceived : !estado.state.imgReceived, src2 : 'data:video/mp4;base64,' + ans.data})
      },
      function(error){console.log(error)});
  }
  getRemoteImage(e){
    e.preventDefault();
    let promesa = new Promise(function(resolve, reject){
      resolve(axiosPromise.sendGet());
    });
    promesa.then(function(ans){
    estado.setState({imgReceived : !estado.state.imgReceived, src : 'data:image/png;base64,' + ans.data})
      },
      function(error){console.log(error)});
  }
  getRemoteVideo(e){
    e.preventDefault();
    let promesa = new Promise(function(resolve, reject){
      resolve(axiosPromise.sendGet("5b5f9f64c624df1b90cb04c6"));
    });
    promesa.then(function(ans){
    estado.setState({imgReceived : !estado.state.imgReceived, src2 : 'data:video/mp4;base64,' + ans.data})
      },
      function(error){console.log(error)});
  }
  handleFormClick(e){
    e.preventDefault();
    //promises
    let promise = new Promise(function(resolve, reject) {
      const url = 'http://localhost:3000/API/images/';
      let file =  document.getElementById('file-item').files[0];
      let data = new FormData();
      data.append('file-item', file, file.fileName);
    let elem =  axios.post(url, data, {
        headers: {
          'accept': 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
          'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        }
      })
        .then((response) => {
          console.log(response, "succesfully saved to mongodb and local folder");
          return response;
          //handle success
        }).catch((error) => {
          //handle error
        });
    elem.then(function(el){resolve(el);})

    });
    promise.then(
      function(result) {
        console.log("promise resolved and the value is ", result.data);
        estado.setState({imgReceived : !estado.state.imgReceived, src : 'data:image/png;base64,' + result.data})
    },
      function(error) { console.log("promise rejected and the value is ", error);}
    );
  }
  handleChange(){
    let file = document.getElementById('file-item').files[0];
    console.log(file);
    image.classList.add("obj");
    image.file = file;
    document.getElementById('preview').appendChild(image);
    var reader = new FileReader();
    reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(image);
    reader.readAsDataURL(file);
  }
  render(){
    let imgView = !this.state.imgReceived ?
    < EmptyImg src={this.state.src}
    alt="Alternativo"/> :
    < EmptyImg src={this.state.src}
    alt="Alternativo"/>;

    return (
    <div>
      <form method="Post"  encType="multipart/form-data">
        <input type="file" name="file-item" id="file-item" onChange={this.handleChange}/>
        <input type="submit"   onClick={this.handleFormClick} />
      </form>
      <div className="comparison">
      <div id="preview"></div>
      {imgView}
      <video width="320" height="240" autoPlay>
        <source src="https://www.videvo.net/videvo_files/converted/2014_08/preview/Earth_Zoom_In.mov35908.webm" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <video width="320" height="240" autoPlay>
        <source src={video}  type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      </div>
      <hr/>
      <RenderSpace src={staticImg} title="Image Rendered from directory"
       alt="alternativo"/>
       <button onClick={this.getRemoteImage}>Get Remote Image</button>
       <RenderSpace src={this.state.src} title="Image Rendered from Database"
        alt="alternativo"/>
        <button onClick={this.getRemoteVideo}>Get Remote Image</button>
        <RenderVideo src={this.state.src2} />
    </div>
    )
  }
}
//src={window.location.origin + '/video1.mp4'}
