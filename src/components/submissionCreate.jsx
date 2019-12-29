import React, { Component } from "react";
import { Helmet } from "react-helmet";
import Joi from "joi-browser";
import SelectInput from "../common/selectInput";
import Input from "../common/input";
import TextArea from "./../common/textarea";
import { postResource } from "../services/resourceService";
import {
  submissionCreate as lang_submissions,
  trslError
} from "./../language/fr";

class SubmissionCreate extends Component {
  state = {
    data: {
      type: { label: "Communication", value: 0 },
      title: "",
      description: "",
      language: { label: "Français", value: 0 },
      orientation: { label: "Aucune", value: 0 },
      theme: { label: "Aucun", value: 0 },
      level: { label: "Non défini", value: 0 },
      status: { label: "Soumises", value: 0 },
      info: ""
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
      info: ""
    },
    errors: {}
  };

  schema = {
    type: Joi.object(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    language: Joi.object(),
    orientation: Joi.object(),
    theme: Joi.object(),
    level: Joi.object(),
    status: Joi.object(),
    info: Joi.string().allow("")
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
      await postResource("subm", data);
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

  handleSelectChange = e => {
    const { data } = this.state;
    const nam = e.name;
    const val = e;
    data[nam] = val;
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
    const { data, errors } = this.state;
    return (
      <div className="container">
        <Helmet>
          <title>{lang_submissions.createTitle}</title>
        </Helmet>
        <div className="row">
          <div className="col">
            <h3>{lang_submissions.createTitle}</h3>
            <SelectInput
              name="type"
              label={lang_submissions.typeLabel}
              value={data.type}
              options={lang_submissions.type}
              onChange={this.handleSelectChange}
            />
            <Input
              type="text"
              name="title"
              value={data.title}
              label={lang_submissions.title}
              error={errors.title}
              onChange={this.handleChange}
            />
            <TextArea
              type="text"
              name="description"
              rows="6"
              value={data.description}
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
            />
            <TextArea
              type="text"
              name="info"
              rows="2"
              value={data.info}
              label={lang_submissions.infoLabel}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="row">
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
              {lang_submissions.cancel}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default SubmissionCreate;
