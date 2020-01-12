import React from "react";
import { Route, Switch } from "react-router-dom";
import ExportMenu from "./exportsMenu";
import ExportComments from "./exportsComments";

const Exports = () => {
  return (
    <div className="row">
      <div className="col-md-3">
        <ExportMenu />
      </div>
      <div className="col-md-6">
        <Switch>
          <Route path="/exports/comments" component={ExportComments} />
          <Route path="/exports" component={ExportComments} />
        </Switch>
      </div>
    </div>
  );
};

export default Exports;
