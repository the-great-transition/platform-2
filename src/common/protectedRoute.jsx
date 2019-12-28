import React from "react";
import { Route, Redirect } from "react-router";
import auth from "../services/authService";

const ProtectedRoute = ({ component: Component, user, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (!auth.getUser()) return <Redirect to="/login" />;
        return Component ? <Component user={user} {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
