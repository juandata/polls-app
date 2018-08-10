import React from 'react';
const axios = require('axios');
import '../assets/css/LocalStorageImage.css';
let url = require('../utils/publicVariables');
let webHelper = require('../utils/webStorageHelper');

let theanswer = [];
let pruebaarray = [];
let estado;
let prueba = [1, 2, 3, 4, 5]

function ImageContainer(props){
  return (
    <figure>
      <img src={props.src}
      alt={props.alt} className="img-container" />
      <figcaption>Rendered from bitbucket cdn</figcaption>
    </figure>
  )
}

export class LocalStorageImage extends React.Component {
  constructor(props){
    super(props);
    estado = this;
    this.state = {srcUrl : "nada", render : false};
  }
  componentDidMount(){
    axios.get(url.getImages)
    .then((ans)=>{
      console.log(ans.data);
      console.log(webHelper());
      for(const key in ans.data){
        let value = ans.data[key];
        theanswer.push(
         <ImageContainer src={'data:image/png;base64,' +  value.base64}   alt={value.id} key={value.id} />
        );
      }

      estado.setState({
        render : !estado.state.render
      })
        //theanswer.push(<ImageContainer src={el.base64}  alt={el.id} />);
      //first look for the images available
    /*  ans.data.map((el)=>{
        if(el.contentType === 'image/jpeg' || el.contentType === 'image/png' ){
          console.log(el);
          //let base64 = el.data.data.toString('base64');
          //let encode = btoa(el.data.data);
          //console.log(encode);
          console.log(webHelper());
          this.setState({
            srcUrl : 'data:image/png;base64,' +  el
          });

        }
        else {console.log(el)}
      });*/

    })
    .catch((err)=>{console.log("the error is ", err)})

  }
  render(){
    let arreglorender = prueba.map(function(el, ind){
      return <h4>{`${el}`}</h4>;
    });
    let elemen = function(){ <React.Fragment>{theanswer[0]}</React.Fragment>}

    console.log( theanswer[0]);

    return (
      <div>
        <h1>Local Storage Content Rendered</h1>
        <hr/>
        <ImageContainer src="https://bitbucket.org/servidorlocalchile/cdn/raw/9deb10d86c3e8bf7847fa24616342a597254a9ad/images/universe/via%20lactea.jpg"
        alt="alt" />
        <ImageContainer src={this.state.srcUrl}   alt="alt" />
        <hr/>
        <h1>Iterating the answer</h1>
        {arreglorender}
        {elemen}
        <hr />
      </div>
    )
  }
}
