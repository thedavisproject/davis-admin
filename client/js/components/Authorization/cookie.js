import Cookie from "js-cookie";


const AUTH_COOKIE = "davis-token";

export function getAuthCookie(){
  return Cookie.get(AUTH_COOKIE);
}

export function setAuthCookie(token){
  Cookie.set(AUTH_COOKIE, token);
}

export function removeAuthCookie(){
  Cookie.remove(AUTH_COOKIE);
}
