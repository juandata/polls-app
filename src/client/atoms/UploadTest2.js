import React from 'react';
import {LocalStorageImage} from './LocalStorageImage';
const axios = require('axios');
const FormData = require('form-data');
import '../assets/css/UploadTest.css';
let sendData = require('../utils/sendFormData');
let axiosPromise = require('../utils/axiosPromise');
let estado;
let image = document.createElement('img'), image2 = document.createElement('img');
let falso = false;
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
      <video id="video" width="320" height="240" autoPlay controls>
        <source src={props.srcMp4}  type="video/mp4" />

        Your browser does not support the video tag.
      </video>
    </React.Fragment>
  )
}
let preview =   <div id="preview"></div>;
let imageRendered = (
  <React.Fragment>
  <h1>The image from local storage is </h1>
  <div id="elephant"></div>
  </React.Fragment>
);

export default class UploadTest extends React.Component {
  constructor(props) {
  super(props);
  estado = this;
  this.state = {change : false, imgReceived : false, src : 'https://raw.githubusercontent.com/juandata/medios/master/12-2-television-png-pic.png',
  src2 : "",  localSrcWebm : '', localSrcMp4 :  '',
  changeView : false
}
  this.handleFormClick = this.handleFormClick.bind(this);
  this.handleChange = this.handleChange.bind(this);
  this.getRemoteImage = this.getRemoteImage.bind(this);
  this.playVideo = this.playVideo.bind(this);
  }
  componentDidUpdate(prevProps) {
    console.log("did update");
    let el = document.getElementById('video');
    el.load();

  // Typical usage (don't forget to compare props):
  /*if (this.props.userID !== prevProps.userID) {
    this.fetchData(this.props.userID);
  }*/
}
    componentWillMount(){
  /*  let promesa = new Promise(function(resolve, reject){
      resolve(axiosPromise.sendGet("5b60d142fe82600ce46a6001"));
    });
    promesa.then(function(ans){
      falso = true;
      if(falso){
        //let newVideowebm = require('../../server/routes/uploads/5b60d142fe82600ce46a6001.webm');
        //let newVideomp4 = require('../../server/routes/uploads/5b60d142fe82600ce46a6001.mp4');
        let newVideowebm = '../../server/routes/uploads/5b60d142fe82600ce46a6001.webm';
        let newVideomp4 = '../../server/routes/uploads/5b60d142fe82600ce46a6001.mp4';

        estado.setState({localSrcWebm : newVideowebm, localSrcMp4 : newVideomp4});

      }
      },
      function(error){console.log(error)});*/
  }
  playVideo(){
    //let elvideo = document.getElementById('video');
    //elvideo.play();
  }
  getRemoteImage(e){
    /*e.preventDefault();
    let promesa = new Promise(function(resolve, reject){
      resolve(axiosPromise.sendGet());
    });
    promesa.then(function(ans){
    estado.setState({imgReceived : !estado.state.imgReceived, src : 'data:image/png;base64,' + ans.data})
      },
      function(error){console.log(error)});*/

  }/*
  getRemoteVideo(e){
      let promesa = new Promise(function(resolve, reject){
        resolve(axiosPromise.sendGet("5b60d142fe82600ce46a6001"));
      });
      promesa.then(function(ans){
        let newVideowebm = require('../../server/routes/uploads/5b60d142fe82600ce46a6001.webm');
        let newVideomp4 = require('../../server/routes/uploads/5b60d142fe82600ce46a6001.mp4');

      estado.setState({imgReceived : !estado.state.imgReceived, src2 : 'data:video/mp4;base64,' + ans.data,
      localSrcWebm : newVideowebm, localSrcWebm : newVideomp4
     })

        },
        function(error){console.log(error)});

  } */
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
          console.log(response, "succesfully saved to mongodb");
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
        estado.setState({
          changeView : !estado.state.changeView
        });
        //estado.setState({imgReceived : !estado.state.imgReceived, src : 'data:image/png;base64,' + result.data})
    },
      function(error) { console.log("promise rejected and the value is ", error);}
    );
  }
  handleChange(){
    let file = document.getElementById('file-item').files[0];
    console.log(file);
    image.classList.add("preview-img");
    image.file = file;
    document.getElementById('preview').appendChild(image);
    var reader = new FileReader();
    reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(image);
    reader.readAsDataURL(file);
  }
  render(){
    /*let imgView = !this.state.imgReceived ?
    < EmptyImg src={this.state.src}
    alt="Alternativo"/> :
    < EmptyImg src={this.state.src}
    alt="Alternativo"/>;*/
    preview = !this.state.changeView ? preview : <h1>Image sent, check it below rendered from localstorage</h1>;

    return (
    <div>
      <hr />
      <RenderVideo srcMp4='https://bitbucket.org/servidorlocalchile/cdn/raw/9deb10d86c3e8bf7847fa24616342a597254a9ad/videos/Short%20intro%20music.mp4' />
      <hr/>
      <hr />
      <RenderVideo srcMp4='https://bitbucket.org/servidorlocalchile/cdn/raw/9deb10d86c3e8bf7847fa24616342a597254a9ad/videos/Video%20Of%20People%20Walking.mp4' />
      <hr/>
      <div style={{border : "black solid"}}>
      {preview}
      <form method="Post"  encType="multipart/form-data">
        <input type="file" name="file-item" id="file-item" onChange={this.handleChange}/>
        <input type="submit"   onClick={this.handleFormClick} />
      </form>
      </div>
      <hr />
     < LocalStorageImage />
      <hr />
    </div>
    )
  }
}
/*
<RenderSpace src={staticImg} title="Image Rendered from directory"
 alt="alternativo"/>
 <video width="320" height="240" autoPlay>
   <source src={video}  type="video/mp4" />
   Your browser does not support the video tag.
 </video>

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

  <RenderVideo src={this.state.src2} />
  <button onClick={this.getRemoteImage}>Get Remote Image</button>
  <RenderSpace src={this.state.src} title="Image Rendered from Database"
   alt="alternativo"/>
 </div>

*/
//src={window.location.origin + '/video1.mp4'}
