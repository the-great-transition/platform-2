import React, { Component } from "react";
import Helmet from "react-helmet";
import Joi from "joi-browser";
import SelectInput from "../common/selectInput";
import Input from "../common/input";
import TextArea from "./../common/textarea";
import TextDisplay from "../common/textDisplay";
import { getResource, postResource } from "../services/resourceService";
import { toHTML } from "./../utilities/string";
import {
  modify as lang_modify,
  submissionCreate as lang_submissions,
  trslError
} from "../language/fr";

var _ = require("lodash");

class ModifySubm extends Component {
  state = {
    submissions: {},
    selectedSubm: null,
    incomingSubm: null,
    data: {
      type: { label: "Communication", value: 0 },
      title: "",
      description: "",
      language: { label: "Français", value: 0 },
      orientation: { label: "Aucune", value: 0 },
      theme: { label: "Aucun", value: 0 },
      level: { label: "Non défini", value: 0 },
      status: { label: "Soumises", value: 0 },
      info: "",
      user: null,
      id: {}
    },
    dataReset: {
      type: { label: "Communication", value: 0 },
      title: "",
      description: "",
      language: { label: "Français", value: 0 },
      orientation: { label: "Aucune", value: 0 },
      theme: { label: "Aucun", value: 0 },
      level: { label: "Non défini", value: 0 },
      status: { label: "Soumises", value: 0 },
      info: "",
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
        const incomingSubm = splitSlug[0];
        this.setState({ incomingSubm });
      }
    }
    this.populate();
  }

  async populate() {
    const submissions = await getResource("subm");
    this.setState({ submissions });
    const users = await getResource("user");
    this.setState({ users, errors: {} });
  }

  schema = {
    type: Joi.object(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    language: Joi.object(),
    orientation: Joi.object(),
    theme: Joi.object(),
    level: Joi.object(),
    status: Joi.object(),
    info: Joi.string().allow(""),
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

  handleSelectedSubm = e => {
    if (e === null) {
      this.props.history.push({ pathname: "/modify/submissions" });
      this.setState({ selectedSubm: null, data: this.state.dataReset });
    } else {
      const { data } = e;
      this.props.history.push({
        pathname: "/modify/submissions/" + data.subm_id + "-" + data.subm_slug
      });
      this.setState({ selectedSubm: e }, () => {
        this.getSubmData(e.data);
      });
    }
  };

  async getSubmData(e) {
    const { value: id } = this.state.selectedSubm;
    const subm = await getResource("subm", id);
    if (subm) {
      let data = {
        id: id,
        title: subm.subm_title,
        description: subm.subm_description,
        info: subm.subm_info
      };
      const toSelect = [
        "type",
        "language",
        "orientation",
        "theme",
        "level",
        "status"
      ];
      toSelect.forEach(to => {
        data[to] = lang_submissions[to][subm["subm_" + to]];
      });
      const user = this.state.users.find(e => e.user_id === subm.user_id)
        ? this.state.users.find(e => e.user_id === subm.user_id)
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
    data.id = this.state.selectedSubm.value;
    try {
      await postResource("subm", data);
    } catch (ex) {
      console.log(ex);
    }
  };

  handleReset = () => {
    this.setState({ errors: {} });
    this.getSubmData();
  };

  handleCancel = e => {
    if (this.state.incomingSubm) {
      this.props.history.goBack();
    } else {
      this.props.history.push({ pathname: "/modify/submissions" });
      this.setState({ selectedSubm: false, data: this.state.dataReset });
    }
  };

  render() {
    const {
      submissions,
      incomingSubm,
      selectedSubm,
      data,
      users,
      errors
    } = this.state;
    let submData = [];
    if (submissions.length >= 0 && users.length >= 0) {
      const submissions_unsorted = submissions.map(s => {
        const subm = {
          label: "#" + s.subm_id + " " + toHTML(s.subm_title),
          title: toHTML(s.subm_title),
          value: s.subm_id,
          data: s
        };
        if (incomingSubm && !selectedSubm && s.subm_id === incomingSubm) {
          this.setState({ selectedSubm: subm }, () => {
            this.getSubmData(s);
          });
        }
        return subm;
      });
      submData = _.orderBy(submissions_unsorted, "title", "asc");
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
          <title>{lang_modify.submissions_title}</title>
        </Helmet>
        <h2>{lang_modify.submissions_header}</h2>
        {selectedSubm ? (
          <React.Fragment>
            <div className="row">
              <div className="col">
                {incomingSubm ? (
                  ""
                ) : (
                  <SelectInput
                    name="subm"
                    label={lang_modify.submissions_select}
                    options={submData}
                    value={selectedSubm}
                    onChange={this.handleSelectedSubm}
                    isClearable="true"
                  />
                )}
                <TextDisplay
                  name="type"
                  label={lang_submissions.typeLabel}
                  value={data.type ? data.type.label : ""}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-4">
                <button
                  className="btn btn-block btn-success"
                  onClick={this.handleSubmit}
                >
                  {lang_submissions.submit}
                </button>
              </div>
              <div className="col-4">
                <button
                  className="btn btn-block btn-warning"
                  onClick={this.handleReset}
                >
                  {lang_submissions.reset}
                </button>
              </div>
              <div className="col-4">
                <button
                  className="btn btn-block btn-secondary"
                  onClick={this.handleCancel}
                >
                  {incomingSubm ? lang_modify.return : lang_submissions.cancel}
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <Input
                  type="text"
                  name="title"
                  value={toHTML(data.title)}
                  label={lang_submissions.title}
                  error={errors.title}
                  onChange={this.handleChange}
                />
                <TextArea
                  type="text"
                  name="description"
                  value={toHTML(data.description)}
                  label={lang_submissions.description}
                  error={errors.description}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <SelectInput
                  name="language"
                  label={lang_submissions.languageLabel}
                  value={data.language}
                  options={lang_submissions.language}
                  onChange={this.handleSelectChange}
                />
                <SelectInput
                  name="orientation"
                  label={lang_submissions.orientationLabel}
                  value={data.orientation}
                  options={lang_submissions.orientation}
                  onChange={this.handleSelectChange}
                />
              </div>
              <div className="col-6">
                <SelectInput
                  name="theme"
                  label={lang_submissions.themeLabel}
                  value={data.theme}
                  options={lang_submissions.theme}
                  onChange={this.handleSelectChange}
                />
                <SelectInput
                  name="level"
                  label={lang_submissions.levelLabel}
                  value={data.level}
                  options={lang_submissions.level}
                  onChange={this.handleSelectChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <SelectInput
                  name="status"
                  label={lang_submissions.statusLabel}
                  value={data.status}
                  options={lang_submissions.status}
                  onChange={this.handleSelectChange}
                />
                <TextArea
                  type="text"
                  name="info"
                  value={toHTML(data.info)}
                  label={lang_submissions.infoLabel}
                  onChange={this.handleChange}
                />
                <SelectInput
                  name="user"
                  label={lang_submissions.user}
                  value={data.user}
                  options={options}
                  onChange={this.handleSelectChange}
                />
              </div>
            </div>
          </React.Fragment>
        ) : (
          <div className="row">
            <div className="col">
              <SelectInput
                name="panel"
                label={lang_modify.submissions_select}
                options={submData}
                value={selectedSubm}
                onChange={this.handleSelectedSubm}
                isClearable="true"
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ModifySubm;
