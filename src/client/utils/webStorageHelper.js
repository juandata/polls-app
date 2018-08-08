let saveContent = () => {
  if (typeof(Storage) !== "undefined") {
      // Code for localStorage/sessionStorage.
      return "Web storage available";

  } else {
      return "Sorry! No Web Storage support..";
  }
};


module.exports = saveContent
