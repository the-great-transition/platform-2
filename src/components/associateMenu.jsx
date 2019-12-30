import React, { Component } from "react";
import { Link } from "react-router-dom";
import { associate as lang_associate } from "../language/fr";

class AssociateMenu extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Link className="btn btn-block btn-dark" to="/associate">
          {lang_associate.menu_comms}
        </Link>
        <Link className="btn btn-block btn-dark" to="/associate/panelists">
          {lang_associate.menu_panelists}
        </Link>
      </React.Fragment>
    );
  }
}

export default AssociateMenu;
