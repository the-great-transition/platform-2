import React, { Component } from "react";
import Submission from "./submission";
import { getResource, postResource } from "../services/resourceService";
import { navPreviousNext } from "../utilities/array";

class SubmissionViewer extends Component {
  state = {
    submission: false,
    ratings: { average: "0", myRating: null },
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
      this.setState({ submission }, () => {
        this.getRatings();
      });
    }
  }

  async treatRatings() {
    try {
      const ratings = await getResource(
        "rating",
        this.state.submission.subm_id
      );
      ratings["average"] = Math.ceil(ratings["average"] * 100) / 100;
      this.setState({ ratings });
    } catch (ex) {
      console.log(ex);
    }
  }

  getRatings = () => {
    this.treatRatings(this.state.submission.subm_id);
  };

  async postRating() {
    const data = {
      id: this.state.submission.subm_id,
      rating: this.state.ratings.myRating
    };
    await postResource("rating", data);
    this.treatRatings();
  }

  handleRating = ({ currentTarget: input }) => {
    console.log("called");
    const { value } = input;
    const oldvalue = this.state.ratings.myRating;
    const { ratings } = this.state;
    ratings.myRating = ratings.myRating === value ? 0 : value;
    this.setState({ ratings }, () => {
      try {
        this.postRating();
      } catch (ex) {
        ratings["myRating"] = oldvalue;
        this.setState({ ratings });
      }
    });
  };

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
          user={this.props.user}
          data={this.state.submission}
          location={this.props.location}
          navigationDisabled={this.state.navigationDisabled}
          onNav={this.handleNav}
          onNavDisable={this.handleNavDisable}
          onNavEscape={this.handleEscape}
          getRatings={this.getRatings}
          postRating={this.postRating}
          onRating={this.handleRating}
          ratings={this.state.ratings}
        />
      </div>
    ) : (
      ""
    );
  }
}

export default SubmissionViewer;
