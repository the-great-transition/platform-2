import jwtDecode from "jwt-decode";
import http from "./httpService";

const apiURL = process.env.REACT_APP_API_URL + "login";
const tokenKey = "token";

http.setJWT(getJWT());

export async function login(email, password) {
  const response = await http.post(apiURL, { email, password });
  localStorage.setItem(tokenKey, response.headers["x-auth-token"]);
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
