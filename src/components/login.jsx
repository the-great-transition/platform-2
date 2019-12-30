import React, { Component } from "react";
import Input from "../common/input";
import { login } from "../services/authService";
import { login as lang_login } from "../language/fr";
import header from "../media/site-header-v1-fr.jpg";

class Login extends Component {
  state = {
    account: {
      email: "",
      password: ""
    }
  };

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };

  submit = async e => {
    e.preventDefault();
    const { account } = this.state;
    await login(account.email, account.password);
    window.location = "/";
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-2"></div>
          <div className="col-8">
            <img
              src={header}
              width="578"
              style={{ display: "block", margin: "auto" }}
            />
            <h2>{lang_login.login}</h2>
            <form onSubmit={this.submit}>
              <Input
                type="text"
                name="email"
                value={email}
                label={lang_login.email}
                onChange={this.handleChange}
              />
              <Input
                type="password"
                name="password"
                value={password}
                label={lang_login.password}
                onChange={this.handleChange}
              />
              <button className="btn btn-submit btn-primary">
                {lang_login.submit}
              </button>
            </form>
          </div>
        </div>{" "}
      </div>
    );
  }
}

export default Login;
