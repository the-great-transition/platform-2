import { decode } from "he";

export const toHTML = string => {
  if (string) {
    var div = document.createElement("div");
    div.innerHTML = string.trim();
    return decode(div.innerHTML);
  } else {
    return "";
  }
};

export const shorten = (string, max) => {
  let output = "";
  if (string.length > max) {
    output = string.substr(0, max);
    if (output.lastIndexOf(" ") > -1) {
      output = string.substr(0, output.lastIndexOf(" ") + 1);
    }
    output += " (...)";
  } else {
    output = string;
  }
  return output;
};
