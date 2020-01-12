import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
import { css } from "glamor";
import http from "./httpService";
import { login as lang_login } from "../language/fr";

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
    toast(lang_login.fail, {
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
    return jwtDecode(jwt);
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
