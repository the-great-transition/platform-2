import React, { Component } from "react";
import Helmet from "react-helmet";
import Joi from "joi-browser";
import SelectInput from "../common/selectInput";
import Input from "../common/input";
import TextArea from "../common/textarea";
import { getResource, postResource } from "../services/resourceService";
import { toHTML } from "../utilities/string";
import {
  modify as lang_modify,
  panelistCreate as lang_panelists,
  trslError
} from "../language/fr";

var _ = require("lodash");

class ModifyPart extends Component {
  state = {
    panelists: {},
    selectedPart: null,
    incomingPart: null,
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
      user: null,
      id: {}
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
      user: null,
      id: {}
    },
    users: {},
    errors: {}
  };

  componentDidMount() {
    const splitPath = this.props.location.pathname.split("/");
    if (splitPath[3]) {
      const splitSlug = splitPath[3].split("-");
      if (splitSlug[0]) {
        const incomingPart = splitSlug[0];
        this.setState({ incomingPart });
      }
    }
    this.populate();
  }

  async populate() {
    const panelists = await getResource("part");
    this.setState({ panelists });
    const users = await getResource("user");
    this.setState({ users, errors: {} });
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
    user: Joi.object(),
    id: Joi.string()
  };

  handleChange = e => {
    const { name, value } = e.currentTarget;
    const data = { ...this.state.data };
    data[name] = value;
    this.setState({ data });
  };

  handleSelectChange = e => {
    const { data } = this.state;
    const nam = e.name;
    const val = e;
    data[nam] = val;
    this.setState({ data });
  };

  handleSelectedPart = e => {
    if (e === null) {
      this.props.history.push({ pathname: "/modify/panelists" });
      this.setState({ selectedPart: null, data: this.state.dataReset });
    } else {
      const { data } = e;
      this.props.history.push({
        pathname: "/modify/panelists/" + data.part_id + "-" + data.part_slug
      });
      this.setState({ selectedPart: e }, () => {
        this.getPartData(e.data);
      });
    }
  };

  async getPartData(e) {
    const { value: id } = this.state.selectedPart;
    const part = await getResource("part", id);
    if (part) {
      let data = {
        id: id,
        fname: part.part_fname,
        lname: part.part_lname,
        pronouns: part.part_pronouns,
        email: part.part_email,
        photo: part.part_photo,
        affiliation: part.part_affiliation,
        bio: part.part_bio,
        city: part.part_city,
        country: part.part_country,
        gender: part.part_gender,
        minority: part.part_minority
      };
      const user = this.state.users.find(e => e.user_id === part.user_id)
        ? this.state.users.find(e => e.user_id === part.user_id)
        : null;
      data.user = user ? { label: user.user_name, value: user.user_id } : null;
      this.setState({ data });
    } else {
      this.setState({ data: null });
    }
  }

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    console.log(error);
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
    data.id = this.state.selectedPart.value;
    try {
      await postResource("part", data);
    } catch (ex) {
      console.log(ex);
    }
  };

  handleReset = () => {
    this.setState({ errors: {} });
    this.getPartData();
  };

  handleCancel = e => {
    if (this.state.incomingPart) {
      this.props.history.goBack();
    } else {
      this.props.history.push({ pathname: "/modify/panelists" });
      this.setState({ selectedPart: false, data: this.state.dataReset });
    }
  };

  render() {
    const {
      panelists,
      incomingPart,
      selectedPart,
      data,
      users,
      errors
    } = this.state;
    let partData = [];
    if (panelists.length >= 0 && users.length >= 0) {
      const panelists_unsorted = panelists.map(s => {
        const part = {
          label:
            "#" + s.part_id + " " + toHTML(s.part_fname + " " + s.part_lname),
          title: toHTML(s.part_fname + " " + s.part_lname),
          value: s.part_id,
          data: s
        };
        if (incomingPart && !selectedPart && s.part_id === incomingPart) {
          this.setState({ selectedPart: part }, () => {
            this.getPartData(s);
          });
        }
        return part;
      });
      partData = _.orderBy(panelists_unsorted, "title", "asc");
    }
    let options = [];
    if (users && users.length >= 0) {
      const options_unsorted = users.map(u => {
        const user = {
          name: "user",
          label: u.user_name + " " + u.user_email,
          value: u.user_id
        };
        return user;
      });
      options = _.orderBy(options_unsorted, "label", "asc");
      options = _.concat(options);
    }
    return (
      <div>
        <Helmet>
          <title>{lang_modify.panelists_title}</title>
        </Helmet>
        <h2>{lang_modify.panelists_header}</h2>
        {selectedPart ? (
          <React.Fragment>
            <div className="row">
              <div className="col">
                {incomingPart ? (
                  ""
                ) : (
                  <SelectInput
                    name="part"
                    label={lang_modify.panelists_select}
                    options={partData}
                    value={selectedPart}
                    onChange={this.handleSelectedPart}
                    isClearable="true"
                  />
                )}
              </div>
            </div>
            <div className="row mb-3">
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
                  {incomingPart ? lang_modify.return : lang_panelists.cancel}
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <Input
                  type="text"
                  name="fname"
                  value={toHTML(data.fname)}
                  label={lang_panelists.fname}
                  error={errors.fname}
                  onChange={this.handleChange}
                />
              </div>
              <div className="col-4">
                <Input
                  type="text"
                  name="lname"
                  value={toHTML(data.lname)}
                  label={lang_panelists.lname}
                  error={errors.lname}
                  onChange={this.handleChange}
                />
              </div>
              <div className="col-4">
                <Input
                  type="text"
                  name="pronouns"
                  value={toHTML(data.pronouns)}
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
                  value={toHTML(data.email)}
                  label={lang_panelists.email}
                  error={errors.email}
                  onChange={this.handleChange}
                />
              </div>
              <div className="col-6">
                <Input
                  type="text"
                  name="gender"
                  value={toHTML(data.gender)}
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
                  value={toHTML(data.city)}
                  label={lang_panelists.city}
                  onChange={this.handleChange}
                />
              </div>
              <div className="col-6">
                <Input
                  type="text"
                  name="country"
                  value={toHTML(data.country)}
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
                  value={toHTML(data.minority)}
                  label={lang_panelists.minority}
                  onChange={this.handleChange}
                />
                <Input
                  type="text"
                  name="affiliation"
                  value={toHTML(data.affiliation)}
                  label={lang_panelists.affiliation}
                  onChange={this.handleChange}
                />
                <TextArea
                  type="text"
                  name="bio"
                  rows={6}
                  value={toHTML(data.bio)}
                  label={lang_panelists.bio}
                  onChange={this.handleChange}
                />
                <div className="form-group">
                  <SelectInput
                    name="user"
                    label={lang_panelists.user}
                    options={options}
                    value={data.user}
                    onChange={this.handleSelected}
                  />
                </div>
              </div>
            </div>
          </React.Fragment>
        ) : (
          <div className="row">
            <div className="col">
              <SelectInput
                name="panel"
                label={lang_modify.panelists_select}
                options={partData}
                value={selectedPart}
                onChange={this.handleSelectedPart}
                isClearable="true"
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ModifyPart;
