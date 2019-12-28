import http from "./httpService";
import { toast } from "react-toastify";
import { http as lang_http } from "../language/fr";

const apiURL = process.env.REACT_APP_API_URL + "subm";
const tokenKey = "token";

http.setJWT(getJWT());

export function getJWT() {
  return localStorage.getItem(tokenKey);
}
