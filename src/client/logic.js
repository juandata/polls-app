let getDim =
(currDimentions) => {
  let w = window.innerWidth, h = window.innerHeight,
  dim = "the dimentions are width= " + w + " , height= " + h;
  return dim;
};

let other = (x) => { return "soy other"}
module.exports = {
  first : getDim(),
  second : other()
}
