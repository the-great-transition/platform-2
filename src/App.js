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
import Logout from "./components/logout";
import Admin from "./components/admin";
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
      <div className="App container-fluid">
        <main>
          {auth.getUser() ? (
            <React.Fragment>
              <Nav user={this.state.user} />
              <ToastContainer autoClose={3000} position="top-center" />
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
                  path="/admin"
                  component={Admin}
                />
                <ProtectedRoute path="/logout" component={Logout} />
                <ProtectedRoute path="/erratum" component={Erratum} />
                <ProtectedRoute path="/" exact component={Submissions} />
                <Redirect to="/erratum" />
              </Switch>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Switch>
                <Route
                  path="/login"
                  render={props => {
                    if (auth.getUser()) return <Redirect to="/" />;
                    return <Login {...props} />;
                  }}
                />
                <Redirect to="/login" />
              </Switch>
            </React.Fragment>
          )}
        </main>
      </div>
    );
  }
}

export default App;
