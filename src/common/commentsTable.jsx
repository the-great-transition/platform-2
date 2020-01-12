import React, { Component } from "react";
import { toHTML } from "../utilities/string";
import { exports as lang_exports } from "./../language/fr";

class CommentsTable extends Component {
  state = {};
  render() {
    const { data } = this.props;
    return (
      <div>
        {data.map((d, key) => {
          return (
            <table className="table table-bordered table-sm mt-3" key={key}>
              <thead className="bg-light text-danger text-center">
                <tr>
                  <th>
                    #{d.subm.subm_id} {toHTML(d.subm.subm_title)}
                  </th>
                </tr>
                <tr>
                  <th>{toHTML(d.subm.user_name) + ", " + d.subm.subm_time}</th>
                </tr>
              </thead>
              <tbody>
                {d.comm.map((c, k) => {
                  return (
                    <React.Fragment>
                      <tr key={k}>
                        <td>
                          <b>{c.user_name + ", " + c.comm_time}</b>
                        </td>
                      </tr>
                      <tr>
                        <td>{toHTML(c.comm_text)}</td>
                      </tr>
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          );
        })}
      </div>
    );
  }
}

export default CommentsTable;
