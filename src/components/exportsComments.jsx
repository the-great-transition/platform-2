import React, { Component } from "react";
import Helmet from "react-helmet";
import SelectInput from "./../common/selectInput";
import CommentsTable from "./../common/commentsTable";
import { getResource } from "../services/resourceService";
import {
  exports as lang_exports,
  submissions as lang_submissions
} from "./../language/fr";

class ExportsComments extends Component {
  state = {
    data: {
      status: { name: "status", label: "Soumises", value: "0" }
    },
    comments: {},
    displayTable: false
  };

  handleSelectChange = e => {
    const { data } = this.state;
    const nam = e.name;
    const val = e;
    data[nam] = val;
    this.setState({ data });
  };

  displayTable = () => {
    try {
      this.getComms();
      this.setState({ displayTable: true });
    } catch (ex) {
      console.log(ex);
    }
  };

  async getComms() {
    const { value: id } = this.state.data.status;
    const comments = await getResource("comment", id, "status=true");
    if (comments.length > 0) {
      this.setState({ comments: comments });
    } else {
      this.setState({ comments: {} });
    }
  }

  render() {
    const { data, comments, displayTable } = this.state;
    return (
      <div>
        <Helmet>
          <title>{lang_exports.comms_title}</title>
        </Helmet>
        <h2>{lang_exports.comms_header}</h2>
        <div className="row">
          <div className="col">
            <SelectInput
              name="status"
              label={lang_exports.optionsLabel}
              value={data.status}
              options={lang_submissions.status}
              onChange={this.handleSelectChange}
            />
            <button className="btn btn-success" onClick={this.displayTable}>
              {lang_exports.table}
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col">
            {displayTable && comments.length > 0 ? (
              <CommentsTable data={comments} />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ExportsComments;
