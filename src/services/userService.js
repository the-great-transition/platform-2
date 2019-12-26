import http from "./httpService";
import { toast } from "react-toastify";
import { http as lang_http } from "../language/fr";

const apiURL = process.env.REACT_APP_API_URL + "user";
const tokenKey = "token";

http.setJWT(getJWT());

export async function getUsers() {
  try {
    const response = await http.get(apiURL);
    return response["data"];
  } catch (ex) {
    console.log(ex);
    return null;
  }
}

export async function postUser(data) {
  let URL = apiURL;
  if (data["id"]) {
    URL += "/" + data["id"];
  }
  try {
    const response = await http.post(URL, data);
    toast.success(lang_http.post_success);
    return response["data"];
  } catch (ex) {
    console.log(ex);
    toast.error(lang_http.post_fail);
    return null;
  }
}

export async function postPassword(data) {
  let URL = apiURL;
  if (data["id"]) {
    URL += "/" + data["id"] + "/password";
  } else {
    return null;
  }
  try {
    const response = await http.post(URL, data);
    toast.success(lang_http.post_success);
    return response["data"];
  } catch (ex) {
    console.log(ex);
    toast.error(lang_http.post_fail);
    return null;
  }
}

export function getJWT() {
  return localStorage.getItem(tokenKey);
}

export default {
  getUsers,
  postUser
};
