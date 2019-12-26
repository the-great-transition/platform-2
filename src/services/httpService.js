import axios from "axios";
import { http as lang_http } from "../language/fr";

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response && error.response.status >= 400 && error.response.status;
  if (!expectedError) {
    console.log("err : ", error);
    alert(lang_http.unexpected);
  } else if (error.response.status === 401) {
    localStorage.removeItem("token");
    window.location = "/";
  } else if (error.response.status === 403) {
    alert(lang_http.unauthorized);
  }
  return Promise.reject(error);
});

function setJWT(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJWT
};
