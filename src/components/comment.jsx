import React, { Component } from "react";
import { comments as lang_comments } from "../language/fr";

class Comment extends Component {
  render() {
    const { data } = this.props;
    return (
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <td style={{ borderRight: 0 }}>
              {data.comm_time} | {data.user_name}
            </td>
            <td align="right" style={{ borderLeft: 0 }}>
              {data.user_id === this.props.user["id"] ||
              this.props.user["role"] < 1 ? (
                <input
                  type="button"
                  className="btn btn-sm btn-danger"
                  value={lang_comments.delete}
                  onClick={() => this.props.onDeleteComment(data.comm_id)}
                />
              ) : (
                ""
              )}
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="2">{data.comm_text}</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default Comment;
