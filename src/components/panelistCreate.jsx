import React, { Component } from "react";
import { Helmet } from "react-helmet";
import Joi from "joi-browser";
import Select from "react-select";
import Input from "../common/input";
import TextArea from "./../common/textarea";
import { getResource, postResource } from "./../services/resourceService";
import { panelistCreate as lang_panelists, trslError } from "./../language/fr";

var _ = require("lodash");

class PanelistCreate extends Component {
  state = {
    data: {
      fname: "",
      lname: "",
      pronouns: "",
      email: "",
      photo: "",
      affiliation: "",
      bio: "",
      city: "",
      country: "",
      gender: "",
      minority: "",
      user: null
    },
    dataReset: {
      fname: "",
      lname: "",
      pronouns: "",
      email: "",
      photo: "",
      affiliation: "",
      bio: "",
      city: "",
      country: "",
      gender: "",
      minority: "",
      user: null
    },
    errors: {},
    users: {}
  };

  componentDidMount() {
    this.populate();
  }

  async populate() {
    const users = await getResource("user");
    this.setState({ users, errors: {} }, () => {
      const { data } = this.state;
      const user = this.state.users.find(e => e.user_id === this.props.user.id)
        ? this.state.users.find(e => e.user_id === this.props.user.id)
        : null;
      data.user = user ? { label: user.user_name, value: user.user_id } : null;
      this.setState({ data });
    });
  }

  schema = {
    fname: Joi.string().required(),
    lname: Joi.string().required(),
    pronouns: Joi.string().allow(""),
    email: Joi.string()
      .required()
      .email(),
    photo: Joi.string().allow(""),
    affiliation: Joi.string().allow(""),
    bio: Joi.string().allow(""),
    city: Joi.string().allow(""),
    country: Joi.string().allow(""),
    gender: Joi.string().allow(""),
    minority: Joi.string().allow(""),
    user: Joi.object()
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = trslError(item);
    return errors;
  };

  handleSubmit = async () => {
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    const { data } = this.state;
    try {
      await postResource("part", data);
      const { dataReset } = this.state;
      this.setState({ data: dataReset, errors: {} });
    } catch (ex) {
      console.log(ex);
    }
  };

  handleChange = e => {
    const { name, value } = e.currentTarget;
    const data = { ...this.state.data };
    data[name] = value;
    this.setState({ data });
  };

  handleSelected = e => {
    const { data } = this.state;
    if (e !== null) {
      data.user = e;
    } else {
      data.user = null;
    }
    this.setState({ data });
  };

  handleReset = e => {
    const { dataReset } = this.state;
    this.setState({ data: dataReset });
  };

  handleCancel = e => {
    this.props.history.goBack();
  };

  render() {
    const { data, errors, users } = this.state;
    let options = [];
    if (users && users.length >= 0) {
      const options_unsorted = users.map(u => {
        const user = {
          label: u.user_name + " " + u.user_email,
          value: u.user_id
        };
        return user;
      });
      options = _.orderBy(options_unsorted, "label", "asc");
      options = _.concat(options);
    }
    return (
      <div className="container">
        <Helmet>
          <title>{lang_panelists.createTitle}</title>
        </Helmet>
        <div className="row">
          <div className="col">
            <h3>{lang_panelists.createTitle}</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <Input
              type="text"
              name="fname"
              value={data.fname}
              label={lang_panelists.fname}
              error={errors.fname}
              onChange={this.handleChange}
            />
          </div>
          <div className="col-4">
            <Input
              type="text"
              name="lname"
              value={data.lname}
              label={lang_panelists.lname}
              error={errors.lname}
              onChange={this.handleChange}
            />
          </div>
          <div className="col-4">
            <Input
              type="text"
              name="pronouns"
              value={data.pronouns}
              label={lang_panelists.pronouns}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <Input
              type="text"
              name="email"
              value={data.email}
              label={lang_panelists.email}
              error={errors.email}
              onChange={this.handleChange}
            />
          </div>
          <div className="col-6">
            <Input
              type="text"
              name="gender"
              value={data.gender}
              label={lang_panelists.gender}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <Input
              type="text"
              name="city"
              value={data.city}
              label={lang_panelists.city}
              onChange={this.handleChange}
            />
          </div>
          <div className="col-6">
            <Input
              type="text"
              name="country"
              value={data.country}
              label={lang_panelists.country}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Input
              type="text"
              name="minority"
              value={data.minority}
              label={lang_panelists.minority}
              onChange={this.handleChange}
            />
            <Input
              type="text"
              name="affiliation"
              value={data.affiliation}
              label={lang_panelists.affiliation}
              onChange={this.handleChange}
            />
            <TextArea
              type="text"
              name="bio"
              rows="4"
              value={data.bio}
              label={lang_panelists.bio}
              onChange={this.handleChange}
            />
            <div className="form-group">
              <label htmlFor="user">{lang_panelists.user}</label>
              <Select
                name="user"
                options={options}
                value={data.user}
                onChange={this.handleSelected}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <button
              className="btn btn-block btn-success"
              onClick={this.handleSubmit}
            >
              {lang_panelists.submit}
            </button>
          </div>
          <div className="col-4">
            <button
              className="btn btn-block btn-warning"
              onClick={this.handleReset}
            >
              {lang_panelists.reset}
            </button>
          </div>
          <div className="col-4">
            <button
              className="btn btn-block btn-secondary"
              onClick={this.handleCancel}
            >
              {lang_panelists.cancel}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default PanelistCreate;
