import React from "react";
import { Route, Switch } from "react-router-dom";
import AssociateMenu from "./associateMenu";
import AssociateComm from "./associateComm";
import AssociatePart from "./associatePart";

const Associate = () => {
  return (
    <div className="row">
      <div className="col-md-3">
        <AssociateMenu />
      </div>
      <div className="col-md-6">
        <Switch>
          <Route path="/associate/panelists" component={AssociatePart} />
          <Route path="/associate" component={AssociateComm} />
        </Switch>
      </div>
    </div>
  );
};

export default Associate;
