import React, { Component } from "react";
import Helmet from "react-helmet";
import { getResource } from "../services/resourceService";
import { toHTML } from "./../utilities/string";
import { exports as lang_exports } from "./../language/fr";

class ExportsAnswers extends Component {
  state = {
    submissions: {}
  };

  componentDidMount() {
    this.populate();
  }

  async populate() {
    const submissions = await getResource("subm", false, "status=2");
    this.setState({ submissions });
  }

  render() {
    const { submissions } = this.state;
    const colors = ["#ffffff", "#28a745", "#dc3545", "#eb7b05"];
    return (
      <div>
        <Helmet>
          <title>{lang_exports.answers_helmet}</title>
        </Helmet>
        <h2>{lang_exports.answers_header}</h2>
        {submissions && submissions.length > 0 ? (
          <table className="table table-bordered">
            <tbody>
              {submissions.map((s, k) => {
                return (
                  <React.Fragment>
                    <tr key={k} className="bg-light text-danger text-center">
                      <th colSpan="5">
                        {"#" + s.subm_id + " - " + toHTML(s.subm_title)}
                      </th>
                    </tr>
                    {s.subm_type === "1" ? (
                      s.comms.map((c, kk) => {
                        return (
                          <React.Fragment>
                            <tr key={kk}>
                              <th colSpan="5">{toHTML(c.subm_title)}</th>
                            </tr>
                            {c.parts.map((p, kkk) => {
                              return (
                                <tr
                                  key={kkk}
                                  style={{
                                    backgroundColor:
                                      colors[p.part_subm_confirmation]
                                  }}
                                >
                                  <td>{p.part_id}</td>
                                  <td>
                                    {toHTML(p.part_fname + " " + p.part_lname)}
                                  </td>
                                  <td>{toHTML(p.part_gender)}</td>
                                  <td>{toHTML(p.part_minority)}</td>
                                  <td>
                                    {
                                      lang_exports.answers[
                                        p.part_subm_confirmation
                                      ]
                                    }
                                  </td>
                                </tr>
                              );
                            })}
                          </React.Fragment>
                        );
                      })
                    ) : (
                      <React.Fragment>
                        {s.parts.map((p, kkk) => {
                          return (
                            <tr
                              key={kkk}
                              style={{
                                backgroundColor:
                                  colors[p.part_subm_confirmation]
                              }}
                            >
                              <td>{p.part_id}</td>
                              <td>
                                {toHTML(p.part_fname + " " + p.part_lname)}
                              </td>
                              <td>{toHTML(p.part_gender)}</td>
                              <td>{toHTML(p.part_minority)}</td>
                              <td>
                                {lang_exports.answers[p.part_subm_confirmation]}
                              </td>
                            </tr>
                          );
                        })}
                      </React.Fragment>
                    )}
                    {s.chair ? (
                      <tr
                        style={{
                          backgroundColor:
                            colors[s.chair.part_subm_confirmation]
                        }}
                      >
                        <td>{s.chair.part_id}</td>
                        <td colSpan="3">
                          {lang_exports.chair +
                            " " +
                            toHTML(
                              s.chair.part_fname + " " + s.chair.part_lname
                            )}
                        </td>
                        <td>
                          {lang_exports.answers[s.chair.part_subm_confirmation]}
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td colSpan="5">{lang_exports.nochair}</td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default ExportsAnswers;
