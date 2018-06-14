export function setAuth(token) {
  return {
      'Authorization' : 'Bearer ' + token,
      'Content-Type': 'application/x-www-form-urlencoded'
  }
}
