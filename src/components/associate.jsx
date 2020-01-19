import React from "react";
import { Switch } from "react-router-dom";
import ProtectedRoute from "../common/protectedRoute";
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
          <ProtectedRoute
            path="/associate/panelists"
            component={AssociatePart}
          />
          <ProtectedRoute path="/associate" component={AssociateComm} />
        </Switch>
      </div>
    </div>
  );
};

export default Associate;
