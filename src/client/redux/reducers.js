import { combineReducers } from 'redux'
import isEmpty from 'lodash/isEmpty';
const initialState = {
  view : 'Form'
}
const intState = {
   userMessage : 'Username', emailMessage : "Email"
}
const objState = {
  isAuthenticated : false,
  userInfo : {}
};

 let changeView = (state = initialState, action) => {
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
let errorMessage = (state = intState, action) => {
   switch(action.type){
     case 'user_error_message' :
     console.log("user_error_message");
     return Object.assign({}, state, {
       userMessage : 'The user already exists, please choose another one'
     });
     case 'email_error_message' :
     console.log("email_error_message");
     return Object.assign({}, state, {
       emailMessage : 'The Email already exists, please add another one.'
     });
     default :
     return state;
   }
}

let userInfo = (state = objState, action ) => {
  switch (action.type) {
    case  "get_user_info" :
      console.log("get user info");
      return Object.assign({}, state, {
        isAuthenticated : !isEmpty(action.user),
        userInfo : action.user
      })
    default:
    return state;

  }
}
export const reducer = combineReducers({
  changeView,
  errorMessage,
  userInfo
})
