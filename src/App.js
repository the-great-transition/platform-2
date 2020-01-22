import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./common/protectedRoute";
import Login from "./components/login";
import Nav from "./components/nav";
import Dashboard from "./components/dashboard";
import Submissions from "./components/submissions";
import SubmissionViewer from "./components/submissionViewer";
import SubmissionCreate from "./components/submissionCreate";
import Panelists from "./components/panelists";
import PanelistViewer from "./components/panelistViewer.jsx";
import PanelistCreate from "./components/panelistCreate";
import Associate from "./components/associate";
import Modify from "./components/modify";
import Exports from "./components/exports";
import Admin from "./components/admin";
import Confirm from "./components/confirm";
import Logout from "./components/logout";
import Erratum from "./components/erratum";
import auth from "./services/authService";

class App extends Component {
  state = {
    user: {}
  };

  componentDidMount() {
    try {
      const token = localStorage.getItem("token");
      const user = jwtDecode(token);
      this.setState({ user });
    } catch (ex) {
      console.log(ex);
    }
  }

  render() {
    return (
      <div className="App container-fluid" style={{ height: "100vh" }}>
        <main>
          <ToastContainer autoClose={3000} position="top-center" />
          {auth.getUser() ? (
            <div className="bg-white" style={{ height: "100vh" }}>
              <Nav user={this.state.user} />
              <Switch>
                <ProtectedRoute
                  user={this.state.user}
                  path="/dashboard"
                  component={Dashboard}
                />
                <ProtectedRoute
                  user={this.state.user}
                  path="/submissions/new"
                  component={SubmissionCreate}
                />
                <ProtectedRoute
                  user={this.state.user}
                  path="/submissions/:id"
                  component={SubmissionViewer}
                />
                <ProtectedRoute
                  user={this.state.user}
                  path="/submissions"
                  component={Submissions}
                />
                <ProtectedRoute
                  user={this.state.user}
                  path="/panelists/new"
                  component={PanelistCreate}
                />
                <ProtectedRoute
                  user={this.state.user}
                  path="/panelists/:id"
                  component={PanelistViewer}
                />
                <ProtectedRoute
                  user={this.state.user}
                  path="/panelists"
                  component={Panelists}
                />
                <ProtectedRoute
                  user={this.state.user}
                  path="/associate"
                  component={Associate}
                />
                <ProtectedRoute
                  user={this.state.user}
                  path="/modify/submissions/:id"
                  component={Modify}
                />
                <ProtectedRoute
                  user={this.state.user}
                  path="/modify"
                  component={Modify}
                />
                <ProtectedRoute
                  user={this.state.user}
                  path="/exports"
                  component={Exports}
                />
                <ProtectedRoute
                  user={this.state.user}
                  path="/admin"
                  component={Admin}
                />
                <ProtectedRoute path="/logout" component={Logout} />
                <ProtectedRoute path="/erratum" component={Erratum} />
                <ProtectedRoute path="/" exact component={Submissions} />
                <Redirect to="/erratum" />
              </Switch>
            </div>
          ) : (
            <Switch>
              <Route path="/confirmation/:id" component={Confirm} />
              <Route
                path="/login"
                render={props => {
                  if (auth.getUser()) return <Redirect to="/" />;
                  return <Login {...props} />;
                }}
              />
              <Redirect to="/login" />
            </Switch>
          )}
        </main>
      </div>
    );
  }
}

export default App;
