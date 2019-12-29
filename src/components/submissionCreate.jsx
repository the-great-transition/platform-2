import React, { Component } from "react";
import { Helmet } from "react-helmet";
import SelectInput from "../common/selectInput";
import Input from "../common/input";
import TextArea from "./../common/textarea";
import { submissionCreate as lang_submissions } from "./../language/fr";

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
      status: { label: "Soumises", value: 0 }
    },
    dataReset: {
      type: { label: "Communication", value: 0 },
      title: "",
      description: "",
      language: { label: "Français", value: 0 },
      orientation: { label: "Aucune", value: 0 },
      theme: { label: "Aucun", value: 0 },
      level: { label: "Non défini", value: 0 },
      status: { label: "Soumises", value: 0 }
    },
    errors: {}
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

  handleSubmit = e => {};

  handleReset = e => {
    const { dataReset } = this.state;
    this.setState({ data: dataReset });
  };

  handleCancel = e => {};

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
              error={errors.name}
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
              error={errors.info}
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
