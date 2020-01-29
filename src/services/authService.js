import jwtDecode from "jwt-decode";
import http from "./httpService";
import { toast } from "react-toastify";
import { css } from "glamor";
import { auth as lang_auth } from "../language/fr";

const apiURL = process.env.REACT_APP_API_URL + "login";
const tokenKey = "token";

http.setJWT(getJWT());

export async function login(email, password) {
  try {
    const response = await http.post(apiURL, { email, password });
    localStorage.setItem(tokenKey, response.headers["x-auth-token"]);
    return true;
  } catch (ex) {
    console.log(ex);
    toast(lang_auth.fail, {
      className: css({
        color: "#FFFFFF",
        background: "#550C18 !important"
      }),
      progressClassName: css({
        background: "#FFFFFF"
      })
    });
    return false;
  }
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    const decode = jwtDecode(jwt);
    const datetime = new Date();
    return decode.exp < Math.round(datetime.getTime() / 1000) ? null : decode;
  } catch (ex) {
    return null;
  }
}

export function getJWT() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  logout,
  getUser,
  getJWT
};
