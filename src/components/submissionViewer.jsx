import React, { Component } from "react";
import Submission from "./submission";
import {
  getResource,
  postResource,
  updateStatus,
  deleteResource
} from "../services/resourceService";
import { navPreviousNext } from "../utilities/array";

class SubmissionViewer extends Component {
  state = {
    submission: false,
    ratings: { average: "0", myRating: null },
    comments: "",
    myComment: "",
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
        this.getComments();
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

  async treatComments() {
    const comments = await getResource(
      "comment",
      this.state.submission.subm_id
    );
    this.setState({ comments, myComment: "" });
  }

  getComments = () => {
    this.treatComments(this.state.submission.subm_id);
  };

  async postComment() {
    const data = {
      comment: this.state.myComment,
      id: this.state.submission.subm_id
    };
    try {
      await postResource("comment", data);
      const myComment = "";
      this.setState({ myComment });
      this.getComments();
    } catch (ex) {
      console.log(ex);
    }
  }

  async deleteComment(id) {
    try {
      await deleteResource("comment", id);
      this.getComments();
    } catch (ex) {
      console.log(ex);
    }
  }

  async updateStatus() {
    const { subm_id, subm_status } = this.state.submission;
    const data = {
      id: subm_id,
      status: subm_status
    };
    await updateStatus("subm", data);
  }

  handleRating = ({ currentTarget: input }) => {
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

  handleChangeComment = e => {
    const { value: myComment } = e.currentTarget;
    this.setState({ myComment });
  };

  handleSubmitComment = () => {
    this.postComment();
  };

  handleDeleteComment = id => {
    this.deleteComment(id);
  };

  handleStatusChange = ({ value: status }) => {
    const { submission } = this.state;
    submission.subm_status = status;
    this.setState({ submission }, () => {
      this.updateStatus();
    });
  };

  handleNav = object => {
    this.props.history.replace(object);
    this.getSubmission(object.pathname);
  };

  handleModify = () => {
    const { submission } = this.state;
    this.props.history.push({
      pathname:
        "/modify/submissions/" + submission.subm_id + "-" + submission.subm_slug
    });
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
          onModify={this.handleModify}
          getRatings={this.getRatings}
          postRating={this.postRating}
          onRating={this.handleRating}
          ratings={this.state.ratings}
          getComments={this.getComments}
          onChangeComment={this.handleChangeComment}
          onSubmitComment={this.handleSubmitComment}
          onDeleteComment={this.handleDeleteComment}
          comments={this.state.comments}
          myComment={this.state.myComment}
          onStatus={this.handleStatusChange}
        />
      </div>
    ) : (
      ""
    );
  }
}

export default SubmissionViewer;
