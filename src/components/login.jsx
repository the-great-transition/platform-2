import React, { Component } from "react";
import Input from "../common/input";
import { login } from "../services/authService";
import { login as lang_login } from "../language/fr";

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
      <form onSubmit={this.submit}>
        <h2>Connexion</h2>
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
        <button className="btn btn-submit btn-primary">Soumettre</button>
      </form>
    );
  }
}

export default Login;
