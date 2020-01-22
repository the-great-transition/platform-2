import React, { Component } from "react";
import { login as lang_login } from "../language/fr";
import header from "../media/site-header-v1-fr.jpg";

class Confirm extends Component {
  state = {};
  render() {
    return (
      <div className="container border pt-5 px-0 bg-white">
        <div className="row pb-5">
          <div className="col-2"></div>
          <div className="col-8">
            <img
              src={header}
              width="578"
              style={{ display: "block", margin: "auto" }}
              alt={lang_login.imagealt}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Confirm;
