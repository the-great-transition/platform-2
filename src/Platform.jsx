import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Nav from "./Nav";
import Dashboard from "./Dashboard";
import Submissions from "./Submissions";
import { fr_nav as lang_nav } from "./language/fr";

class Platform extends Component {
  render() {
    return (
      <div>
        <Nav name={this.props.login.name} />
        <Switch>
          <Route path={`/${lang_nav.dashboard.comp}`} component={Dashboard} />
          <Route
            path={`/${lang_nav.submissions.comp}`}
            component={Submissions}
          />
          <Route path={"/"} component={Submissions} />
        </Switch>
      </div>
    );
  }
}

export default Platform;
