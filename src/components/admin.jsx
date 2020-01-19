import React from "react";
import { Switch } from "react-router-dom";
import ProtectedRoute from "../common/protectedRoute";
import AdminMenu from "./adminMenu";
import Config from "./config";
import Users from "./users";

const Admin = () => {
  return (
    <div className="row">
      <div className="col-md-3">
        <AdminMenu />
      </div>
      <div className="col-md-6">
        <Switch>
          <ProtectedRoute path="/admin/users" component={Users} />
          <ProtectedRoute path="/admin" component={Config} />
        </Switch>
      </div>
    </div>
  );
};

export default Admin;
