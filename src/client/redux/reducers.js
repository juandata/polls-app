import { combineReducers } from 'redux'
import isEmpty from 'lodash/isEmpty';
const initialState = {
  view : 'Form'
}
const intState = {
   userMessage : 'Username', emailMessage : "Email", passMessage : 0
}
const userState = {
  isAuthenticated : false,
  userInfo : {}
};
const tokenState = {
  tokenInfo : {}
}
const layoutState = {
  login : false
}
const changePoll = {
  showPoll : false,
  id : "",
  userid : ""
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
     case 'wrong_password' :
     console.log('wrong_password');
     return Object.assign({}, state, {
       passMessage : 1
     });
     case 'reset_tooltip' :
     console.log('reset_tooltip');
     return Object.assign({}, state, {
       passMessage : 0
     });
     default :
     return state;
   }
}

let userInfo = (state = userState, action ) => {
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
let tokenInfo = (state = tokenState, action ) => {
  switch (action.type) {
    case  "get_token_info" :
      console.log("get_token_info");
      return Object.assign({}, state, {
        tokenInfo : action.info
      })
    default:
    return state;

  }
}
let changeLayout = (state = layoutState, action) => {
  switch (action.type) {
    case "change_layout" :
    console.log("change_layout");
    return Object.assign({}, state, {
      login : true
    })
    default :
    return state
  }
}
let showPoll = (state = changePoll, action) => {
  switch (action.type) {
    case "show_poll" :
    console.log("show_poll");
    return Object.assign({}, state, {
      showPoll : true,
      id : action.id,
      userid : action.userid
    })
    default :
    return state
  }
}
export const reducer = combineReducers({
  changeView,
  errorMessage,
  userInfo,
  tokenInfo,
  changeLayout,
  showPoll
})
