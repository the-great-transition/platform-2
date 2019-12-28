import React, { Component } from "react";
import { Link } from "react-router-dom";
import { nav as lang_nav } from "../language/fr";

class Nav extends Component {
  state = {};
  render() {
    return (
      <nav
        className="navbar navbar-expand-md bg-dark navbar-dark"
        style={{ marginBottom: 10 }}
      >
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <span className="navbar-text">
            {lang_nav.welcome}, {this.props.user.name} |{" "}
          </span>
          <ul className="navbar-nav">
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
        </div>{" "}
      </nav>
    );
  }
}

export default Nav;
