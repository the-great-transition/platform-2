import React, { Component } from "react";
import { Link } from "react-router-dom";
import { fr_nav as lang_nav } from "./language/fr";

class Nav extends Component {
  state = {};
  render() {
    return (
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <span className="navbar-text">
          {lang_nav.welcome.label}, {this.props.name} |{" "}
        </span>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to={`/${lang_nav.dashboard.comp}`}>
              {lang_nav.dashboard.label}
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={`/${lang_nav.submissions.comp}`}>
              {lang_nav.submissions.label}
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <span
            className="navbar-text clickable"
            onClick={console.log("disconnect")}
          >
            {lang_nav.disconnect.label}
          </span>
        </ul>
      </nav>
    );
  }
}

export default Nav;
