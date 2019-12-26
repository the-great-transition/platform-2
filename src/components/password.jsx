import React, { Component } from "react";
import Input from "../common/input";
import { admin as lang_password } from "../language/fr";

class Password extends Component {
  render() {
    const { data, email, errors } = this.props;
    return (
      <div style={{ marginTop: 10 }}>
        <Input
          type="password"
          name="password"
          value={data.password}
          label={lang_password.user.password}
          error={errors.password}
          onChange={this.props.onChangePW}
        />
        <div className="form-check-inline">
          <label className="form-check-label" htmlFor="password_email">
            <input
              type="checkbox"
              className="form-check-input"
              name="password_email"
              value={data.password_email}
              label={lang_password.user.password_email}
              error={errors.password_email}
              onChange={this.props.onChangePW_Email}
            />
          </label>
          {lang_password.user.password_email}
          {email}
        </div>
        <button className="btn btn-primary" onClick={this.props.onSubmitPW}>
          {lang_password.user.submit}
        </button>
      </div>
    );
  }
}

export default Password;
