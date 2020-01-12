import http from "./httpService";
import { toast } from "react-toastify";
import { css } from "glamor";
import { email as lang_email } from "../language/fr";

const apiURL = process.env.REACT_APP_MAIL_URL;
const tokenKey = "token";

http.setJWT(getJWT());

function toBody(name, body) {
  let fullbody = "<html><body>";
  if (name) fullbody += "<html><body><p>" + name + ",</p>";
  fullbody += "<p>" + body + "</p>";
  fullbody += "<p>" + lang_email.automatic + "</p></body></html>";
  return fullbody;
}

export async function forgotPassword(name, email) {
  const API = apiURL + "forgot";
  const data = {
    from_name: lang_email.from,
    reply_to: process.env.REACT_APP_MAIL_REPLY_TO,
    reply_to_name: process.env.REACT_APP_MAIL_REPLY_TO_NAME,
    to: email,
    subject: lang_email.forgotPasswordSubject,
    message: toBody(name, lang_email.forgotPasswordBody)
  };
  try {
    await http.post(API, data);
    toast(lang_email.forgotPasswordSent, {
      className: css({
        color: "#FFFFFF",
        background: "#A54224 !important"
      }),
      progressClassName: css({
        background: "#FFFFFF"
      })
    });
  } catch (ex) {
    console.log(ex);
    toast(lang_email.forgotPasswordFail, {
      className: css({
        color: "#FFFFFF",
        background: "#550C18 !important"
      }),
      progressClassName: css({
        background: "#FFFFFF"
      })
    });
  }
}

export function getJWT() {
  return localStorage.getItem(tokenKey);
}
