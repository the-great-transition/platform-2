import React, { Component } from "react";
import Comment from "./comment";
import TextArea from "../common/textarea";
import { comments as lang_comments } from "../language/fr";

class Comments extends Component {
  render() {
    let comments = "";
    if (this.props.comments) {
      comments = this.props.comments.map((c, key) => {
        return (
          <Comment
            key={key}
            data={c}
            user={this.props.user}
            onDeleteComment={this.props.onDeleteComment}
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
              value={this.props.myComment}
              label={lang_comments.myComment}
              onChange={this.props.onChangeComment}
            />
          </div>
          <input
            type="button"
            className="btn btn-primary"
            value={lang_comments.submit}
            onClick={this.props.onSubmitComment}
          />
        </div>
      </div>
    );
  }
}

export default Comments;
