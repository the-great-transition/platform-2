import React, { Component } from "react";
import { Link } from "react-router-dom";
import { nav as lang_nav } from "../language/fr";

class Nav extends Component {
  state = {};
  render() {
    return (
      <nav
        className="navbar navbar-expand-sm bg-dark navbar-dark"
        style={{ marginBottom: 10 }}
      >
        <span className="navbar-text">
          {lang_nav.welcome}, {this.props.user.name} |{" "}
        </span>
        <ul className="navbar-nav">
          <Link className="nav-link" to="/dashboard">
            {lang_nav.dashboard}
          </Link>
          <Link className="nav-link" to="/submissions">
            {lang_nav.submissions}
          </Link>
        </ul>
        <ul className="navbar-nav ml-auto">
          <Link className="nav-link" to="/admin">
            {lang_nav.admin}
          </Link>
          <Link className="nav-link" to="/logout">
            {lang_nav.logout}
          </Link>
        </ul>
      </nav>
    );
  }
}

export default Nav;
