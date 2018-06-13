import { combineReducers } from 'redux'

const initialState = {
  view : 'Form'
}
const intState = {
   userMessage : 'Username', emailMessage : "Email"
}


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
export const reducer = combineReducers({
  changeView,
  errorMessage
})
