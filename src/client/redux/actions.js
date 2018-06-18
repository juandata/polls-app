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
