import http from "./httpService";
import { toast } from "react-toastify";
import { css } from "glamor";
import { http as lang_http } from "../language/fr";

const apiURL = process.env.REACT_APP_API_URL;
const tokenKey = "token";

http.setJWT(getJWT());

export async function getResource(type, id) {
  let URL = id ? apiURL + type + "/" + id : apiURL + type;
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
  if (
    data["id"] ||
    (type === "associate" && (data["type"] === "part" || data["id"] === 0))
  )
    URL += "/" + data["id"];
  URL += type === "password" ? "/password" : "";
  data.type = data.type ? data.type : "";
  try {
    const response = await http.post(URL, data);
    toast(lang_http.post_success, {
      className: css({
        color: "#FFFFFF",
        background: "#A54224 !important"
      }),
      progressClassName: css({
        background: "#FFFFFF"
      })
    });
    return response["data"];
  } catch (ex) {
    console.log(ex);
    toast(lang_http.post_fail, {
      className: css({
        color: "#FFFFFF",
        background: "#550C18 !important"
      })
    });
    return null;
  }
}

export async function deleteResource(type, id) {
  const URL = id ? apiURL + type + "/" + id : apiURL + type;
  try {
    const response = await http.delete(URL);
    toast(lang_http.delete_success, {
      className: css({
        color: "#FFFFFF",
        background: "#A54224 !important"
      })
    });
    return response["data"];
  } catch (ex) {
    console.log(ex);
    toast(lang_http.delete_fail, {
      className: css({
        color: "#FFFFFF",
        background: "#550C18 !important"
      })
    });
    return null;
  }
}

export async function updateStatus(type, data) {
  let URL = apiURL + type;
  if (data["id"]) {
    URL += "/" + data["id"];
  } else {
    toast(lang_http.post_fail, {
      className: css({
        color: "#FFFFFF",
        background: "#550C18 !important"
      })
    });
    return null;
  }
  try {
    data.type = "status";
    const response = await http.post(URL, data);
    toast(lang_http.post_success, {
      className: css({
        color: "#FFFFFF",
        background: "#A54224 !important"
      })
    });
    return response["data"];
  } catch (ex) {
    console.log(ex);
    toast(lang_http.post_fail, {
      className: css({
        color: "#FFFFFF",
        background: "#550C18 !important"
      })
    });
    return null;
  }
}

export function getJWT() {
  return localStorage.getItem(tokenKey);
}
