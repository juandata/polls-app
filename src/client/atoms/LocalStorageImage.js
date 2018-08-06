import React from 'react';
const axios = require('axios');
import '../assets/css/LocalStorageImage.css';
let url = require('../utils/publicVariables');
let webHelper = require('../utils/webStorageHelper');

export class LocalStorageImage extends React.Component {
  constructor(props){
    super(props);
    this.state = {srcUrl : "nada"};
  }
  componentWillMount(){
    axios.get(url.getImages)
    .then((ans)=>{
      console.log(ans.data)
      //first look for the images available
      ans.data.map((el)=>{
        if(el.contentType === 'image/jpeg' || el.contentType === 'image/png' ){
          console.log(el);
          //let base64 = el.data.data.toString('base64');
          let encode = btoa(el.data.data);
          //console.log(encode);
          console.log(webHelper());
          this.setState({
            srcUrl : 'data:image/png;base64,' +  encode
          });

        }
        else {console.log(el)}
      });

    })
    .catch((err)=>{console.log("the error is ", err)})

  }
  render(){
    return (
      <div>
        <h1>Local Storage Content Rendered</h1>
        <hr/>
        <ImageContainer src="https://bitbucket.org/servidorlocalchile/cdn/raw/9deb10d86c3e8bf7847fa24616342a597254a9ad/images/universe/via%20lactea.jpg" />
        <ImageContainer src={this.state.srcUrl} />

        <hr/>
      </div>
    )
  }
}

function ImageContainer(props){
  return (
    <figure>
      <img src={props.src}
      alt="Universe" className="img-container" />
      <figcaption>Rendered from bitbucket cdn</figcaption>
    </figure>
  )
}
