import React, { Component } from "react";
import Comment from "./comment";
import TextArea from "../common/textarea";
import {
  getResource,
  postResource,
  deleteResource
} from "../services/resourceService";
import { comments as lang_comments } from "../language/fr";

class Comments extends Component {
  state = {
    comments: "",
    myComment: ""
  };

  componentDidMount() {
    this.populate();
  }

  async populate() {
    const comments = await getResource("comment", this.props.subm_id);
    this.setState({ comments, myComment: "" });
  }

  async postComment() {
    const data = { comment: this.state.myComment, id: this.props.subm_id };
    try {
      await postResource("comment", data);
      this.populate();
    } catch (ex) {
      console.log(ex);
    }
  }

  async deleteComment(id) {
    try {
      await deleteResource("comment", id);
      this.populate();
    } catch (ex) {
      console.log(ex);
    }
  }

  handleChange = e => {
    const { value: myComment } = e.currentTarget;
    this.setState({ myComment });
  };

  handleSubmit = () => {
    this.postComment();
  };

  handleDelete = id => {
    this.deleteComment(id);
  };

  render() {
    let comments = "";
    if (this.state.comments) {
      comments = this.state.comments.map((c, key) => {
        return (
          <Comment
            key={key}
            data={c}
            user={this.props.user}
            onDelete={this.handleDelete}
          />
        );
      });
    }
    if (comments.length === 0) comments = <i>{lang_comments.none}</i>;
    return (
      <div className="row d-print-none">
        <div className="">
          <h3>{lang_comments.comments}</h3>
          {comments}
          <div className="form-group">
            <TextArea
              type="textarea"
              name="myComment"
              cols="60"
              value={this.state.myComment}
              label={lang_comments.myComment}
              onChange={this.handleChange}
            />
          </div>
          <input
            type="button"
            className="btn btn-primary"
            value={lang_comments.submit}
            onClick={this.handleSubmit}
          />
        </div>
      </div>
    );
  }
}

export default Comments;
