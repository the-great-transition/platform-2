import React, { Component } from "react";
import { Switch } from "react-router-dom";
import ProtectedRoute from "../common/protectedRoute";
import ModifyMenu from "./modifyMenu";
import ModifySubm from "./modifySubm";
import ModifyPart from "./modifyPart";

class Modify extends Component {
  state = {};
  render() {
    return (
      <div className="row">
        <div className="col-md-3">
          <ModifyMenu />
        </div>
        <div className="col-md-6">
          <Switch>
            <ProtectedRoute
              path="/modify/submissions"
              component={ModifySubm}
              user={this.props.user}
            />
            <ProtectedRoute
              path="/modify/panelists"
              component={ModifyPart}
              user={this.props.user}
            />
            <ProtectedRoute
              path="/modify"
              component={ModifySubm}
              user={this.props.user}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Modify;
