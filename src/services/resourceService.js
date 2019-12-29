import http from "./httpService";
import { toast } from "react-toastify";
import { http as lang_http } from "../language/fr";

const apiURL = process.env.REACT_APP_API_URL;
const tokenKey = "token";

http.setJWT(getJWT());

export async function getResource(type, id) {
  const URL = id ? apiURL + type + "/" + id : apiURL + type;
  try {
    const response = await http.get(URL);
    return response["data"];
  } catch (ex) {
    console.log(ex);
    return null;
  }
}

export async function postResource(type, data) {
  let URL = type === "password" ? apiURL + "user" : apiURL + type;
  if (data["id"]) {
    URL += "/" + data["id"];
  }
  URL += type === "password" ? "/password" : "";
  data.type = data.type ? data.type : "";
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

export async function deleteResource(type, id) {
  const URL = id ? apiURL + type + "/" + id : apiURL + type;
  try {
    const response = await http.delete(URL);
    toast.success(lang_http.delete_success);
    return response["data"];
  } catch (ex) {
    console.log(ex);
    toast.error(lang_http.delete_fail);
    return null;
  }
}

export async function updateStatus(type, data) {
  let URL = apiURL + type;
  if (data["id"]) {
    URL += "/" + data["id"];
  } else {
    toast.error(lang_http.post_fail);
    return null;
  }
  try {
    data.type = "status";
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
