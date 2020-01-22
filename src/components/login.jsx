import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "../common/input";
import { login } from "../services/authService";
import { forgotPassword } from "../services/emailService";
import { login as lang_login, trslError } from "../language/fr";
import header from "../media/site-header-v1-fr.jpg";

class Login extends Component {
  state = {
    account: {
      email: "",
      password: ""
    },
    forgot: {
      forgotemail: ""
    },
    errors: {},
    forgotErrors: {},
    showforgot: false
  };

  loginSchema = {
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .required()
      .min(6)
  };

  forgotSchema = {
    forgotemail: Joi.string()
      .required()
      .email()
  };

  validate = (array, schema) => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(array, schema, options);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = trslError(item);
    return errors;
  };

  handleChange = ({ currentTarget: input }) => {
    if (input.name === "forgotemail") {
      const forgot = { forgotemail: input.value };
      this.setState({ forgot });
    } else {
      const account = { ...this.state.account };
      account[input.name] = input.value;
      this.setState({ account });
    }
  };

  handleShow = () => {
    const showforgot = true;
    this.setState({ showforgot });
  };

  submit = async e => {
    e.preventDefault();
    const errors = this.validate(this.state.account, this.loginSchema);
    this.setState({ errors: errors || {} });
    if (errors) return;
    const { account } = this.state;
    if (await login(account.email, account.password)) {
      window.location = "/";
    }
  };

  forgotPassword = async e => {
    e.preventDefault();
    const forgotErrors = this.validate(this.state.forgot, this.forgotSchema);
    this.setState({ forgotErrors: forgotErrors || {} });
    if (forgotErrors) return;
    const { forgotemail } = this.state.forgot;
    try {
      await forgotPassword("#/FROM_NAME/#", forgotemail);
    } catch (ex) {
      console.log(ex);
    }
  };

  render() {
    const { email, password, errors, forgotErrors } = this.state;
    return (
      <div className="container border pt-5 px-0 bg-white">
        <div className="row pb-5">
          <div className="col-2"></div>
          <div className="col-8">
            <img
              src={header}
              width="578"
              style={{ display: "block", margin: "auto" }}
              alt={lang_login.imagealt}
            />
            <h2>{lang_login.login}</h2>
            <form onSubmit={this.submit} className="pb-3">
              <Input
                type="text"
                name="email"
                value={email}
                label={lang_login.email}
                onChange={this.handleChange}
                error={errors.email}
              />
              <Input
                type="password"
                name="password"
                value={password}
                label={lang_login.password}
                onChange={this.handleChange}
                error={errors.password}
              />
              <button className="btn btn-submit btn-primary">
                {lang_login.submit}
              </button>
            </form>
            <button
              className="btn btn-secondary mb-3"
              onClick={this.handleShow}
            >
              {lang_login.forgot}
            </button>
            {this.state.showforgot ? (
              <form onSubmit={this.forgotPassword}>
                <Input
                  type="text"
                  name="forgotemail"
                  value={this.state.forgot.forgotemail}
                  label={lang_login.sendpassword}
                  onChange={this.handleChange}
                  error={forgotErrors.forgotemail}
                />
                <button className="btn btn-submit btn-warning">
                  {lang_login.submit}
                </button>
              </form>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="row m-0 p-0">
          <div className="col m-0 p-0 text-center">
            &copy; {new Date().getFullYear() + " " + lang_login.collective}
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
