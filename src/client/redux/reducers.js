const initialState = {
  view : 'Form'
}

export default (state = initialState, action) => {
    switch(action.type){
      case 'change_view' :
      console.log("change view");
      return Object.assign({}, state, {
        view : 'User Created'
      });
      default :
      return state;
    }
}
