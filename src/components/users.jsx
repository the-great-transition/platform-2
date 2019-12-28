import React, { Component } from "react";
import Select from "react-select";
import Joi from "joi-browser";
import User from "./user";
import { getResource, postResource } from "../services/resourceService";
import { admin as lang_admin, trslError } from "../language/fr";

var _ = require("lodash");

class Users extends Component {
  state = {
    users: {},
    user: null,
    userSelected: null,
    header: lang_admin.users.select,
    errors: {},
    emptyUser: {
      email: "",
      id: 0,
      name: "",
      role: {
        label: lang_admin.roles[5].label,
        value: lang_admin.roles[5].value
      }
    }
  };

  componentDidMount() {
    this.populate();
  }

  async populate() {
    const users = await getResource("user");
    this.setState({ users, errors: {} });
  }

  schema = {
    name: Joi.string()
      .required()
      .min(2),
    email: Joi.string()
      .required()
      .email(),
    id: Joi.number(),
    role: Joi.object().unknown()
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.user, this.schema, options);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = trslError(item);
    return errors;
  };

  handleSubmit = async () => {
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    const { user } = this.state;
    const response = await postResource("user", user);
    if (response) {
      const userSelected = {
        label: user.name,
        value: response.id,
        data: user
      };
      user.id = response.id;
      this.setState({ userSelected, user });
    }
    this.populate();
  };

  handleReset = () => {
    const user = { ...this.state.userSelected.data };
    this.setState({ user });
  };

  handleCancel = () => {
    this.setState({
      userSelected: null,
      user: null,
      header: lang_admin.users.select
    });
  };

  handleChange = e => {
    const { name, value } = e.currentTarget;
    const user = { ...this.state.user };
    user[name] = value;
    this.setState({ user });
  };

  handleChangeRole = e => {
    const user = { ...this.state.user };
    user["role"] = e;
    this.setState({ user });
  };

  handleSelected = e => {
    if (e !== null) {
      this.setState({ userSelected: e });
      if (e.value !== 0) {
        const user = e.data;
        this.setState({ user, header: e.data.name });
      } else {
        const user = this.state.emptyUser;
        this.setState({ user, header: e.name });
      }
    } else {
      this.setState({ userSelected: null, header: lang_admin.users.select });
      this.setState({ user: null });
    }
  };

  render() {
    const { users, errors } = this.state;
    let options = [];
    if (users && users.length >= 0) {
      const options_unsorted = users.map(u => {
        const user = {
          label: u.user_name,
          value: u.user_id,
          data: {
            id: u.user_id,
            name: u.user_name,
            email: u.user_email,
            role: lang_admin.roles[u.user_role]
          }
        };
        return user;
      });
      options = _.orderBy(options_unsorted, "label", "asc");
      const create = {
        label: lang_admin.users.new,
        value: 0,
        name: lang_admin.users.create
      };
      options = _.concat(create, options);
    }
    return (
      <React.Fragment>
        <h3>{this.state.header}</h3>
        <div className="row">
          <div className="col">
            <Select
              options={options}
              value={this.state.userSelected}
              onChange={this.handleSelected}
              isClearable="true"
            ></Select>
          </div>
        </div>
        <div className="row">
          <div className="col">
            {!this.state.userSelected ? (
              ""
            ) : (
              <User
                user={this.state.user}
                errors={errors}
                onChange={this.handleChange}
                onChangeRole={this.handleChangeRole}
                onSubmit={this.handleSubmit}
                onReset={this.handleReset}
                onCancel={this.handleCancel}
              />
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Users;
