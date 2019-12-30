import React, { Component } from "react";
import Select from "react-select";
import Joi from "joi-browser";
import Input from "../common/input";
import Password from "./password";
import { postResource } from "../services/resourceService";
import { admin as lang_admin, trslError } from "../language/fr";

class User extends Component {
  state = {
    data: {
      password: "",
      password_email: false
    },
    errors: {}
  };

  schema = {
    password: Joi.string()
      .required()
      .min(6),
    password_email: Joi.boolean()
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = trslError(item);
    return errors;
  };

  handleChangePW = e => {
    const data = { ...this.state.data };
    data["password"] = e.currentTarget.value;
    this.setState({ data });
  };

  handleChangePW_Email = e => {
    const data = { ...this.state.data };
    data["password_email"] = e.currentTarget.checked;
    this.setState({ data });
  };

  handleSubmitPW = async () => {
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    const { data } = this.state;
    data["id"] = this.props.user.id;
    await postResource("password", data);
    this.setState({
      data: {
        password: "",
        password_email: false
      },
      errors: {}
    });
  };

  render() {
    const { user, errors } = this.props;
    const { data, errors: errorsPW } = this.state;
    return (
      <div style={{ marginTop: 10 }}>
        <Input
          type="text"
          name="name"
          value={user.name}
          label={lang_admin.user.name}
          error={errors.name}
          onChange={this.props.onChange}
        />
        <Input
          type="text"
          name="email"
          value={user.email}
          label={lang_admin.user.email}
          error={errors.email}
          onChange={this.props.onChange}
        />
        <div className="form-group">
          <label htmlFor="role">{lang_admin.user.role}</label>
          <Select
            id="role"
            name="role"
            value={user.role}
            options={lang_admin.roles}
            onChange={this.props.onChangeRole}
          />
        </div>
        <button
          className="btn btn-block btn-success"
          onClick={this.props.onSubmit}
        >
          {lang_admin.user.submit}
        </button>
        <button
          className="btn btn-block btn-warning"
          onClick={this.props.onReset}
        >
          {lang_admin.user.reset}
        </button>
        <button
          className="btn btn-block btn-secondary"
          onClick={this.props.onCancel}
        >
          {lang_admin.user.cancel}
        </button>
        {user.id !== 0 ? (
          <Password
            data={data}
            email={user.email}
            errors={errorsPW}
            onChangePW={this.handleChangePW}
            onChangePW_Email={this.handleChangePW_Email}
            onSubmitPW={this.handleSubmitPW}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default User;
