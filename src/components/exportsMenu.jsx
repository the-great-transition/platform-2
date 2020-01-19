import React, { Component } from "react";
import { Link } from "react-router-dom";
import { exports as lang_exports } from "../language/fr";

class ExportsMenu extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Link className="btn btn-block btn-dark" to="/exports">
          {lang_exports.menu_comments}
        </Link>
        {parseInt(this.props.user.role) === 0 ? (
          <Link className="btn btn-block btn-dark" to="/exports/emails">
            {lang_exports.menu_emails}
          </Link>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}

export default ExportsMenu;
