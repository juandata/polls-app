let getDim =
(currDimentions) => {
  let w = window.innerWidth, h = window.innerHeight,
  dim = "the dimentions are width= " + w + " , height= " + h;
  return dim;
};

let other = (x) => { return "soy other"}

let getLastUrlPar = (lasturl) => {
  let url = window.location.href;
  let lastPar = url.split('/').pop();
  return lastPar;
};


module.exports = {
  first : getDim(),
  second : other(),
  getUrl : getLastUrlPar(),
}
