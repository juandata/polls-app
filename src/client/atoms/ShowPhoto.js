import React from 'react';
import thumbnail from '../assets/img/thumbnaildiv.png';
let thumbnail2, estado;
function arrayBufferToBase64(buffer) {
var binary = '';
var bytes = [].slice.call(new Uint8Array(buffer));

bytes.forEach((b) => binary += String.fromCharCode(b));

return window.btoa(binary);
};
export default class ShowPhoto extends React.Component {
  constructor(props){
    super(props);
    estado = this;
    this.state = { img : thumbnail2};
  }

  componentWillMount(){
  let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
  let reqObj = {
    id : "5b3fdda5ce77e539a0361362"
  }
   fetch('/searchImages', { headers, method : "POST", body : JSON.stringify(reqObj)})
    .then(function(img){
     img.arrayBuffer().then((function(buffer){
       console.log(buffer);
       let base64flag = 'data:image/png;base64,';
       let imageStr = arrayBufferToBase64(buffer);
       console.log(imageStr);
       thumbnail2 = base64flag + imageStr;
       estado.setState({img : thumbnail2});

     }));
   })
 }
  render(){
    console.log(thumbnail2);
    return (
    <div>
      <h1>Show the photo!</h1>
      <img src={this.state.img}  alt="242x200"></img>
    </div>
    )
  }
}
