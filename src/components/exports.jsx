import React, { Component } from "react";
import { Switch } from "react-router-dom";
import ProtectedRoute from "../common/protectedRoute";
import ExportMenu from "./exportsMenu";
import ExportComments from "./exportsComments";
import ExportsAnswers from "./exportsAnswers";
import ExportEmails from "./exportsEmails";

class Exports extends Component {
  state = {};
  render() {
    return (
      <div className="row">
        <div className="col-md-3">
          <ExportMenu user={this.props.user} />
        </div>
        <div className="col-md-6">
          <Switch>
            <ProtectedRoute
              path="/exports/comments"
              component={ExportComments}
            />
            <ProtectedRoute
              path="/exports/answers"
              component={ExportsAnswers}
            />
            {parseInt(this.props.user.role) === 0 ? (
              <ProtectedRoute path="/exports/emails" component={ExportEmails} />
            ) : (
              ""
            )}
            <ProtectedRoute path="/exports" component={ExportComments} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Exports;
