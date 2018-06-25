export const changeView = () => {
  return {
    type : "change_view"
  };
};

export const userErrorMessage = () => {
  return {
    type : "user_error_message"
  };
};

export const emailErrorMessage = () => {
  return {
    type : "email_error_message"
  };
};

export const wrongPassMessage = () => {
  return {
    type: 'wrong_password'
  }
}
export const resetTooltip = () => {
  return {
    type: 'reset_tooltip'
  }
}
/*export const getUserInfo = () => {
  return {
    type : "get_user_info"
  }
}*/
export function getUserInfo(user){
  return {
    type : "get_user_info",
    user
  }
}
export function getTokenInfo(info){
  return {
    type : "get_token_info",
    info
  }
}
export const changeLayout  = () => {
  return {
    type : "change_layout"
  }
};

export function showPoll(id, userid){
  return {
    type : "show_poll",
    id,
    userid
  }
}
