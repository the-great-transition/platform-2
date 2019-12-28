import React, { Component } from "react";
import Submission from "./submission";
import { getResource } from "../services/resourceService";
import { navPreviousNext } from "../utilities/array";

class SubmissionViewer extends Component {
  state = {
    submission: false,
    navigationDisabled: { previous: true, next: true }
  };

  componentDidMount() {
    this.getSubmission(this.props.location.pathname);
  }

  async getSubmission(pathname) {
    const splitPath = pathname.split("/");
    const splitSlug = splitPath[2].split("-");
    const submission = await getResource("subm", splitSlug[0]);
    if (submission === null) {
      this.props.history.goBack();
    } else {
      this.setState({ submission });
    }
  }

  handleNav = object => {
    this.props.history.replace(object);
    this.getSubmission(object.pathname);
  };

  handleEscape = () => {
    this.props.history.goBack();
  };

  handleNavDisable = (tableArray, tableIndex) => {
    const limits = navPreviousNext(tableArray, tableIndex);
    const { previous, next } = limits;
    const { navigationDisabled } = this.state;
    navigationDisabled.previous = !previous;
    navigationDisabled.next = !next;
    this.setState({ navigationDisabled });
    return limits;
  };

  render() {
    return this.state.submission ? (
      <div className="border border-light shadow" style={{ padding: 10 }}>
        <Submission
          data={this.state.submission}
          location={this.props.location}
          navigationDisabled={this.state.navigationDisabled}
          onNav={this.handleNav}
          onNavDisable={this.handleNavDisable}
          onNavEscape={this.handleEscape}
        />
      </div>
    ) : (
      ""
    );
  }
}

export default SubmissionViewer;
