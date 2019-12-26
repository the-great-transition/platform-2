import React, { Component } from "react";
import { Link } from "react-router-dom";
import { admin as lang_admin } from "../language/fr";

class AdminMenu extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Link className="btn btn-block btn-dark" to="/admin">
          {lang_admin.menu_config}
        </Link>
        <Link className="btn btn-block btn-dark" to="/admin/users">
          {lang_admin.menu_users}
        </Link>
      </React.Fragment>
    );
  }
}

export default AdminMenu;
