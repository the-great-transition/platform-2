import React from "react";
import { Route, Switch } from "react-router-dom";
import AdminMenu from "./admin-menu";
import Config from "./config";
import Users from "./users";

const Admin = () => {
  return (
    <div className="row">
      <div className="col-3">
        <AdminMenu />
      </div>
      <div className="col">
        <Switch>
          <Route path="/admin/users" component={Users} />
          <Route path="/admin" component={Config} />
        </Switch>
      </div>
    </div>
  );
};

export default Admin;
