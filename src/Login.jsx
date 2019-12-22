import React, { Component } from "react";
import { Link } from "react-router-dom";

class Login extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <h2>Connexion : </h2>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label for="email">Courriel : </label>
              <input type="text" style={{ margin: 2 }} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label for="password">Mot de passe : </label>
              <input type="password" style={{ margin: 2 }} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Link>
              <button className="btn btn-primary">Soumettre</button>
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
